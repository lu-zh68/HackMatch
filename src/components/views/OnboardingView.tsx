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

// Helper function to extract GitHub username from various formats
function extractGitHubUsername(input: string): string {
  const trimmed = input.trim();
  // Handle full URL: https://github.com/username or http://github.com/username
  if (trimmed.includes('github.com/')) {
    const parts = trimmed.split('github.com/');
    const username = parts[1]?.split('/')[0]?.split('?')[0] || '';
    return username;
  }
  // Return as-is if it's just a username
  return trimmed;
}

// Helper function to extract Devpost username from various formats
function extractDevpostUsername(input: string): string {
  const trimmed = input.trim();
  // Handle full URL: https://devpost.com/username
  if (trimmed.includes('devpost.com/')) {
    const parts = trimmed.split('devpost.com/');
    const username = parts[1]?.split('/')[0]?.split('?')[0] || '';
    return username;
  }
  // Return as-is if it's just a username
  return trimmed;
}

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

const skillOptions = [
  'Beginner',
  'React', 'Vue', 'Angular', 'Svelte', 'Next.js', 'TypeScript', 'JavaScript',
  'Python', 'Java', 'C++', 'Go', 'Rust', 'Swift', 'Kotlin',
  'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase',
  'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'CI/CD',
  'GraphQL', 'REST API', 'gRPC', 'WebSockets',
  'Solidity', 'ethers.js', 'Web3.js', 'Hardhat', 'Truffle',
  'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'Hugging Face',
  'Figma', 'Adobe XD', 'Sketch', 'Tailwind CSS', 'Material-UI', 'shadcn/ui',
  'Git', 'Linux', 'Bash', 'Nginx', 'GraphQL', 'Prisma', 'Supabase',
];

