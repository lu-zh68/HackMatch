import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from '@/context/AppContext';
import { LoginView } from '@/components/views/LoginView';
import { HackathonSelectView } from '@/components/views/HackathonSelectView';
import { OnboardingView } from '@/components/views/OnboardingView';
import { SwipeView } from '@/components/views/SwipeView';
import { MatchesView } from '@/components/views/MatchesView';
import { ChatView } from '@/components/views/ChatView';
import { ProfileView } from '@/components/views/ProfileView';

function AppContent() {
  const { currentView } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'login':
        return <LoginView />;
      case 'hackathon-select':
        return <HackathonSelectView />;
      case 'onboarding':
        return <OnboardingView />;
      case 'swipe':
        return <SwipeView />;
      case 'matches':
        return <MatchesView />;
      case 'chat':
        return <ChatView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <LoginView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Index = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default Index;
