# HackMatch Profile Fields

## Updated Profile Structure

All profiles now include these fields:

### Required Fields:
1. **Name** - User's full name
2. **Pronouns** - he/him, she/her, they/them, etc.
3. **Role** - Frontend, Backend, Designer, etc.
4. **Skills** - Comma-separated list (e.g., "React, Python, Figma")
5. **Looking For** - What roles they need on their team
6. **Bio** - Personal description
7. **Interests** - Multi-select from 20+ categories
8. **Hackathon Experience** - Count of previous hackathons
9. **Timezone** - Selectable from major world timezones
10. **Experience Level** - Beginner, Intermediate, or Advanced

### Optional Fields:
1. **Achievements** - Comma-separated accomplishments
2. **Devpost URL** - Link to Devpost profile
3. **GitHub URL** - Link to GitHub profile

## Sample Profiles

✅ **20 diverse fake profiles generated** with:

- Variety of roles: Frontend, Backend, ML, Design, Product, Game Dev, AR/VR, Blockchain, IoT, QA, Audio, Accessibility, Content Creation, etc.
- Different pronouns: he/him, she/her, they/them
- Global timezones: PST, EST, London, Berlin, Tokyo, India, Brazil, Australia, etc.
- Experience levels: Beginners (1 hackathon) to Veterans (13+ hackathons)
- Realistic achievements:
  - "Won Best Design at HackMIT 2023"
  - "Built 3 open-source React libraries"
  - "App featured on App Store"
  - "Published research paper at NeurIPS"
- Diverse interests:
  - Accessibility, AI, Climate Tech, Web3, Gaming, HealthTech, etc.
- Real-looking GitHub and Devpost URLs

## Profile Card Display

The swipe cards now show:

1. **Header:**
   - Name (large)
   - Pronouns (below name)
   - Role
   - Activity status (online/recent/offline)
   - Timezone
   - Hackathon count badge
   - AI Match Score

2. **About Section:**
   - Bio text

3. **Skills Section:**
   - Skill tags (clickable-looking badges)

4. **Looking For Section:**
   - Role tags they're seeking

5. **Interests Section:**
   - Interest tags (only shown if user has interests)

6. **Achievements Section:**
   - Bullet list of top 3 achievements (only if user has them)

7. **Links Section:**
   - GitHub link (opens in new tab)
   - Devpost link (opens in new tab)

8. **Experience Section:**
   - Experience level (Beginner/Intermediate/Advanced)

9. **Swipe Actions:**
   - ✕ (reject) and ❤️ (accept) buttons

## Form Updates

The profile creation form (`index.html`) now includes:

1. **Pronouns dropdown** - 7 options including "prefer not to say"
2. **Achievements textarea** - Optional, comma-separated
3. **Interests multi-select** - Hold Cmd/Ctrl to select multiple from 20+ options
4. **Timezone dropdown** - 14 major timezones with readable names (e.g., "Pacific Time (PT)")
5. **Devpost URL input** - Optional, validates URL format
6. **GitHub URL input** - Optional, validates URL format

## Example Profile (Sarah Chen):

```json
{
  "id": 1,
  "name": "Sarah Chen",
  "pronouns": "she/her",
  "role": "Frontend Developer",
  "skills": ["React", "TypeScript", "Figma", "CSS"],
  "lookingFor": ["Backend Dev", "Designer"],
  "bio": "Love building beautiful UIs and creating delightful user experiences. Passionate about accessibility and inclusive design.",
  "achievements": [
    "Won Best Design at HackMIT 2023",
    "Built 3 open-source React libraries",
    "Mentored 10+ beginners"
  ],
  "interests": ["Accessibility", "Design Systems", "Animation", "Web3"],
  "hackathonCount": 8,
  "timezone": "America/Los_Angeles",
  "devpostUrl": "https://devpost.com/sarah-chen-dev",
  "githubUrl": "https://github.com/sarahchen",
  "experienceLevel": "Intermediate"
}
```

## Testing the New Features

1. **Clear your browser's localStorage** to see the new sample profiles:
   - Open DevTools (F12)
   - Go to Application tab → Local Storage
   - Delete all items
   - Refresh the page

2. **Create a new profile** to test the form:
   - Fill out all required fields
   - Select multiple interests (hold Cmd/Ctrl)
   - Add optional GitHub/Devpost links
   - Add achievements

3. **Start swiping** to see the enhanced profile cards:
   - Notice pronouns below names
   - See interests and achievements sections
   - Click GitHub/Devpost links (they open in new tabs)
   - View realistic timezones

## Gemini AI Integration

The AI matching now considers:
- Complementary skills
- Timezone compatibility
- Shared interests ✨ (NEW!)
- Experience level balance
- What each person is looking for

This makes the match scores more accurate and meaningful!
