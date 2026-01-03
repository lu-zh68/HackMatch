// HackMatch - Team Finder for Hackathons
// Main application logic

const GEMINI_API_KEY = 'AIzaSyC0lccjIS3hlnOdIYoLmyNjaji2ebd6qC4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Initialize data from localStorage or use sample data
function initializeData() {
  if (!localStorage.getItem('profiles')) {
    localStorage.setItem('profiles', JSON.stringify(sampleProfiles));
  }

  if (!localStorage.getItem('currentUser')) {
    // No user logged in
    return null;
  }

  return JSON.parse(localStorage.getItem('currentUser'));
}

// Get all profiles
function getAllProfiles() {
  return JSON.parse(localStorage.getItem('profiles') || '[]');
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Save current user
function saveCurrentUser(user) {
  localStorage.setItem('currentUser', JSON.stringify(user));
}

// Get user's swipes
function getUserSwipes() {
  const user = getCurrentUser();
  if (!user) return { right: [], left: [] };

  return {
    right: JSON.parse(localStorage.getItem(`swipes_right_${user.id}`) || '[]'),
    left: JSON.parse(localStorage.getItem(`swipes_left_${user.id}`) || '[]')
  };
}

// Save swipe
function saveSwipe(profileId, direction) {
  const user = getCurrentUser();
  if (!user) return;

  const key = `swipes_${direction}_${user.id}`;
  const swipes = JSON.parse(localStorage.getItem(key) || '[]');

  if (!swipes.includes(profileId)) {
    swipes.push(profileId);
    localStorage.setItem(key, JSON.stringify(swipes));
  }

  // Update last active
  user.lastActive = Date.now();
  saveCurrentUser(user);

  // Check for match if swiped right
  if (direction === 'right') {
    checkForMatch(profileId);
  }
}

// Check if there's a match
function checkForMatch(otherUserId) {
  const user = getCurrentUser();
  if (!user) return;

  // For demo purposes, simulate matches (25% chance)
  // In production, you'd check if the other user also swiped right
  if (Math.random() > 0.75) {
    const matches = JSON.parse(localStorage.getItem(`matches_${user.id}`) || '[]');
    if (!matches.includes(otherUserId)) {
      matches.push(otherUserId);
      localStorage.setItem(`matches_${user.id}`, JSON.stringify(matches));

      // Show match notification
      showMatchNotification(otherUserId);
    }
  }
}

// Get user's matches
function getUserMatches() {
  const user = getCurrentUser();
  if (!user) return [];

  const matchIds = JSON.parse(localStorage.getItem(`matches_${user.id}`) || '[]');
  const profiles = getAllProfiles();

  return matchIds.map(id => profiles.find(p => p.id === id)).filter(Boolean);
}

// Get messages for a match
function getMessages(matchId) {
  const user = getCurrentUser();
  if (!user) return [];

  const key = `messages_${Math.min(user.id, matchId)}_${Math.max(user.id, matchId)}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// Send message
function sendMessage(matchId, text) {
  const user = getCurrentUser();
  if (!user) return;

  const key = `messages_${Math.min(user.id, matchId)}_${Math.max(user.id, matchId)}`;
  const messages = getMessages(matchId);

  messages.push({
    senderId: user.id,
    text: text,
    timestamp: Date.now()
  });

  localStorage.setItem(key, JSON.stringify(messages));

  // Update last active
  user.lastActive = Date.now();
  saveCurrentUser(user);
}

// Get profiles to swipe (not yet swiped, not current user, not already matched)
function getProfilesToSwipe() {
  const user = getCurrentUser();
  if (!user) return [];

  const swipes = getUserSwipes();
  const matches = getUserMatches().map(m => m.id);
  const profiles = getAllProfiles();

  return profiles.filter(p =>
    p.id !== user.id &&
    !swipes.right.includes(p.id) &&
    !swipes.left.includes(p.id) &&
    !matches.includes(p.id)
  );
}

// Calculate match score using Gemini AI
async function calculateMatchScore(user, otherUser) {
  try {
    const prompt = `You are a hackathon team matching AI. Calculate compatibility between these two hackers and return ONLY a number between 0-100.

Hacker 1:
- Role: ${user.role}
- Skills: ${user.skills.join(', ')}
- Looking for: ${user.lookingFor.join(', ')}
- Experience: ${user.experienceLevel}
- Timezone: ${user.timezone}

Hacker 2:
- Role: ${otherUser.role}
- Skills: ${otherUser.skills.join(', ')}
- Looking for: ${otherUser.lookingFor.join(', ')}
- Experience: ${otherUser.experienceLevel}
- Timezone: ${otherUser.timezone}

Consider:
1. Complementary skills (if one is looking for what the other offers)
2. Timezone compatibility (closer is better)
3. Experience balance (mix of levels can be good)
4. Skill overlap (some is good for collaboration)

Return ONLY a number from 0-100. No explanation, just the number.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    const scoreText = data.candidates[0].content.parts[0].text.trim();
    const score = parseInt(scoreText);

    return isNaN(score) ? 75 : Math.min(100, Math.max(0, score));
  } catch (error) {
    console.error('Error calculating match score:', error);
    // Fallback to simple calculation
    return calculateSimpleMatchScore(user, otherUser);
  }
}

