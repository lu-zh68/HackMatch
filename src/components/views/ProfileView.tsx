import { motion } from 'framer-motion';
import { Settings, LogOut, Github, ExternalLink, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BottomNav } from '@/components/BottomNav';
import { InitialsAvatar } from '@/components/InitialsAvatar';

export function ProfileView() {
  const { userProfile, logout, matches } = useApp();

  const defaultProfile = {
    name: 'Hacker',
    pronouns: 'They/Them',
    bio: 'Ready to build something amazing',
    github: 'username',
    devpost: 'username',
    timeZone: 'UTC+0',
    skills: ['JavaScript', 'React'],
    interests: ['Web Development', 'Hackathons'],
  };

  const profile = userProfile || defaultProfile;

  return (
    <div className="min-h-screen px-4 pt-6 pb-28 relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-20 pointer-events-none" />

      <div className="max-w-sm mx-auto relative z-10">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 relative z-10"
      >
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Profile
        </h1>
      </motion.div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flat-card rounded-2xl p-6 mb-6 relative z-10"
      >
        {/* Avatar & Name */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <InitialsAvatar name={profile.name} size="lg" className="border-2 border-primary glow-primary" />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.pronouns}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-muted-foreground text-sm mb-6">{profile.bio}</p>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span key={skill} className="skill-pill">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Interests */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span key={interest} className="skill-pill">{interest}</span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        <div className="space-y-3">
          <a
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-foreground" />
              <div>
                <p className="text-sm font-medium">GitHub</p>
                <p className="text-xs text-muted-foreground">@{profile.github}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>

          <a
            href={`https://devpost.com/${profile.devpost}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors border border-border"
          >
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-primary/20 rounded flex items-center justify-center text-primary text-xs font-bold">
                D
              </div>
              <div>
                <p className="text-sm font-medium">Devpost</p>
                <p className="text-xs text-muted-foreground">@{profile.devpost}</p>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          </a>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3 mb-6 relative z-10"
      >
        <div className="grid grid-cols-2 gap-3">
          <div className="flat-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{matches.length}</p>
            <p className="text-xs text-muted-foreground">Matches</p>
          </div>
          <div className="flat-card rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-primary">{matches.length}</p>
            <p className="text-xs text-muted-foreground">Chats</p>
          </div>
        </div>
        <div className="flat-card rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-primary">
            {profile.hackathonCount !== null && profile.hackathonCount !== undefined ? profile.hackathonCount : ''}
          </p>
          <p className="text-xs text-muted-foreground">Hackathons</p>
        </div>
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-3 relative z-10"
      >
        <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold px-2">
          Settings
        </h3>
        
        <div className="flat-card rounded-xl overflow-hidden">
          <button
            onClick={logout}
            className="w-full flex items-center justify-between p-4 hover:bg-destructive/10 transition-colors text-destructive"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <LogOut className="w-5 h-5" />
              </div>
              <span className="font-medium">Log Out</span>
            </div>
          </button>
        </div>
      </motion.div>

      </div>
      <BottomNav />
    </div>
  );
}
