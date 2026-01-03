// Sample profiles for demo
const sampleProfiles = [
  {
    id: 1,
    name: "Sarah Chen",
    pronouns: "she/her",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Figma", "CSS"],
    lookingFor: ["Backend Dev", "Designer"],
    bio: "Love building beautiful UIs and creating delightful user experiences. Passionate about accessibility and inclusive design.",
    achievements: ["Won Best Design at HackMIT 2023", "Built 3 open-source React libraries", "Mentored 10+ beginners"],
    interests: ["Accessibility", "Design Systems", "Animation", "Web3"],
    hackathonCount: 8,
    timezone: "America/Los_Angeles",
    lastActive: Date.now() - 5 * 60 * 1000,
    devpostUrl: "https://devpost.com/sarah-chen-dev",
    githubUrl: "https://github.com/sarahchen",
    experienceLevel: "Intermediate"
  },
  {
    id: 2,
    name: "Alex Kumar",
    pronouns: "he/him",
    role: "Backend Engineer",
    skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
    lookingFor: ["Frontend Dev", "UI/UX Designer"],
    bio: "First hackathon! Excited to learn and build something cool. I love solving complex problems with elegant code.",
    achievements: ["Completed AWS certification", "Built API serving 10k+ requests/day", "Contributed to 5 open-source projects"],
    interests: ["Cloud Infrastructure", "API Design", "DevOps", "Machine Learning"],
    hackathonCount: 1,
    timezone: "America/New_York",
    lastActive: Date.now() - 2 * 60 * 60 * 1000,
    devpostUrl: "https://devpost.com/alex-kumar",
    githubUrl: "https://github.com/alexkumar",
    experienceLevel: "Beginner"
  },
  {
    id: 3,
    name: "Jordan Lee",
    pronouns: "they/them",
    role: "Full-Stack Developer",
    skills: ["JavaScript", "React", "Express", "MongoDB"],
    lookingFor: ["ML Engineer", "Data Scientist"],
    bio: "Veteran hacker who loves AI/ML projects. Let's build something ambitious and learn together!",
    achievements: ["Top 10 at TreeHacks 2024", "Published Chrome extension with 50k users", "Hackathon mentor for 3 years"],
    interests: ["Artificial Intelligence", "Blockchain", "EdTech", "Social Impact"],
    hackathonCount: 12,
    timezone: "Europe/London",
    lastActive: Date.now() - 15 * 60 * 1000,
    devpostUrl: "https://devpost.com/jlee-codes",
    githubUrl: "https://github.com/jordanlee",
    experienceLevel: "Advanced"
  },
  {
    id: 4,
    name: "Maya Patel",
    pronouns: "she/her",
    role: "UI/UX Designer",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    lookingFor: ["Frontend Dev", "Full-Stack Dev"],
    bio: "Designer who codes a bit. Passionate about accessibility and inclusive design. Let's make something beautiful AND functional!",
    achievements: ["Redesigned mobile app for 100k users", "Won Best UX at CalHacks", "Published design system on Figma Community"],
    interests: ["Accessibility", "Inclusive Design", "Design Systems", "HealthTech"],
    hackathonCount: 5,
    timezone: "Asia/Kolkata",
    lastActive: Date.now() - 30 * 60 * 1000,
    devpostUrl: "https://devpost.com/maya-designs",
    githubUrl: "https://github.com/mayapatel",
    experienceLevel: "Intermediate"
  },
  {
    id: 5,
    name: "Chris Martinez",
    pronouns: "he/him",
    role: "Machine Learning Engineer",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP"],
    lookingFor: ["Backend Dev", "Frontend Dev"],
    bio: "ML enthusiast who wants to build something that uses AI in a meaningful way. Let's solve real problems!",
    achievements: ["Research paper published at NeurIPS", "Built GPT-powered chatbot", "Kaggle competition bronze medal"],
    interests: ["Natural Language Processing", "Computer Vision", "HealthTech", "Climate Tech"],
    hackathonCount: 6,
    timezone: "America/Los_Angeles",
    lastActive: Date.now() - 10 * 60 * 1000,
    devpostUrl: "https://devpost.com/chris-ml",
    githubUrl: "https://github.com/chrismartinez",
    experienceLevel: "Intermediate"
  },
  {
    id: 6,
    name: "Emily Zhang",
    pronouns: "she/her",
    role: "Product Manager",
    skills: ["Product Strategy", "User Stories", "Wireframing", "Agile"],
    lookingFor: ["Developer", "Designer"],
    bio: "PM who wants to get hands-on at hackathons. Can help with scoping, user research, and making sure we build the right thing!",
    achievements: ["Shipped 3 products from 0 to 1", "Led product at YC startup", "TEDx speaker on product thinking"],
    interests: ["Product Design", "User Research", "Growth", "SaaS"],
    hackathonCount: 3,
    timezone: "America/Chicago",
    lastActive: Date.now() - 45 * 60 * 1000,
    devpostUrl: "https://devpost.com/emily-pm",
    githubUrl: "https://github.com/emilyzhang",
    experienceLevel: "Beginner"
  },
  {
    id: 7,
    name: "Raj Sharma",
    pronouns: "he/him",
    role: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "CI/CD", "AWS"],
    lookingFor: ["Backend Dev", "Full-Stack Dev"],
    bio: "Can handle all the infrastructure and deployment magic. Let's ship something solid to production!",
    achievements: ["Reduced deployment time by 80% at last job", "AWS Solutions Architect certified", "Built CI/CD for 50+ projects"],
    interests: ["Cloud Infrastructure", "Automation", "Security", "Open Source"],
    hackathonCount: 9,
    timezone: "Asia/Kolkata",
    lastActive: Date.now() - 3 * 60 * 60 * 1000,
    devpostUrl: "https://devpost.com/raj-devops",
    githubUrl: "https://github.com/rajsharma",
    experienceLevel: "Advanced"
  },
  {
    id: 8,
    name: "Sophie Williams",
    pronouns: "she/her",
    role: "Mobile Developer",
    skills: ["React Native", "Swift", "Flutter", "Firebase"],
    lookingFor: ["Backend Dev", "Designer"],
    bio: "Mobile-first mindset. Love creating smooth user experiences on iOS and Android. Let's build an app people actually use!",
    achievements: ["App featured on App Store", "Built app with 100k downloads", "Won Best Mobile at HackTheNorth"],
    interests: ["Mobile UX", "Cross-platform", "Gaming", "AR/VR"],
    hackathonCount: 7,
    timezone: "Europe/London",
    lastActive: Date.now() - 20 * 60 * 1000,
    devpostUrl: "https://devpost.com/sophie-mobile",
    githubUrl: "https://github.com/sophiewilliams",
    experienceLevel: "Intermediate"
  },
  {
    id: 9,
    name: "David Kim",
    pronouns: "he/him",
    role: "Data Scientist",
    skills: ["Python", "R", "Data Viz", "Pandas"],
    lookingFor: ["Frontend Dev", "Backend Dev"],
    bio: "Love turning data into insights and beautiful visualizations. Looking to build data-driven apps that make an impact!",
    achievements: ["Built ML model with 95% accuracy", "Kaggle expert rank", "Published 10+ data viz on Observable"],
    interests: ["Data Visualization", "Statistics", "Climate Data", "Sports Analytics"],
    hackathonCount: 4,
    timezone: "America/Los_Angeles",
    lastActive: Date.now() - 1 * 60 * 60 * 1000,
    devpostUrl: "https://devpost.com/david-data",
    githubUrl: "https://github.com/davidkim",
    experienceLevel: "Intermediate"
  },
  {
    id: 10,
    name: "Aisha Mohammed",
    pronouns: "she/her",
    role: "Cybersecurity Specialist",
    skills: ["Penetration Testing", "Security Audits", "Python", "Cryptography"],
    lookingFor: ["Backend Dev", "Full-Stack Dev"],
    bio: "First hackathon but security expert! Want to build something secure from the ground up. Privacy matters!",
    achievements: ["Found critical bug in Fortune 500 app", "CEH certified", "Spoke at DEF CON"],
    interests: ["Security", "Privacy", "Ethical Hacking", "Cryptography"],
    hackathonCount: 1,
    timezone: "Europe/Athens",
    lastActive: Date.now() - 25 * 60 * 1000,
    devpostUrl: "https://devpost.com/aisha-security",
    githubUrl: "https://github.com/aishamohammed",
    experienceLevel: "Beginner"
  },
  {
    id: 11,
    name: "Lucas Silva",
    pronouns: "he/him",
    role: "Game Developer",
    skills: ["Unity", "C#", "3D Modeling", "Game Design"],
    lookingFor: ["Developer", "Artist"],
    bio: "Game dev looking to try something different. Let's gamify a serious problem and make it fun!",
    achievements: ["Published game on Steam", "Won Ludum Dare game jam", "Built VR experience for museum"],
    interests: ["Game Design", "Gamification", "VR/AR", "Education"],
    hackathonCount: 10,
    timezone: "America/Sao_Paulo",
    lastActive: Date.now() - 40 * 60 * 1000,
    devpostUrl: "https://devpost.com/lucas-gamedev",
    githubUrl: "https://github.com/lucassilva",
    experienceLevel: "Advanced"
  },
  {
    id: 12,
    name: "Priya Nair",
    pronouns: "she/her",
    role: "Backend Developer",
    skills: ["Java", "Spring Boot", "MySQL", "GraphQL"],
    lookingFor: ["Frontend Dev", "Designer"],
    bio: "Solid backend skills and love clean APIs. Looking for creative frontend folks to bring ideas to life!",
    achievements: ["Built microservices architecture", "Optimized database reducing costs by 60%", "Contributed to Spring framework"],
    interests: ["API Design", "Microservices", "Performance", "FinTech"],
    hackathonCount: 6,
    timezone: "Asia/Kolkata",
    lastActive: Date.now() - 50 * 60 * 1000,
    devpostUrl: "https://devpost.com/priya-backend",
    githubUrl: "https://github.com/priyanair",
    experienceLevel: "Intermediate"
  },
  {
    id: 13,
    name: "Tom Anderson",
    pronouns: "he/him",
    role: "Frontend Developer",
    skills: ["Vue.js", "Nuxt", "TailwindCSS", "Animation"],
    lookingFor: ["Backend Dev", "ML Engineer"],
    bio: "Love creating delightful interactions and smooth animations. Want to work on AI-powered UIs!",
    achievements: ["Created viral interactive demo (500k views)", "Won Best Frontend at PennApps", "Published Vue component library"],
    interests: ["Animation", "WebGL", "Creative Coding", "Generative Art"],
    hackathonCount: 11,
    timezone: "Europe/Berlin",
    lastActive: Date.now() - 8 * 60 * 1000,
    devpostUrl: "https://devpost.com/tom-frontend",
    githubUrl: "https://github.com/tomanderson",
    experienceLevel: "Advanced"
  },
  {
    id: 14,
    name: "Nina Rodriguez",
    pronouns: "she/her",
    role: "Blockchain Developer",
    skills: ["Solidity", "Web3.js", "Smart Contracts", "Ethereum"],
    lookingFor: ["Frontend Dev", "Backend Dev"],
    bio: "Web3 enthusiast but open to non-crypto projects too. Just want to build cool stuff with awesome people!",
    achievements: ["Deployed 5 smart contracts on mainnet", "Won Chainlink hackathon", "Built DAO for local community"],
    interests: ["Web3", "Decentralization", "DAOs", "NFTs"],
    hackathonCount: 5,
    timezone: "America/Los_Angeles",
    lastActive: Date.now() - 2 * 60 * 60 * 1000,
    devpostUrl: "https://devpost.com/nina-blockchain",
    githubUrl: "https://github.com/ninarodriguez",
    experienceLevel: "Intermediate"
  },
  {
    id: 15,
    name: "Oscar Chen",
    pronouns: "he/him",
    role: "IoT Engineer",
    skills: ["Arduino", "Raspberry Pi", "C++", "Sensors"],
    lookingFor: ["Backend Dev", "Frontend Dev"],
    bio: "Hardware hacker! Want to build something that connects the physical and digital worlds. Let's make something tangible!",
    achievements: ["Built smart home system from scratch", "Won Best Hardware at MakeHarvard", "Created 20+ IoT projects"],
    interests: ["IoT", "Hardware", "Robotics", "Smart Cities"],
    hackathonCount: 8,
    timezone: "Asia/Tokyo",
    lastActive: Date.now() - 35 * 60 * 1000,
    devpostUrl: "https://devpost.com/oscar-iot",
    githubUrl: "https://github.com/oscarchen",
    experienceLevel: "Intermediate"
  },
  {
    id: 16,
    name: "Isabella Garcia",
    pronouns: "she/her",
    role: "Content Creator",
    skills: ["Video Editing", "Copywriting", "Social Media", "Storytelling"],
    lookingFor: ["Developer", "Designer"],
    bio: "Non-technical but love tech! Can help with pitch deck, demo video, storytelling, and marketing. Let's tell a great story!",
    achievements: ["100k YouTube subscribers", "Viral tech explainer videos", "TikTok creator with 500k followers"],
    interests: ["Content Creation", "Storytelling", "EdTech", "Creator Economy"],
    hackathonCount: 2,
    timezone: "America/Argentina/Buenos_Aires",
    lastActive: Date.now() - 12 * 60 * 1000,
    devpostUrl: "https://devpost.com/isabella-content",
    githubUrl: "https://github.com/isabellagarcia",
    experienceLevel: "Beginner"
  },
  {
    id: 17,
    name: "Kenji Tanaka",
    pronouns: "he/him",
    role: "AR/VR Developer",
    skills: ["Unity", "ARKit", "Oculus SDK", "3D Graphics"],
    lookingFor: ["Designer", "Full-Stack Dev"],
    bio: "Spatial computing fanatic. Looking to build immersive experiences that push boundaries. The metaverse is now!",
    achievements: ["Shipped VR game on Quest store", "Won Meta Reality Labs prize", "Built AR museum tour app"],
    interests: ["AR/VR", "Metaverse", "3D Graphics", "Gaming"],
    hackathonCount: 7,
    timezone: "Asia/Tokyo",
    lastActive: Date.now() - 55 * 60 * 1000,
    devpostUrl: "https://devpost.com/kenji-arvr",
    githubUrl: "https://github.com/kenjitanaka",
    experienceLevel: "Intermediate"
  },
  {
    id: 18,
    name: "Zara Ali",
    pronouns: "she/her",
    role: "QA Engineer",
    skills: ["Test Automation", "Selenium", "Jest", "Quality Assurance"],
    lookingFor: ["Developer", "Anyone!"],
    bio: "First hackathon! I test stuff for a living but want to help build something from scratch. Quality matters!",
    achievements: ["Found 1000+ bugs in production apps", "Built automated test suite", "ISTQB certified"],
    interests: ["Quality Assurance", "Testing", "DevOps", "Process Improvement"],
    hackathonCount: 1,
    timezone: "Asia/Karachi",
    lastActive: Date.now() - 18 * 60 * 1000,
    devpostUrl: "https://devpost.com/zara-qa",
    githubUrl: "https://github.com/zaraali",
    experienceLevel: "Beginner"
  },
  {
    id: 19,
    name: "Marcus Johnson",
    pronouns: "he/him",
    role: "Audio Engineer",
    skills: ["Sound Design", "Music Production", "Web Audio API", "Synthesis"],
    lookingFor: ["Frontend Dev", "Game Dev"],
    bio: "Sound + code = magic. Want to build something where audio is core to the experience. Let's make it sound amazing!",
    achievements: ["Produced music for indie games", "Built audio plugin with 10k users", "Sound designer for 50+ projects"],
    interests: ["Audio", "Music Tech", "Gaming", "Creative Coding"],
    hackathonCount: 4,
    timezone: "America/New_York",
    lastActive: Date.now() - 28 * 60 * 1000,
    devpostUrl: "https://devpost.com/marcus-audio",
    githubUrl: "https://github.com/marcusjohnson",
    experienceLevel: "Intermediate"
  },
  {
    id: 20,
    name: "Lily Wang",
    pronouns: "she/her",
    role: "Accessibility Specialist",
    skills: ["WCAG", "Screen Readers", "ARIA", "Inclusive Design"],
    lookingFor: ["Frontend Dev", "Designer"],
    bio: "Passionate about making tech accessible to everyone. Let's build something that works for ALL users, not just some!",
    achievements: ["Accessibility consultant for Fortune 500", "Redesigned gov site for screen readers", "Published a11y guidelines"],
    interests: ["Accessibility", "Inclusive Design", "Disability Rights", "EdTech"],
    hackathonCount: 13,
    timezone: "Australia/Sydney",
    lastActive: Date.now() - 5 * 60 * 1000,
    devpostUrl: "https://devpost.com/lily-a11y",
    githubUrl: "https://github.com/lilywang",
    experienceLevel: "Advanced"
  }
];

