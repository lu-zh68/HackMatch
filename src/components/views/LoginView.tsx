import { motion } from 'framer-motion';
import { Github, ArrowRight, Heart, MessageCircle, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

export function LoginView() {
  const { login } = useApp();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Grid pattern background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Subtle glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-lg w-full"
      >
        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tighter mb-4">
            <span className="text-gradient-primary">Hack</span>
            <span className="text-foreground">Match</span>
          </h1>
          <p className="text-xl text-muted-foreground font-medium tracking-tight">
            Swipe. Match. Build.
          </p>
        </motion.div>

        {/* Feature Preview - Animated Flow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-8 py-8">
            {/* Swipe */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Swipe</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ArrowRight className="w-6 h-6 text-muted-foreground/40" />
            </motion.div>

            {/* Match */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                <MessageCircle className="w-7 h-7 text-green-500" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Match</span>
            </motion.div>

            {/* Arrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <ArrowRight className="w-6 h-6 text-muted-foreground/40" />
            </motion.div>

            {/* Build */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Users className="w-7 h-7 text-blue-500" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">Build</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Code snippet */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <div className="code-block text-muted-foreground text-xs overflow-x-auto">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground/60">
              <span className="w-3 h-3 rounded-full bg-destructive/60" />
              <span className="w-3 h-3 rounded-full bg-warning/60" />
              <span className="w-3 h-3 rounded-full bg-success/60" />
            </div>
            <code>
              <span className="text-primary">const</span>{' '}
              <span className="text-foreground">team</span>{' '}
              <span className="text-muted-foreground">=</span>{' '}
              <span className="text-primary">await</span>{' '}
              <span className="text-foreground">hackmatch</span>
              <span className="text-muted-foreground">.</span>
              <span className="text-warning">findTeammates</span>
              <span className="text-muted-foreground">(</span>
              <span className="text-success">{'{ skills, timezone }'}</span>
              <span className="text-muted-foreground">);</span>
            </code>
          </div>
        </motion.div>

        {/* Login Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Button
            onClick={login}
            size="lg"
            className="w-full h-14 text-base font-semibold bg-foreground text-background hover:bg-foreground/90 rounded-lg gap-3 transition-all duration-200"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
            <ArrowRight className="w-4 h-4 ml-auto" />
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Join 10,000+ hackers finding their dream teams
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
