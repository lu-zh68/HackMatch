import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { UserProfile } from '@/types/app';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const pronounOptions = ['He/Him', 'She/Her', 'They/Them', 'Other'];

const roleOptions = [
  'Frontend Developer',
  'Backend Developer',
  'Full-stack Developer',
  'Mobile Developer',
  'AI/ML Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Product Manager',
  'DevOps Engineer',
  'Security Engineer',
  'Other',
];

const timeZones = [
  'United States - West Coast',
  'United States - East Coast',
  'United States - Central',
  'Canada - Pacific',
  'Canada - Eastern',
  'United Kingdom',
  'Ireland',
  'France',
  'Germany',
  'Spain',
  'Italy',
  'Netherlands',
  'Sweden',
  'Norway',
  'Denmark',
  'Finland',
  'Poland',
  'Switzerland',
  'India',
  'China',
  'Japan',
  'South Korea',
  'Singapore',
  'Australia - Sydney',
  'Australia - Melbourne',
  'New Zealand',
  'Brazil',
  'Argentina',
  'Mexico',
  'South Africa',
  'Nigeria',
  'Kenya',
  'UAE',
  'Israel',
  'Russia - Moscow',
  'Turkey',
  'Thailand',
  'Indonesia',
  'Philippines',
  'Vietnam',
  'Malaysia',
];

export function OnboardingView() {
  const { completeOnboarding } = useApp();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    pronouns: '',
    bio: '',
    github: '',
    devpost: '',
    timeZone: '',
    skills: [],
    interests: [],
    role: '',
    intent: '',
    activityLevel: '',
    hackathonCount: null,
    lookingForTeam: true,
  });
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.timeZone) {
      completeOnboarding(profile);
    }
  };

  const updateProfile = (key: keyof UserProfile, value: string | string[]) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !profile.skills.includes(skillInput.trim())) {
      updateProfile('skills', [...profile.skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    updateProfile('skills', profile.skills.filter(s => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !profile.interests.includes(interestInput.trim())) {
      updateProfile('interests', [...profile.interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeInterest = (interest: string) => {
    updateProfile('interests', profile.interests.filter(i => i !== interest));
  };

  const handleInterestKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <div className="min-h-screen px-6 py-8 pb-24 relative">
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern-subtle opacity-30 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto relative z-10"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Set Up Your Profile</h1>
          <p className="text-muted-foreground">
            Help others find you as the perfect teammate
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identity Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Identity</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-muted-foreground">Name *</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={profile.name}
                  onChange={(e) => updateProfile('name', e.target.value)}
                  className="bg-background border-border focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pronouns" className="text-muted-foreground">Pronouns</Label>
                <Select
                  value={profile.pronouns}
                  onValueChange={(value) => updateProfile('pronouns', value)}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {pronounOptions.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-muted-foreground">Role *</Label>
              <Select
                value={profile.role}
                onValueChange={(value) => updateProfile('role', value)}
              >
                <SelectTrigger className="bg-background border-border">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {roleOptions.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-muted-foreground">One-liner Bio</Label>
              <Textarea
                id="bio"
                placeholder="Full-stack dev obsessed with Web3..."
                value={profile.bio}
                onChange={(e) => updateProfile('bio', e.target.value)}
                className="bg-background border-border focus:border-primary resize-none"
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intent" className="text-muted-foreground">Intent / What You're Looking For</Label>
              <Textarea
                id="intent"
                placeholder="Want to build something impactful and learn new skills..."
                value={profile.intent}
                onChange={(e) => updateProfile('intent', e.target.value)}
                className="bg-background border-border focus:border-primary resize-none"
                rows={2}
              />
            </div>
          </motion.section>

          {/* Links Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Links</h2>
            
            <div className="space-y-2">
              <Label htmlFor="github" className="text-muted-foreground">GitHub Username</Label>
              <Input
                id="github"
                placeholder="username"
                value={profile.github}
                onChange={(e) => updateProfile('github', e.target.value)}
                className="bg-background border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="devpost" className="text-muted-foreground">Devpost Username</Label>
              <Input
                id="devpost"
                placeholder="username"
                value={profile.devpost}
                onChange={(e) => updateProfile('devpost', e.target.value)}
                className="bg-background border-border focus:border-primary"
              />
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Skills</h2>

            <div className="flex gap-2">
              <Input
                placeholder="Add a skill (e.g., React)"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="bg-background border-border focus:border-primary flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addSkill}
                className="shrink-0 border-border hover:bg-muted hover:border-primary"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {profile.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-muted text-foreground border border-border"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </motion.section>

          {/* Interests Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Interests</h2>

            <div className="flex gap-2">
              <Input
                placeholder="Add an interest (e.g., AI, Web3)"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                onKeyDown={handleInterestKeyDown}
                className="bg-background border-border focus:border-primary flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addInterest}
                className="shrink-0 border-border hover:bg-muted hover:border-primary"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono bg-muted text-foreground border border-border"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="hover:text-destructive transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </motion.section>

          {/* Time Zone Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Location</h2>

            <Select
              value={profile.timeZone}
              onValueChange={(value) => updateProfile('timeZone', value)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select your location *" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {timeZones.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.section>

          {/* Activity Level Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Activity Level</h2>
            <p className="text-xs text-muted-foreground">How often do you participate in hackathons/collaborations?</p>

            <Select
              value={profile.activityLevel}
              onValueChange={(value) => updateProfile('activityLevel', value)}
            >
              <SelectTrigger className="bg-background border-border">
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="5+ times per week">5+ times per week - Very Active</SelectItem>
                <SelectItem value="3-4 times per week">3-4 times per week - Active</SelectItem>
                <SelectItem value="2-3 times per week">2-3 times per week - Moderate</SelectItem>
                <SelectItem value="1-2 times per week">1-2 times per week - Casual</SelectItem>
                <SelectItem value="Few times per month">Few times per month - Occasional</SelectItem>
              </SelectContent>
            </Select>
          </motion.section>

          {/* Hackathon Count Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Hackathon Experience</h2>
            <div className="space-y-2">
              <Label htmlFor="hackathonCount" className="text-muted-foreground">
                How many hackathons attended? (optional)
              </Label>
              <Input
                id="hackathonCount"
                type="number"
                min="0"
                placeholder="Enter number (leave empty for --)"
                value={profile.hackathonCount ?? ''}
                onChange={(e) => {
                  const value = e.target.value === '' ? null : parseInt(e.target.value);
                  updateProfile('hackathonCount', value);
                }}
                className="bg-background border-border focus:border-primary"
              />
            </div>
          </motion.section>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              type="submit"
              size="lg"
              disabled={!profile.name || !profile.timeZone || !profile.role}
              className="w-full h-14 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg gap-2 disabled:opacity-50 transition-all duration-200"
            >
              Save Profile
              <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
