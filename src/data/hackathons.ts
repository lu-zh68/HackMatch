export interface Hackathon {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  isActive: boolean;
  participantCount: number;
  tracks?: string[];
  prizes?: string[];
}

export const mockHackathons: Hackathon[] = [
  {
    id: 'hack6',
    name: 'Hacks for Hackers',
    description: 'Build creative hacks that empower you and your fellow hackers to do more and celebrate the new year with us',
    startDate: 'Jan 2, 2026',
    endDate: 'Jan 4, 2026',
    location: 'Online',
    isActive: true,
    participantCount: 313,
    tracks: ['Beginner Friendly', 'Open Ended', 'Social Good'],
    prizes: ['9 non-cash awards', 'Best Hack for Hackers - Keyboard', 'Best Use of Gemini API - Google Swag'],
  },
  {
    id: 'hack1',
    name: 'HackMIT 2024',
    description: 'Build the future at MIT\'s premier hackathon',
    startDate: 'Feb 15, 2024',
    endDate: 'Feb 17, 2024',
    location: 'Cambridge, MA',
    isActive: true,
    participantCount: 1247,
    tracks: ['AI/ML', 'Web3', 'Social Impact', 'Hardware'],
    prizes: ['$10,000 Grand Prize', 'Sponsor Prizes'],
  },
  {
    id: 'hack2',
    name: 'TreeHacks 2024',
    description: 'Stanford\'s annual hackathon',
    startDate: 'Feb 22, 2024',
    endDate: 'Feb 24, 2024',
    location: 'Stanford, CA',
    isActive: true,
    participantCount: 892,
    tracks: ['Sustainability', 'Health', 'Education', 'FinTech'],
    prizes: ['$15,000 in prizes'],
  },
  {
    id: 'hack3',
    name: 'PennApps XXV',
    description: 'The world\'s first college hackathon, still going strong',
    startDate: 'Mar 1, 2024',
    endDate: 'Mar 3, 2024',
    location: 'Philadelphia, PA',
    isActive: true,
    participantCount: 1056,
    tracks: ['Open Track', 'Beginner Track'],
    prizes: ['$20,000+ in prizes'],
  },
  {
    id: 'hack4',
    name: 'HackTheNorth',
    description: 'Canada\'s biggest hackathon',
    startDate: 'Mar 15, 2024',
    endDate: 'Mar 17, 2024',
    location: 'Waterloo, ON',
    isActive: true,
    participantCount: 1500,
    tracks: ['AI', 'Blockchain', 'Gaming', 'Social Good'],
    prizes: ['$50,000 in prizes'],
  },
  {
    id: 'hack5',
    name: 'CalHacks 11.0',
    description: 'UC Berkeley\'s flagship hackathon',
    startDate: 'Mar 29, 2024',
    endDate: 'Mar 31, 2024',
    location: 'Berkeley, CA',
    isActive: true,
    participantCount: 1320,
    tracks: ['General', 'Beginner'],
    prizes: ['$30,000 in prizes'],
  },
];
