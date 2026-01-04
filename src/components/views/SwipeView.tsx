import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Github, Clock, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockUsers, MockUser } from '@/data/mockUsers';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';
import { MatchModal } from '@/components/MatchModal';
import { InitialsAvatar } from '@/components/InitialsAvatar';
import { calculateMatchScores, sortAndGroupCandidates, MatchScore } from '@/utils/matching';
import { getTimeDifference } from '@/utils/timezones';

export function SwipeView() {
  const { addMatch, matchedUserIds, userProfile } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [showMatch, setShowMatch] = useState(false);
  const [matchedUser, setMatchedUser] = useState<MockUser | null>(null);
  const [sortedUsers, setSortedUsers] = useState<MockUser[]>([]);
  const [matchScores, setMatchScores] = useState<MatchScore[]>([]);
  const [isCalculating, setIsCalculating] = useState(true);

  // Calculate match scores and sort users
  useEffect(() => {
    const calculateAndSort = async () => {
      if (!userProfile) return;

      const availableUsers = mockUsers.filter((u) => !matchedUserIds.includes(u.id));

      // Calculate match scores using Gemini
      const scores = await calculateMatchScores(userProfile, availableUsers, true);
      setMatchScores(scores);

      // Sort and group by interests
      const sorted = sortAndGroupCandidates(availableUsers, scores, userProfile.interests);
      setSortedUsers(sorted);
      setIsCalculating(false);
    };

    calculateAndSort();
  }, [userProfile, matchedUserIds]);

  const currentUser = sortedUsers[currentIndex];
  const currentScore = matchScores.find(s => s.userId === currentUser?.id);

  // Calculate time difference
  const timeDiff = currentUser && userProfile
    ? getTimeDifference(userProfile.timeZone, currentUser.timeZone)
    : null;

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    if (!currentUser) return;
    
    setDirection(swipeDirection);
    
    if (swipeDirection === 'right') {
      // Simulate match (50% chance for demo)
      const isMatch = Math.random() > 0.3;
      if (isMatch) {
        addMatch(currentUser.id);
        setMatchedUser(currentUser);
        setTimeout(() => setShowMatch(true), 400);
      }
    }
    
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setDirection(null);
    }, 300);
  };

  if (isCalculating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Finding your best matches...</h2>
          <p className="text-muted-foreground">Using AI to analyze compatibility</p>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold mb-2">You've seen everyone!</h2>
          <p className="text-muted-foreground">Check back later for new hackers</p>
        </motion.div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col px-4 pt-4 pb-32 relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-20 pointer-events-none" />

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center relative z-10 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentUser.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
              rotate: direction === 'left' ? -15 : direction === 'right' ? 15 : 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flat-card rounded-2xl w-full max-w-sm overflow-hidden max-h-[calc(100vh-240px)] overflow-y-auto"
          >
            {/* Avatar - Large and Central */}
            <div className="pt-8 pb-4 flex justify-center relative">
              <InitialsAvatar name={currentUser.name} size="xl" />
              {/* Match Score Badge */}
              {currentScore && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-primary px-3 py-1.5 rounded-full border border-primary/20">
                  <Sparkles className="w-3 h-3 text-primary-foreground" />
                  <span className="text-xs font-bold text-primary-foreground">{currentScore.score}% Match</span>
                </div>
              )}
              {/* Online indicator */}
              {currentUser.isOnline && (
                <div className="absolute top-4 right-4 flex items-center gap-2 bg-card px-3 py-1.5 rounded-full border border-border">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-xs font-medium text-primary">Online</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 pt-2 space-y-4">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold tracking-tight">{currentUser.name}</h2>
                <div className="flex items-center justify-center gap-3 mt-1">
                  <span className="text-sm text-muted-foreground">{currentUser.pronouns}</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{currentUser.bio}</p>
                {currentUser.intent && (
                  <p className="text-muted-foreground text-xs mt-2 italic">"{currentUser.intent}"</p>
                )}
              </div>

              {/* Time Zone Badge - Prominent */}
              <div className="flex justify-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-muted-foreground border border-border">
                  <Clock className="w-3.5 h-3.5" />
                  {currentUser.timeZone}
                </span>

                {timeDiff && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium ${
                    timeDiff.hours === 0
                      ? 'bg-green-500/10 text-green-500 border-green-500/20'
                      : timeDiff.hours <= 3
                      ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                  }`}>
                    {timeDiff.hours === 0 ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        {timeDiff.text}
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        {timeDiff.text}
                      </>
                    )}
                  </span>
                )}

                {/* Hackathon Count Badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  🏆 {currentUser.hackathonCount !== null && currentUser.hackathonCount !== undefined ? `${currentUser.hackathonCount} hackathon${currentUser.hackathonCount !== 1 ? 's' : ''}` : '--'}
                </span>
              </div>

              {/* Skills - Prominent */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.skills.map((skill) => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentUser.interests.map((interest) => (
                    <span key={interest} className="skill-pill">{interest}</span>
                  ))}
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-2 font-semibold">Activity Level</h3>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-muted text-foreground border border-border">
                  {currentUser.activityLevel.includes('—') ? currentUser.activityLevel.split('—')[1].trim() : currentUser.activityLevel}
                </div>
              </div>

              {/* GitHub Link */}
              <Button
                variant="outline"
                className="w-full gap-2 bg-background border-border hover:bg-muted hover:border-primary/50 transition-all duration-200"
                onClick={() => window.open(`https://github.com/${currentUser.github}`, '_blank')}
              >
                <Github className="w-4 h-4" />
                View GitHub
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="fixed bottom-20 left-0 right-0 flex items-center justify-center gap-8 py-4 z-20 bg-gradient-to-t from-background via-background to-transparent pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center hover:border-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <X className="w-7 h-7 text-muted-foreground hover:text-destructive" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleSwipe('right')}
          className="w-20 h-20 rounded-full bg-primary border border-primary flex items-center justify-center hover:bg-primary/90 transition-all duration-200 glow-primary"
        >
          <Heart className="w-9 h-9 text-primary-foreground" />
        </motion.button>
      </div>

      <BottomNav />
      
      <MatchModal 
        isOpen={showMatch} 
        onClose={() => setShowMatch(false)} 
        matchedUser={matchedUser}
      />
    </div>
  );
}