// Simple fallback match calculation
function calculateSimpleMatchScore(user, otherUser) {
  let score = 50; // base score

  // Check if they're looking for each other's roles
  if (otherUser.lookingFor.some(role => user.role.toLowerCase().includes(role.toLowerCase()))) {
    score += 20;
  }

  if (user.lookingFor.some(role => otherUser.role.toLowerCase().includes(role.toLowerCase()))) {
    score += 20;
  }

  // Timezone proximity
  if (user.timezone === otherUser.timezone) {
    score += 10;
  }

  return Math.min(100, score);
}

// Generate match explanation using Gemini
async function generateMatchExplanation(user, otherUser, score) {
  try {
    const prompt = `You matched ${user.name} with ${otherUser.name} with a ${score}% compatibility score.

${user.name}:
- Role: ${user.role}
- Skills: ${user.skills.join(', ')}
- Looking for: ${user.lookingFor.join(', ')}

${otherUser.name}:
- Role: ${otherUser.role}
- Skills: ${otherUser.skills.join(', ')}
- Looking for: ${otherUser.lookingFor.join(', ')}

Write a friendly 1-2 sentence explanation of why they're a good match. Be specific and encouraging.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error) {
    console.error('Error generating explanation:', error);
    return `You both have complementary skills and are looking for what the other offers!`;
  }
}

// Show match notification
function showMatchNotification(matchId) {
  const profiles = getAllProfiles();
  const match = profiles.find(p => p.id === matchId);

  if (match && typeof showNotification === 'function') {
    showNotification(`It's a match! You and ${match.name} can now chat!`);
  }
}

// Logout
function logout() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

// Format timestamp to readable time
function formatTime(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;

  return `${displayHours}:${displayMinutes} ${ampm}`;
}

// Team Chat Functions

// Get team chat by ID (chat ID format: "team_<timestamp>_<userId>")
function getTeamChat(chatId) {
  const user = getCurrentUser();
  if (!user) return null;

  const key = `team_chat_${chatId}`;
  return JSON.parse(localStorage.getItem(key) || 'null');
}

// Create a team chat from existing 1-on-1 chat
function createTeamChat(originalMatchId, additionalMemberIds) {
  const user = getCurrentUser();
  if (!user) return null;

  const chatId = `team_${Date.now()}_${user.id}`;
  const memberIds = [user.id, originalMatchId, ...additionalMemberIds];

  const teamChat = {
    id: chatId,
    members: [...new Set(memberIds)], // Remove duplicates
    createdBy: user.id,
    createdAt: Date.now(),
    name: null // Can be set later
  };

  localStorage.setItem(`team_chat_${chatId}`, JSON.stringify(teamChat));

  // Add to user's team chats list
  const userTeamChats = JSON.parse(localStorage.getItem(`user_team_chats_${user.id}`) || '[]');
  userTeamChats.push(chatId);
  localStorage.setItem(`user_team_chats_${user.id}`, JSON.stringify(userTeamChats));

  return teamChat;
}

// Add member to existing team chat
function addMemberToTeamChat(chatId, memberId) {
  const teamChat = getTeamChat(chatId);
  if (!teamChat) return false;

  if (!teamChat.members.includes(memberId)) {
    teamChat.members.push(memberId);
    localStorage.setItem(`team_chat_${chatId}`, JSON.stringify(teamChat));
  }

  return true;
}

// Get messages for team chat
function getTeamMessages(chatId) {
  const key = `team_messages_${chatId}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
}

// Send message to team chat
function sendTeamMessage(chatId, text) {
  const user = getCurrentUser();
  if (!user) return;

  const key = `team_messages_${chatId}`;
  const messages = getTeamMessages(chatId);

  messages.push({
    senderId: user.id,
    senderName: user.name,
    text: text,
    timestamp: Date.now()
  });

  localStorage.setItem(key, JSON.stringify(messages));

  // Update last active
  user.lastActive = Date.now();
  saveCurrentUser(user);
}

// Get user's team chats
function getUserTeamChats() {
  const user = getCurrentUser();
  if (!user) return [];

  const chatIds = JSON.parse(localStorage.getItem(`user_team_chats_${user.id}`) || '[]');
  return chatIds.map(id => getTeamChat(id)).filter(Boolean);
}
