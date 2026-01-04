import { motion } from 'framer-motion';
import { MessageCircle, Sparkles, Users, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockUsers, TeamStatus } from '@/data/mockUsers';
import { BottomNav } from '@/components/BottomNav';
import { InitialsAvatar } from '@/components/InitialsAvatar';

function getTeamStatusBadge(status: TeamStatus) {
  switch (status) {
    case 'matched':
      return { text: 'New Match', className: 'bg-primary/10 text-primary border-primary/20' };
    case 'chatting':
      return { text: 'Chatting', className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' };
    case 'teamed':
      return { text: 'Team Formed', className: 'bg-green-500/10 text-green-500 border-green-500/20' };
    case 'forfeited':
      return { text: 'Forfeited', className: 'bg-red-500/10 text-red-500 border-red-500/20' };
  }
}

export function MatchesView() {
  const { matches, openChat } = useApp();

  const matchedUsers = matches.map((match) => ({
    ...match,
    user: mockUsers.find((u) => u.id === match.userId)!,
  })).filter((m) => m.user);

  return (
    <div className="min-h-screen px-4 pt-6 pb-28 relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-20 pointer-events-none" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 relative z-10"
      >
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-primary" />
          Matches
        </h1>
        <p className="text-muted-foreground text-sm">
          {matchedUsers.length} teammate{matchedUsers.length !== 1 ? 's' : ''} ready to hack
        </p>
      </motion.div>

      {/* Match List */}
      {matchedUsers.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <Sparkles className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No matches yet</h2>
          <p className="text-muted-foreground">
            Keep swiping to find your dream team!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-3 relative z-10">
          {matchedUsers.map(({ user, matchedAt, messages, teamStatus }, index) => {
            const lastMessage = messages[messages.length - 1];
            const statusBadge = getTeamStatusBadge(teamStatus);
            return (
              <motion.button
                key={user.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => openChat(user.id)}
                className="w-full flat-card rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 hover:border-primary/30 transition-all duration-200"
              >
                {/* Avatar */}
                <div className="relative">
                  <InitialsAvatar name={user.name} size="md" />
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-card" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{user.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge.className}`}>
                      {statusBadge.text}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {lastMessage ? (
                      <>
                        {lastMessage.senderId === 'me' ? 'You: ' : ''}
                        {lastMessage.text}
                      </>
                    ) : (
                      <span className="text-primary">Say hi!</span>
                    )}
                  </p>
                </div>

                {/* Skills preview */}
                <div className="hidden sm:flex gap-1">
                  {user.skills.slice(0, 2).map((skill) => (
                    <span key={skill} className="skill-pill text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      )}

      <BottomNav />
    </div>
  );
}
