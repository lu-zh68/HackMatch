# HackMatch - Swipe. Match. Build.

A Tinder-style web app to find hackathon teammates with AI-powered matching.

## Features

- **Smart Matching**: AI-powered compatibility scoring using Google's Gemini API
- **Tinder-style Swiping**: Swipe right to match, left to pass
- **Team Formation Flow**: Clear progression from match → chat → team formation
- **Rich Profiles**: Roles, skills, interests, intent, GitHub/Devpost links
- **Timezone Compatibility**: Shows hour differences between teammates
- **Real-time Chat**: Message matched teammates before teaming up
- **Match Scoring**: Best matches shown first based on complementary skills

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI**: TailwindCSS, shadcn/ui components
- **Animation**: Framer Motion
- **AI**: Google Generative AI (Gemini)

## Quick Start

### 1. Clone or Download

```bash
cd hackmatch-connect-main
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Gemini API Key (Optional but Recommended)

1. Get your free API key from: https://makersuite.google.com/app/apikey
2. Create a `.env` file in the project root:

```bash
cp .env.example .env
```

3. Add your API key to `.env`:

```
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

**Note**: If you don't add an API key, the app will use a fallback matching algorithm (still works great!).

### 4. Run the App

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Sharing with Your Teammate

### Option 1: Deploy to Lovable (Easiest)

1. Visit the [Lovable Project](https://lovable.dev)
2. Upload this code
3. Click **Share → Publish**
4. Share the generated URL with your teammate

### Option 2: Deploy to Vercel

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add your `VITE_GEMINI_API_KEY` in the Environment Variables section
5. Deploy and share the URL

### Option 3: Deploy to Netlify

1. Push this code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Connect your repository
4. Add `VITE_GEMINI_API_KEY` to environment variables
5. Deploy and share the URL

### Option 4: Local Network Sharing

If your teammate is on the same network:

```bash
npm run dev -- --host
```

Then share your local IP address (shown in terminal) with your teammate.

### Option 5: Tunnel with ngrok

For quick remote access:

```bash
# Install ngrok: https://ngrok.com/download
npm run dev

# In another terminal:
ngrok http 5173
```

Share the ngrok URL with your teammate.

## How to Use

### As a User:

1. **Login**: Click "Continue" on the login screen
2. **Onboarding**: Fill out your profile:
   - Name, pronouns, bio
   - Select your role (Frontend, Backend, etc.)
   - Add your skills (React, Python, etc.)
   - Add your interests (AI, Web3, etc.)
   - Write your intent (what you're looking for)
   - Add GitHub/Devpost usernames
   - Select your timezone

3. **Swipe**:
   - View AI-generated match scores
   - See complementary skills and shared interests
   - Swipe right (❤️) to match, left (✗) to pass

4. **Chat**:
   - Message your matches
   - See their skills, timezone, and online status

5. **Team Up**:
   - Click "Form Team" to officially team up
   - Or "Not Now" to keep browsing

## Customization

### Adding More Profiles

Edit `src/data/mockUsers.ts` to add more fake profiles for testing.

### Changing Match Algorithm

Edit `src/utils/matching.ts` to adjust the scoring weights:
- Interest Match: 0-40 points
- Skill Complementarity: 0-30 points
- Role Compatibility: 0-20 points
- Intent Alignment: 0-10 points

### Styling

The app uses TailwindCSS. Edit:
- `src/index.css` for global styles
- `tailwind.config.ts` for theme colors

## Project Structure

```
src/
├── components/
│   ├── ui/               # shadcn/ui components
│   └── views/           # Main app views
│       ├── LoginView.tsx
│       ├── OnboardingView.tsx
│       ├── SwipeView.tsx
│       ├── MatchesView.tsx
│       ├── ChatView.tsx
│       └── ProfileView.tsx
├── context/
│   └── AppContext.tsx    # Global state management
├── data/
│   └── mockUsers.ts      # Mock user profiles
├── lib/
│   └── gemini.ts         # Gemini AI setup
├── types/
│   └── app.ts            # TypeScript types
└── utils/
    └── matching.ts       # Matching algorithm
```

## Development

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Contributing

This is a hackathon project! Feel free to:
- Add more features
- Improve the matching algorithm
- Add real authentication
- Connect to a backend
- Add WebSocket for real-time chat

## License

MIT - Built for hackathons with ❤️

## Support

For issues or questions:
- Check the Lovable docs: https://docs.lovable.dev
- Open an issue on GitHub

---

**Happy Hacking! 🚀**
