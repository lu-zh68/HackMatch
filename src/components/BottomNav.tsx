import { motion } from 'framer-motion';
import { Flame, MessageCircle, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { AppView } from '@/types/app';

const navItems: { view: AppView; icon: typeof Flame; label: string }[] = [
  { view: 'swipe', icon: Flame, label: 'Swipe' },
  { view: 'matches', icon: MessageCircle, label: 'Matches' },
  { view: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  const { currentView, navigate } = useApp();

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="max-w-sm mx-auto w-full px-4 mb-4">
        <div className="bg-card border-t border-border px-6 py-3 rounded-xl">
          <div className="flex items-center justify-around">
          {navItems.map(({ view, icon: Icon, label }) => {
            const isActive = currentView === view || (currentView === 'chat' && view === 'matches');
            return (
              <motion.button
                key={view}
                onClick={() => navigate(view)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex flex-col items-center gap-1 px-4 py-2 transition-colors duration-200"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon
                  className={`w-5 h-5 relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span
                  className={`text-xs font-medium relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
