export interface MockUser {
  id: string;
  name: string;
  pronouns: string;
  bio: string;
  github: string;
  devpost: string;
  timeZone: string;
  timeZoneOffset: number;
  skills: string[];
  interests: string[];
  isOnline: boolean;
  lastActive: string;
  role: string;
  intent: string;
  activityLevel: string;
  hackathonCount?: number | null;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Alex Chen',
    pronouns: 'They/Them',
    bio: 'web3 developer, prev intern @coinbase. building decentralized stuff',
    github: 'alex-chen-dev',
    devpost: 'alexc',
    timeZone: 'Germany',
    timeZoneOffset: 1,
    skills: ['Solidity', 'ethers.js', 'React', 'TypeScript', 'Hardhat'],
    interests: ['Web3', 'DeFi', 'DAOs', 'NFTs'],
    isOnline: true,
    lastActive: '2 min ago',
    role: 'Full-stack Developer',
    intent: 'want to build something that actually ships, preferably web3',
    activityLevel: 'Multiple times per month — Very Active',
    hackathonCount: 12,
  },
  {
    id: '2',
    name: 'Maya Rodriguez',
    pronouns: 'She/Her',
    bio: 'cs @ stanford. obsessed with llms and building ai agents',
    github: 'maya-ml',
    devpost: 'mayarodriguez',
    timeZone: 'United States - West Coast',
    timeZoneOffset: -8,
    skills: ['Python', 'PyTorch', 'LangChain', 'OpenAI API', 'FastAPI'],
    interests: ['LLMs', 'AI Agents', 'RAG', 'Computer Vision'],
    isOnline: true,
    lastActive: '5 min ago',
    role: 'AI/ML Engineer',
    hackathonCount: 8,
    intent: 'trying to build the next big ai app, down to learn new frameworks',
    activityLevel: 'About once per month — Active',
  },
  {
    id: '3',
    name: 'Jordan Kim',
    pronouns: 'He/Him',
    bio: 'backend eng, love databases and making things fast. won 3 hackathons',
    github: 'jkim-backend',
    devpost: 'jordan-kim',
    timeZone: 'South Korea',
    timeZoneOffset: 9,
    skills: ['Go', 'PostgreSQL', 'Redis', 'Docker', 'gRPC'],
    interests: ['Distributed Systems', 'Database Optimization', 'System Design'],
    isOnline: false,
    lastActive: '1 hour ago',
    role: 'Backend Developer',
    intent: 'looking to build scalable systems and win some prizes',
    activityLevel: 'Multiple times per month — Very Active',
  },
  {
    id: '4',
    name: 'Sam Okonkwo',
    pronouns: 'They/Them',
    bio: 'designer learning to code! first hackathon, kinda nervous but excited',
    github: 'sam-designs',
    devpost: 'samokonkwo',
    timeZone: 'United Kingdom',
    timeZoneOffset: 0,
    skills: ['Figma', 'HTML/CSS', 'JavaScript', 'Framer'],
    interests: ['UI/UX', 'Design Systems', 'Accessibility', 'Animation'],
    isOnline: true,
    lastActive: 'Just now',
    role: 'UI/UX Designer',
    intent: 'want to contribute design skills and learn from experienced devs',
    activityLevel: 'Rarely / just starting — New',
  },
  {
    id: '5',
    name: 'Priya Sharma',
    pronouns: 'She/Her',
    bio: 'mobile dev, react native specialist. shipped 2 apps with 50k+ downloads',
    github: 'priya-dev',
    devpost: 'priya-sharma',
    timeZone: 'India',
    timeZoneOffset: 5.5,
    skills: ['React Native', 'Expo', 'Firebase', 'TypeScript', 'Swift'],
    interests: ['Mobile Development', 'Cross-platform', 'App Performance'],
    isOnline: false,
    lastActive: '30 min ago',
    role: 'Mobile Developer',
    intent: 'ship a mobile app this weekend, looking for motivated teammates',
    activityLevel: 'About once per month — Active',
  },
  {
    id: '6',
    name: 'Carlos Rodriguez',
    pronouns: 'He/Him',
    bio: 'frontend dev who cares way too much about animations and design details',
    github: 'carlos-frontend',
    devpost: 'crodriguez',
    timeZone: 'Mexico',
    timeZoneOffset: -6,
    skills: ['React', 'Next.js', 'TailwindCSS', 'Framer Motion', 'Three.js'],
    interests: ['Frontend', '3D Web', 'Animations', 'Performance'],
    isOnline: true,
    lastActive: '10 min ago',
    role: 'Frontend Developer',
    intent: 'create something beautiful that people actually want to use',
    activityLevel: 'Multiple times per month — Very Active',
  },
  {
    id: '7',
    name: 'Aisha Patel',
    pronouns: 'She/Her',
    bio: 'data scientist @ healthcare startup. passionate about using tech for good',
    github: 'aisha-data',
    devpost: 'aishapatel',
    timeZone: 'United Kingdom',
    timeZoneOffset: 0,
    skills: ['Python', 'pandas', 'scikit-learn', 'SQL', 'Jupyter'],
    interests: ['Healthcare Tech', 'Data Visualization', 'Social Impact'],
    isOnline: true,
    lastActive: 'Just now',
    role: 'Data Scientist',
    intent: 'build something that actually helps people, preferably health/social impact',
    activityLevel: 'Every few months — Moderate',
  },
  {
    id: '8',
    name: 'Riley Zhang',
    pronouns: 'They/Them',
    bio: 'cs sophomore, prev swe intern. love building apis and automating stuff',
    github: 'riley-zhang',
    devpost: 'rileyzhang',
    timeZone: 'Canada - Eastern',
    timeZoneOffset: -5,
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'AWS'],
    interests: ['Backend', 'APIs', 'Cloud Infrastructure', 'Automation'],
    isOnline: false,
    lastActive: '2 hours ago',
    role: 'Backend Developer',
    intent: 'looking to learn new tech and build something cool with a chill team',
    activityLevel: 'About once per month — Active',
  },
  {
    id: '9',
    name: 'Yuki Tanaka',
    pronouns: 'She/Her',
    bio: 'full-stack, really into real-time apps and websockets. lets build fast',
    github: 'yuki-codes',
    devpost: 'yukitanaka',
    timeZone: 'Japan',
    timeZoneOffset: 9,
    skills: ['TypeScript', 'WebSockets', 'Socket.io', 'React', 'Node.js'],
    interests: ['Real-time Apps', 'Multiplayer Games', 'Chat Apps'],
    isOnline: true,
    lastActive: '15 min ago',
    role: 'Full-stack Developer',
    intent: 'ship something fun this weekend, maybe a multiplayer game?',
    activityLevel: 'Multiple times per month — Very Active',
  },
  {
    id: '10',
    name: 'Marcus Johnson',
    pronouns: 'He/Him',
    bio: 'product designer turned pm. love talking to users and iterating fast',
    github: 'marcus-pm',
    devpost: 'marcusj',
    timeZone: 'United States - East Coast',
    timeZoneOffset: -5,
    skills: ['Product Management', 'Figma', 'User Research', 'SQL', 'React basics'],
    interests: ['Product Strategy', 'User Research', 'Early-stage Startups'],
    isOnline: false,
    lastActive: '45 min ago',
    role: 'Product Manager',
    intent: 'find a team that cares about solving real problems, not just tech for tech sake',
    activityLevel: 'A few times per year — Casual',
  },
];

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export type TeamStatus = 'matched' | 'chatting' | 'teamed' | 'forfeited' | 'archived';

export interface Match {
  userId: string; // For individual chats: the other user's ID. For team chats: "team_${projectId}"
  matchedAt: string;
  messages: Message[];
  teamStatus: TeamStatus;
  projectId?: string;
  teamMembers?: string[]; // Array of user IDs in team chat
  isTeamChat?: boolean; // True if this is a team chat (not a 1-on-1)
}

export const initialMatches: Match[] = [];
