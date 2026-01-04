import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, X } from 'lucide-react';
import { MockUser } from '@/data/mockUsers';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { InitialsAvatar } from '@/components/InitialsAvatar';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchedUser: MockUser | null;
}

export function MatchModal({ isOpen, onClose, matchedUser }: MatchModalProps) {
  const { openChat, userProfile } = useApp();

  if (!matchedUser) return null;

  const handleSendMessage = () => {
    openChat(matchedUser.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="flat-card rounded-2xl p-8 max-w-sm w-full text-center relative overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">
                <span className="text-gradient-primary">It's a Match!</span>
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                You and {matchedUser.name} want to hack together
              </p>
            </motion.div>

            {/* Avatars */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-6 mb-8"
            >
              <div className="relative">
                <InitialsAvatar 
                  name={userProfile?.name || 'You'} 
                  size="xl" 
                  className="border-2 border-primary glow-primary"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-0.5 rounded">
                  You
                </div>
              </div>
              
              <Sparkles className="w-6 h-6 text-primary" />

              <div className="relative">
                <InitialsAvatar 
                  name={matchedUser.name} 
                  size="xl" 
                  className="border-2 border-primary"
                />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-muted text-foreground text-xs font-semibold px-2 py-0.5 rounded border border-border">
                  {matchedUser.name.split(' ')[0]}
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <Button
                onClick={handleSendMessage}
                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2 transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5" />
                Send a Message
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                Keep Swiping
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
