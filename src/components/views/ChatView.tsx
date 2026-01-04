import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Github, Users, XCircle, PartyPopper, Archive, Info, UserPlus } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { mockUsers } from '@/data/mockUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/BottomNav';
import { InitialsAvatar } from '@/components/InitialsAvatar';
import { Project } from '@/data/projects';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function ChatView() {
  const { currentChatUserId, navigate, matches, matchedUserIds, addMessage, updateTeamStatus, createProject, projects, addTeamMember } = useApp();
  const [message, setMessage] = useState('');
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showAddTeammate, setShowAddTeammate] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [showTeamMembers, setShowTeamMembers] = useState(false);
  const [showAddToTeamDialog, setShowAddToTeamDialog] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const user = mockUsers.find((u) => u.id === currentChatUserId);
  const match = matches.find((m) => m.userId === currentChatUserId);
  const project = match?.projectId ? projects.find(p => p.id === match.projectId) : null;

  // Get team members if this is a team chat
  const teamMembers = match?.teamMembers ?
    mockUsers.filter(u => match.teamMembers?.includes(u.id)) :
    [];
  const isTeamChat = teamMembers.length > 1;

  // Get available matches to add as teammates (exclude already in team)
  const availableTeammates = mockUsers.filter(u =>
    matchedUserIds.includes(u.id) &&
    u.id !== currentChatUserId &&
    !match?.teamMembers?.includes(u.id)
  );

  // Get user's existing teams (projects where user is not already a member)
  const existingTeams = projects.filter(p =>
    !p.members.includes(currentChatUserId || '') &&
    p.members.length < p.maxMembers
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [match?.messages]);

  if (!user || !match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Chat not found</p>
      </div>
    );
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage(user.id, message.trim());
      setMessage('');
    }
  };

  const handleFormTeam = () => {
    setShowCreateProject(true);
  };

  const handleCreateProject = () => {
    if (!projectName.trim()) return;

    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: projectName,
      description: projectDescription,
      hackathonId: localStorage.getItem('selectedHackathon') || '',
      createdBy: 'me',
      members: ['me', user.id],
      maxMembers: 4,
      skills: [],
      createdAt: new Date().toISOString(),
    };

    createProject(user.id, newProject);
    setShowCreateProject(false);
    setProjectName('');
    setProjectDescription('');
  };

  const handleArchive = () => {
    updateTeamStatus(user.id, 'archived');
    navigate('matches');
  };

  const handleAddTeammate = (teammateId: string) => {
    if (currentChatUserId) {
      addTeamMember(currentChatUserId, teammateId);
      setShowAddTeammate(false);
    }
  };

  const handleAddToExistingTeam = (projectId: string) => {
    // Find the chat that has this project
    const teamChat = matches.find(m => m.projectId === projectId);
    if (teamChat && currentChatUserId) {
      addTeamMember(teamChat.userId, currentChatUserId);
      setShowAddToTeamDialog(false);
    }
  };

  const handleCreateNewTeam = () => {
    setShowAddToTeamDialog(false);
    setShowCreateProject(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card border-b border-border px-4 py-3 sticky top-0 z-40"
      >
        <div className="max-w-sm mx-auto w-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('matches')}
              className="hover:bg-muted"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div className="relative">
              <InitialsAvatar name={user.name} size="sm" />
              {user.isOnline && (
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-primary rounded-full border-2 border-card" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="font-semibold">
                {project ? project.name : (isTeamChat ? `Team Chat (${teamMembers.length})` : user.name.split(' ')[0])}
              </h2>
              <p className="text-xs text-muted-foreground">
                {isTeamChat
                  ? teamMembers.map(m => m.name.split(' ')[0]).join(', ')
                  : (user.isOnline ? 'Online' : user.lastActive)}
              </p>
            </div>

            {isTeamChat && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddTeammate(true)}
                  className="hover:bg-muted"
                >
                  <UserPlus className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTeamMembers(true)}
                  className="hover:bg-muted"
                >
                  <Info className="w-5 h-5" />
                </Button>
              </>
            )}

            {!isTeamChat && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddToTeamDialog(true)}
                  className="hover:bg-muted"
                >
                  <UserPlus className="w-5 h-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(`https://github.com/${user.github}`, '_blank')}
                  className="hover:bg-muted"
                >
                  <Github className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Team member skills */}
          {isTeamChat ? (
            <div className="mt-3 space-y-3">
              {teamMembers.map(member => (
                <div key={member.id}>
                  <p className="text-xs text-muted-foreground mb-1.5">{member.name.split(' ')[0]}</p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {member.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="shrink-0 skill-pill text-xs">
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{member.skills.length - 4}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setShowAllSkills(true)}
                className="shrink-0 skill-pill text-xs flex items-center gap-1.5 hover:bg-primary/20 transition-colors"
              >
                All Skills ({user.skills.length})
              </button>
            </div>
          )}
        </div>
      </motion.header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-40 max-w-sm mx-auto w-full">
        {/* Match notification */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20">
            <span>✓</span>
            <span>You matched {match.matchedAt}</span>
          </div>
        </motion.div>

        {/* Message bubbles */}
        {match.messages.map((msg, index) => {
          const isMe = msg.senderId === 'me';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-xl ${
                  isMe
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'flat-card rounded-bl-sm'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}

        {match.messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <p className="text-muted-foreground">
              Send a message to start the conversation!
            </p>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Team Formation Actions */}
      {match.teamStatus === 'chatting' && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-[180px] left-0 right-0 px-4 z-30 max-w-sm mx-auto w-full"
        >
          <div className="bg-card border border-primary/20 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span className="font-medium">Ready to team up and create a project?</span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleFormTeam}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
              >
                <PartyPopper className="w-4 h-4" />
                Create Project
              </Button>
              <Button
                onClick={handleArchive}
                variant="outline"
                className="flex-1 border-muted-foreground/20 text-muted-foreground hover:bg-muted gap-2"
              >
                <Archive className="w-4 h-4" />
                Archive
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {match.teamStatus === 'teamed' && project && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-[180px] left-0 right-0 px-4 z-30 max-w-sm mx-auto w-full"
        >
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-green-500">
              <PartyPopper className="w-5 h-5" />
              <span className="font-medium">Project Created: {project.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Team Members ({project.members.length}/{project.maxMembers}): You and {user.name}
            </div>
            <p className="text-xs text-muted-foreground italic">
              Your profile is still visible to find more teammates!
            </p>
          </div>
        </motion.div>
      )}

      {/* Message Input */}
      <div className="fixed bottom-24 left-0 right-0 px-4 z-30 max-w-sm mx-auto w-full">
        <form onSubmit={handleSend} className="bg-card border border-border rounded-xl p-2 flex items-center gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim()}
            className="w-10 h-10 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>

      <BottomNav />

      {/* Create Project Dialog */}
      <Dialog open={showCreateProject} onOpenChange={setShowCreateProject}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Create Your Project</DialogTitle>
            <DialogDescription>
              Start a project with {user?.name}. You can add more teammates later!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name *</Label>
              <Input
                id="project-name"
                placeholder="e.g., AI Study Buddy"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="bg-background border-border"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description</Label>
              <Textarea
                id="project-description"
                placeholder="What are you building?"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="bg-background border-border resize-none"
                rows={3}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowCreateProject(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateProject}
              disabled={!projectName.trim()}
              className="flex-1 bg-primary text-primary-foreground"
            >
              Create Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Teammate Dialog */}
      <Dialog open={showAddTeammate} onOpenChange={setShowAddTeammate}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Add Teammate</DialogTitle>
            <DialogDescription>
              Select a teammate from your matches to add to this chat
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {availableTeammates.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No more matches available to add
              </p>
            ) : (
              availableTeammates.map(teammate => (
                <button
                  key={teammate.id}
                  onClick={() => handleAddTeammate(teammate.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all duration-200 border border-border hover:border-primary/30"
                >
                  <InitialsAvatar name={teammate.name} size="sm" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">{teammate.name}</p>
                    <p className="text-xs text-muted-foreground">{teammate.role}</p>
                  </div>
                  <Button size="sm" variant="outline" className="pointer-events-none">
                    Add
                  </Button>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* All Skills Dialog */}
      <Dialog open={showAllSkills} onOpenChange={setShowAllSkills}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>{user?.name.split(' ')[0]}'s Skills</DialogTitle>
            <DialogDescription>
              All {user?.skills.length} skills
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex flex-wrap gap-2">
              {user?.skills.map((skill) => (
                <span key={skill} className="skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Team Members Dialog */}
      <Dialog open={showTeamMembers} onOpenChange={setShowTeamMembers}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Team Members</DialogTitle>
            <DialogDescription>
              {project ? `${project.members.length}/${project.maxMembers} members` : `${teamMembers.length} members`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {/* You (current user) */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <InitialsAvatar name="You" size="md" />
              <div className="flex-1">
                <p className="font-semibold">You</p>
                <p className="text-xs text-muted-foreground">Team creator</p>
              </div>
            </div>

            {/* Team members */}
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                <InitialsAvatar name={member.name} size="md" />
                <div className="flex-1">
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(`https://github.com/${member.github}`, '_blank')}
                  className="hover:bg-muted"
                >
                  <Github className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Add to Team Dialog */}
      <Dialog open={showAddToTeamDialog} onOpenChange={setShowAddToTeamDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Add {user?.name.split(' ')[0]} to Team</DialogTitle>
            <DialogDescription>
              Select an existing team or create a new one
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {/* Existing teams */}
            {existingTeams.length > 0 && (
              <>
                <p className="text-sm font-medium text-muted-foreground">Existing Teams</p>
                {existingTeams.map((team) => (
                  <button
                    key={team.id}
                    onClick={() => handleAddToExistingTeam(team.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-all duration-200 border border-border hover:border-primary/30"
                  >
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{team.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {team.members.length}/{team.maxMembers} members
                      </p>
                    </div>
                    <Button size="sm" variant="outline" className="pointer-events-none">
                      Add Here
                    </Button>
                  </button>
                ))}
                <div className="border-t border-border my-2"></div>
              </>
            )}

            {/* Create new team */}
            <button
              onClick={handleCreateNewTeam}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-all duration-200 border border-border hover:border-primary/30"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <PartyPopper className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold">Create New Team</p>
                <p className="text-xs text-muted-foreground">
                  Start a new project with {user?.name.split(' ')[0]}
                </p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
