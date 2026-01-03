# HackMatch 🚀

**Tinder for Hackathon Teams** - Find your perfect teammates before the event starts!

## What is HackMatch?

HackMatch solves the #1 problem hackers face: **finding a team**.

Instead of awkwardly wandering around on Day 1 asking "anyone need a backend dev?", use HackMatch to:
- 🔍 Browse profiles of other participants
- 💫 Swipe right on potential teammates
- 🤝 Match when both swipe right
- 💬 Chat to plan your project
- 🚀 Show up on Day 1 ready to build!

## Features

### 🎯 Smart Matching with Gemini AI
- AI-powered compatibility scores (powered by Google Gemini)
- Considers skills, timezones, experience levels, and what you're looking for
- See match percentage before you swipe

### 📊 Activity Radar
- See when users were last active
- View their Devpost hackathon history
- Check timezone compatibility
- Know their experience level

### 💬 Simple Chat
- 1-on-1 messaging after matching
- Clean, minimal interface
- No fluff, just what you need to coordinate

### 🌈 Inclusive Design
- Helps solo hackers find teams
- Reduces barrier for underrepresented groups
- Beginner-friendly experience indicators

## How to Use

### 1. Open the App

Simply open `index.html` in your web browser:

```bash
cd /Users/luzhang/Desktop/HackMatch
open index.html
```

Or double-click `index.html` in Finder.

### 2. Create Your Profile

Fill out:
- Name
- Role (Frontend, Backend, Designer, etc.)
- Skills
- What you're looking for
- Bio
- Hackathon experience
- Devpost username (optional)

### 3. Start Swiping

- ❤️ Swipe right (or press →) if you want to team up
- ✕ Swipe left (or press ←) to pass
- See AI-powered match scores
- View activity status and timezone

### 4. Chat with Matches

- When you match, start chatting!
- Plan your project idea
- Coordinate before the hackathon starts

## Demo Features

### Sample Profiles

The app comes pre-loaded with 20 diverse sample profiles:
- Various roles: Frontend, Backend, ML, Design, Product, etc.
- Different experience levels: Beginners to veterans
- Global timezones
- Realistic hackathon counts and skills

### AI Matching

Uses Google Gemini API to calculate compatibility:
- Analyzes complementary skills
- Checks timezone compatibility
- Balances experience levels
- Generates personalized match explanations

## Tech Stack

- **Frontend**: Pure HTML/CSS/JavaScript (no frameworks!)
- **AI**: Google Gemini API
- **Storage**: localStorage (for demo - would use MongoDB for production)
- **Deployment**: Ready for Vercel/Netlify

## For the Hackathon Pitch

### Problem
Teams don't fail because their code is bad - they fail because they can't find the right teammates. Solo hackers waste valuable time on Day 1 looking for teams instead of building.

### Solution
HackMatch - the Tinder for hackathon teams. Swipe. Match. Build. Win.

### Why It Wins

**Best Hack for Hackers:**
- Empowers the hacker community to form better teams
- Solves a universal pre-hackathon pain point
- Built by hackers who experienced this problem firsthand

**Best Use of Gemini API:**
- Smart matching algorithm powered by AI
- Compatibility scores and explanations
- Not just random swiping - intelligent team formation

**Social Good:**
- Reduces barriers for underrepresented groups
- Helps beginners find experienced mentors
- Creates inclusive team formation process

## Next Steps for Production

1. **Backend**: Build FastAPI/Node.js backend
2. **Database**: MongoDB Atlas for real user data
3. **Real-time**: WebSocket for live chat
4. **Auth**: OAuth with Devpost
5. **Deployment**: Deploy to Vercel + MongoDB Atlas
6. **Multi-event**: Support multiple hackathons simultaneously

## Files

- `index.html` - Landing page & profile creation
- `swipe.html` - Swipe interface
- `matches.html` - View your matches
- `chat.html` - 1-on-1 chat
- `app.js` - Core application logic
- `sample-data.js` - 20 sample profiles
- `styles.css` - Clean, modern styling
- `.env` - Gemini API key (gitignored)

## API Key

Your Gemini API key is stored in `.env` and is safe to share with your teammate for the hackathon. After the event, you can regenerate it at https://aistudio.google.com/apikey if desired.

## Built With ❤️ for Hack for Hackers

Created to solve a real problem we both faced. Let's help hackers find their dream teams!
