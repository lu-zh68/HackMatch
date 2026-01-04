import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, AppView, UserProfile } from '@/types/app';
import { initialMatches, Match, Message, TeamStatus } from '@/data/mockUsers';
import { Project } from '@/data/projects';

interface AppContextType extends AppState {
  navigate: (view: AppView) => void;
  login: () => void;
  logout: () => void;
  completeOnboarding: (profile: UserProfile) => void;
  addMatch: (userId: string) => void;
  openChat: (userId: string) => void;
  matches: Match[];
  addMessage: (userId: string, text: string) => void;
  updateTeamStatus: (userId: string, status: TeamStatus) => void;
  createProject: (userId: string, project: Project) => void;
  projects: Project[];
  addTeamMember: (chatUserId: string, newMemberId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    currentView: 'login',
    isLoggedIn: false,
    hasCompletedOnboarding: false,
    userProfile: null,
    matchedUserIds: [],
    currentChatUserId: null,
  });

  const [matches, setMatches] = useState<Match[]>(initialMatches);
  const [projects, setProjects] = useState<Project[]>([]);

  const navigate = (view: AppView) => {
    setState(prev => ({ ...prev, currentView: view }));
  };

  const login = () => {
    setState(prev => ({
      ...prev,
      isLoggedIn: true,
      currentView: 'hackathon-select',
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      isLoggedIn: false,
      currentView: 'login',
    }));
  };

  const completeOnboarding = (profile: UserProfile) => {
    setState(prev => ({
      ...prev,
      hasCompletedOnboarding: true,
      userProfile: profile,
      currentView: 'swipe',
    }));
  };

  const addMatch = (userId: string) => {
    if (!state.matchedUserIds.includes(userId)) {
      setState(prev => ({
        ...prev,
        matchedUserIds: [...prev.matchedUserIds, userId],
      }));
      setMatches(prev => [
        ...prev,
        { userId, matchedAt: 'Just now', messages: [], teamStatus: 'matched' },
      ]);
    }
  };

  const openChat = (userId: string) => {
    setState(prev => ({
      ...prev,
      currentChatUserId: userId,
      currentView: 'chat',
    }));
  };

  const addMessage = (userId: string, text: string) => {
    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: 'Just now',
    };
    setMatches(prev =>
      prev.map(match =>
        match.userId === userId
          ? {
              ...match,
              messages: [...match.messages, newMessage],
              teamStatus: match.teamStatus === 'matched' ? 'chatting' : match.teamStatus
            }
          : match
      )
    );
  };

  const updateTeamStatus = (userId: string, status: TeamStatus) => {
    setMatches(prev =>
      prev.map(match =>
        match.userId === userId
          ? { ...match, teamStatus: status }
          : match
      )
    );
  };

  const createProject = (userId: string, project: Project) => {
    // Add project
    setProjects(prev => [...prev, project]);

    // Create a new team chat (separate from individual chats)
    const teamChatId = `team_${project.id}`;
    const newTeamChat: Match = {
      userId: teamChatId,
      matchedAt: 'Just now',
      messages: [],
      teamStatus: 'teamed',
      projectId: project.id,
      teamMembers: project.members.filter(m => m !== 'me'), // All members except "me"
      isTeamChat: true,
    };

    // Add the team chat to matches and mark individual chats as teamed
    setMatches(prev => [
      ...prev.map(match =>
        match.userId === userId
          ? { ...match, teamStatus: 'teamed', projectId: project.id }
          : match
      ),
      newTeamChat, // Add the new team chat
    ]);

    // Update user profile
    setState(prev => ({
      ...prev,
      userProfile: prev.userProfile ? {
        ...prev.userProfile,
        currentProjectId: project.id,
        lookingForTeam: true, // Still looking for more team members
      } : null,
    }));
  };

  const addTeamMember = (chatUserId: string, newMemberId: string) => {
    // Find the project associated with this chat (could be team chat or individual chat)
    const chatMatch = matches.find(m => m.userId === chatUserId);
    const projectId = chatMatch?.projectId;

    setMatches(prev =>
      prev.map(match => {
        // If this is the team chat, add the new member to teamMembers
        if (match.isTeamChat && match.projectId === projectId) {
          const currentTeamMembers = match.teamMembers || [];
          if (!currentTeamMembers.includes(newMemberId)) {
            return {
              ...match,
              teamMembers: [...currentTeamMembers, newMemberId],
            };
          }
        }
        // Mark the newly added member's individual chat as "teamed"
        if (match.userId === newMemberId && projectId) {
          return {
            ...match,
            teamStatus: 'teamed',
            projectId: projectId,
          };
        }
        return match;
      })
    );

    // Update the project to add the new member
    if (projectId) {
      setProjects(prev =>
        prev.map(project => {
          if (project.id === projectId && !project.members.includes(newMemberId)) {
            return {
              ...project,
              members: [...project.members, newMemberId],
            };
          }
          return project;
        })
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        navigate,
        login,
        logout,
        completeOnboarding,
        addMatch,
        openChat,
        matches,
        addTeamMember,
        addMessage,
        updateTeamStatus,
        createProject,
        projects,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
