export type AppView = 'login' | 'hackathon-select' | 'onboarding' | 'swipe' | 'matches' | 'chat' | 'profile';

export interface UserProfile {
  name: string;
  pronouns: string;
  bio: string;
  github: string;
  devpost: string;
  timeZone: string;
  skills: string[];
  interests: string[];
  role: string;
  intent: string;
  activityLevel: string;
  hackathonCount?: number | null;
  currentProjectId?: string;
  lookingForTeam: boolean;
  occupation: string;
  studentLevel?: string;
  schoolName: string;
  graduationMonth: string;
  graduationYear: string;
  birthMonth?: string;
  birthYear?: string;
}

export interface AppState {
  currentView: AppView;
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  userProfile: UserProfile | null;
  matchedUserIds: string[];
  currentChatUserId: string | null;
}