// Common interests for selection
const commonInterests = [
  "Accessibility",
  "Artificial Intelligence",
  "Animation",
  "AR/VR",
  "Audio",
  "Blockchain",
  "Climate Tech",
  "Cloud Infrastructure",
  "Computer Vision",
  "Creative Coding",
  "Cryptography",
  "Data Visualization",
  "Design Systems",
  "DevOps",
  "EdTech",
  "FinTech",
  "Gaming",
  "Generative Art",
  "HealthTech",
  "Inclusive Design",
  "IoT",
  "Machine Learning",
  "Metaverse",
  "Microservices",
  "Mobile UX",
  "Natural Language Processing",
  "Open Source",
  "Privacy",
  "Product Design",
  "Robotics",
  "Security",
  "Social Impact",
  "Web3"
];

// Timezone options
const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Sao_Paulo",
  "America/Argentina/Buenos_Aires",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Athens",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Karachi",
  "Australia/Sydney",
  "Africa/Cairo"
];

// Helper function to get readable timezone
function getReadableTimezone(tz) {
  const now = new Date();
  const tzOffset = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    timeZoneName: 'short'
  }).formatToParts(now).find(part => part.type === 'timeZoneName');

  return tzOffset ? tzOffset.value : tz;
}

// Helper function to get time ago string
function getTimeAgo(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Active now';
  if (minutes < 60) return `Active ${minutes} min ago`;
  if (hours < 24) return `Active ${hours} hour${hours > 1 ? 's' : ''} ago`;
  return `Active ${days} day${days > 1 ? 's' : ''} ago`;
}

// Helper function to get activity status class
function getActivityStatus(timestamp) {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);

  if (minutes < 15) return 'online'; // green
  if (minutes < 120) return 'recent'; // yellow
  return 'offline'; // gray
}
