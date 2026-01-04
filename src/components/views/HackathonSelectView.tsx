import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Trophy, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockHackathons } from '@/data/hackathons';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/BottomNav';

export function HackathonSelectView() {
  const { navigate } = useApp();

  const handleSelectHackathon = (hackathonId: string) => {
    // Store selected hackathon
    localStorage.setItem('selectedHackathon', hackathonId);
    // Navigate to onboarding if new user, or swipe if returning
    const hasProfile = localStorage.getItem('userProfile');
    navigate(hasProfile ? 'swipe' : 'onboarding');
  };

  return (
    <div className="min-h-screen px-4 pt-6 pb-28 relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-20 pointer-events-none" />

      <div className="max-w-sm mx-auto relative z-10">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Select Your Hackathon
        </h1>
        <p className="text-muted-foreground">
          Choose which event you're attending to find teammates
        </p>
      </motion.div>

      {/* Hackathon List */}
      <div className="space-y-4">
        {mockHackathons.map((hackathon, index) => (
          <motion.div
            key={hackathon.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <button
              onClick={() => handleSelectHackathon(hackathon.id)}
              className="w-full flat-card rounded-xl p-5 text-left hover:border-primary/50 transition-all duration-200 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                    {hackathon.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {hackathon.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{hackathon.startDate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{hackathon.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium">{hackathon.participantCount.toLocaleString()}</span>
                  <span className="text-muted-foreground">hackers</span>
                </div>
                {hackathon.prizes && (
                  <div className="flex items-center gap-1.5 text-sm">
                    <Trophy className="w-4 h-4 text-warning" />
                    <span className="text-muted-foreground">{hackathon.prizes[0]}</span>
                  </div>
                )}
              </div>

              {/* Tracks */}
              {hackathon.tracks && (
                <div className="flex flex-wrap gap-2">
                  {hackathon.tracks.slice(0, 3).map((track) => (
                    <span
                      key={track}
                      className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20"
                    >
                      {track}
                    </span>
                  ))}
                  {hackathon.tracks.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                      +{hackathon.tracks.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Skip option */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <Button
          variant="ghost"
          onClick={() => navigate('onboarding')}
          className="text-muted-foreground hover:text-foreground"
        >
          Skip for now
        </Button>
      </motion.div>

      </div>
      <BottomNav />
    </div>
  );
}