const interestOptions = [
  'Web3', 'DeFi', 'DAOs', 'NFTs', 'Blockchain',
  'AI Agents', 'LLMs', 'Machine Learning', 'Computer Vision', 'NLP',
  'RAG', 'Fine-tuning', 'Prompt Engineering',
  'Mobile Apps', 'iOS Development', 'Android Development',
  'Game Development', 'AR/VR', 'XR',
  'IoT', 'Robotics', 'Hardware',
  'Cybersecurity', 'Privacy', 'Encryption',
  'DevOps', 'Cloud Computing', 'Serverless',
  'Database Optimization', 'Distributed Systems', 'System Design',
  'Data Science', 'Data Visualization', 'Analytics',
  'UI/UX', 'Design Systems', 'Accessibility',
  'Open Source', 'Hackathons', 'Competitive Programming',
  'Social Impact', 'Sustainability', 'Education',
  'E-commerce', 'Fintech', 'Health Tech', 'Music/Art',
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
    occupation: '',
    studentLevel: '',
    schoolName: '',
    graduationMonth: '',
    graduationYear: '',
    birthMonth: '',
    birthYear: '',
  });
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
  const [showInterestsDropdown, setShowInterestsDropdown] = useState(false);
  const [skillSearchQuery, setSkillSearchQuery] = useState('');
  const [interestSearchQuery, setInterestSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile.name && profile.devpost && profile.timeZone && profile.occupation && profile.schoolName && profile.graduationMonth && profile.graduationYear) {
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

  const toggleSkill = (skill: string) => {
    if (profile.skills.includes(skill)) {
      updateProfile('skills', profile.skills.filter(s => s !== skill));
    } else {
      updateProfile('skills', [...profile.skills, skill]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (profile.interests.includes(interest)) {
      updateProfile('interests', profile.interests.filter(i => i !== interest));
    } else {
      updateProfile('interests', [...profile.interests, interest]);
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

          {/* Education Section */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flat-card rounded-xl p-5 space-y-4"
          >
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Education</h2>

            {/* Occupation */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Occupation *</Label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => updateProfile('occupation', 'Student')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    profile.occupation === 'Student'
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => updateProfile('occupation', 'Professional / Post Grad')}
                  className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                    profile.occupation === 'Professional / Post Grad'
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  Professional / Post Grad
                </button>
              </div>
            </div>

            {/* Student Level - only show if Student */}
            {profile.occupation === 'Student' && (
              <div className="space-y-2">
                <Label className="text-muted-foreground">Current student level *</Label>
                <div className="flex gap-2">
                  {['College', 'High School', 'Middle School'].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateProfile('studentLevel', level)}
                      className={`flex-1 px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                        profile.studentLevel === level
                          ? 'border-primary bg-primary/10 text-primary font-medium'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* School Name */}
            <div className="space-y-2">
              <Label htmlFor="schoolName" className="text-muted-foreground">School name *</Label>
              <Input
                id="schoolName"
                placeholder="University of California - Los Angeles (UCLA)"
                value={profile.schoolName}
                onChange={(e) => updateProfile('schoolName', e.target.value)}
                className="bg-background border-border focus:border-primary"
                required
              />
            </div>

            {/* Graduation */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="graduationMonth" className="text-muted-foreground">Graduation month *</Label>
                <Select
                  value={profile.graduationMonth}
                  onValueChange={(value) => updateProfile('graduationMonth', value)}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="graduationYear" className="text-muted-foreground">Year *</Label>
                <Select
                  value={profile.graduationYear}
                  onValueChange={(value) => updateProfile('graduationYear', value)}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {Array.from({ length: 10 }, (_, i) => 2024 + i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Birth Month - Optional */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Birth month (optional)</Label>
              <p className="text-xs text-muted-foreground">Most hackathons have age requirements</p>
              <div className="grid grid-cols-2 gap-4">
                <Select
                  value={profile.birthMonth || ''}
                  onValueChange={(value) => updateProfile('birthMonth', value)}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={profile.birthYear || ''}
                  onValueChange={(value) => updateProfile('birthYear', value)}
                >
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {Array.from({ length: 50 }, (_, i) => 2010 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <Label htmlFor="devpost" className="text-muted-foreground">Devpost Username *</Label>
              <Input
                id="devpost"
                placeholder="username or paste Devpost URL"
                value={profile.devpost}
                onChange={(e) => updateProfile('devpost', e.target.value)}
                onBlur={(e) => {
                  const extracted = extractDevpostUsername(e.target.value);
                  if (extracted !== e.target.value) {
                    updateProfile('devpost', extracted);
                  }
                }}
                className="bg-background border-border focus:border-primary"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github" className="text-muted-foreground">GitHub Username</Label>
              <Input
                id="github"
                placeholder="username or paste GitHub URL"
                value={profile.github}
                onChange={(e) => updateProfile('github', e.target.value)}
                onBlur={(e) => {
                  const extracted = extractGitHubUsername(e.target.value);
                  if (extracted !== e.target.value) {
                    updateProfile('github', extracted);
                  }
                }}
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

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                className="w-full justify-between bg-background border-border hover:bg-muted"
              >
                <span className="text-muted-foreground">
                  {profile.skills.length > 0 ? `${profile.skills.length} skills selected` : 'Select skills'}
                </span>
                <Plus className={`w-4 h-4 transition-transform ${showSkillsDropdown ? 'rotate-45' : ''}`} />
              </Button>

              {showSkillsDropdown && (
                <div className="border border-border rounded-lg bg-background">
                  <div className="p-2 border-b border-border">
                    <Input
                      type="text"
                      placeholder="Search skills..."
                      value={skillSearchQuery}
                      onChange={(e) => setSkillSearchQuery(e.target.value)}
                      className="bg-background border-border text-sm"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {skillOptions
                        .filter(skill => skill.toLowerCase().includes(skillSearchQuery.toLowerCase()))
                        .map((skill) => (
                        <label
                          key={skill}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all ${
                            profile.skills.includes(skill)
                              ? 'bg-primary/10 border border-primary/20 text-primary'
                              : 'hover:bg-muted border border-transparent'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={profile.skills.includes(skill)}
                            onChange={() => toggleSkill(skill)}
                            className="w-4 h-4 rounded border-border"
                          />
                          <span className="text-sm">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
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

            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowInterestsDropdown(!showInterestsDropdown)}
                className="w-full justify-between bg-background border-border hover:bg-muted"
              >
                <span className="text-muted-foreground">
                  {profile.interests.length > 0 ? `${profile.interests.length} interests selected` : 'Select interests'}
                </span>
                <Plus className={`w-4 h-4 transition-transform ${showInterestsDropdown ? 'rotate-45' : ''}`} />
              </Button>

              {showInterestsDropdown && (
                <div className="border border-border rounded-lg bg-background">
                  <div className="p-2 border-b border-border">
                    <Input
                      type="text"
                      placeholder="Search interests..."
                      value={interestSearchQuery}
                      onChange={(e) => setInterestSearchQuery(e.target.value)}
                      className="bg-background border-border text-sm"
                    />
                  </div>
                  <div className="max-h-60 overflow-y-auto p-2">
                    <div className="grid grid-cols-2 gap-2">
                      {interestOptions
                        .filter(interest => interest.toLowerCase().includes(interestSearchQuery.toLowerCase()))
                        .map((interest) => (
                        <label
                          key={interest}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all ${
                            profile.interests.includes(interest)
                              ? 'bg-primary/10 border border-primary/20 text-primary'
                              : 'hover:bg-muted border border-transparent'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={profile.interests.includes(interest)}
                          onChange={() => toggleInterest(interest)}
                          className="w-4 h-4 rounded border-border"
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                    </div>
                  </div>
                </div>
              )}
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
                <SelectItem value="Multiple times per month — Very Active">Multiple times per month — Very Active</SelectItem>
                <SelectItem value="About once per month — Active">About once per month — Active</SelectItem>
                <SelectItem value="Every few months — Moderate">Every few months — Moderate</SelectItem>
                <SelectItem value="A few times per year — Casual">A few times per year — Casual</SelectItem>
                <SelectItem value="Rarely / just starting — New">Rarely / just starting — New</SelectItem>
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
