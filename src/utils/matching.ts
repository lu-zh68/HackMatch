import { MockUser } from '@/data/mockUsers';
import { UserProfile } from '@/types/app';
import { getGeminiModel } from '@/lib/gemini';

export interface MatchScore {
  userId: string;
  score: number;
  breakdown: {
    interestMatch: number;
    skillComplementarity: number;
    roleCompatibility: number;
    intentAlignment: number;
  };
}

// Fallback matching algorithm (used if Gemini is not available)
function calculateFallbackMatchScore(
  userProfile: UserProfile,
  candidate: MockUser
): MatchScore {
  // Interest overlap (0-40 points)
  const commonInterests = candidate.interests.filter(i =>
    userProfile.interests.some(ui => ui.toLowerCase() === i.toLowerCase())
  );
  const interestMatch = Math.min((commonInterests.length / Math.max(candidate.interests.length, 1)) * 40, 40);

  // Skill complementarity (0-30 points)
  // Higher score if skills complement but don't fully overlap
  const commonSkills = candidate.skills.filter(s =>
    userProfile.skills.some(us => us.toLowerCase() === s.toLowerCase())
  );
  const uniqueSkills = candidate.skills.filter(s =>
    !userProfile.skills.some(us => us.toLowerCase() === s.toLowerCase())
  );
  const skillComplementarity = (uniqueSkills.length / Math.max(candidate.skills.length, 1)) * 20 +
    (commonSkills.length / Math.max(candidate.skills.length, 1)) * 10;

  // Role compatibility (0-20 points)
  // Different roles complement each other better
  const roleCompatibility = userProfile.role === candidate.role ? 10 : 20;

  // Intent alignment (0-10 points)
  // Simple keyword matching for intent
  const intentKeywords = ['win', 'learn', 'impact', 'build', 'help'];
  const userIntent = userProfile.intent.toLowerCase();
  const candidateIntent = candidate.intent.toLowerCase();
  const matchedKeywords = intentKeywords.filter(
    kw => userIntent.includes(kw) && candidateIntent.includes(kw)
  );
  const intentAlignment = (matchedKeywords.length / intentKeywords.length) * 10;

  return {
    userId: candidate.id,
    score: Math.round(interestMatch + skillComplementarity + roleCompatibility + intentAlignment),
    breakdown: {
      interestMatch: Math.round(interestMatch),
      skillComplementarity: Math.round(skillComplementarity),
      roleCompatibility: Math.round(roleCompatibility),
      intentAlignment: Math.round(intentAlignment),
    },
  };
}

// Gemini-powered matching score
async function calculateGeminiMatchScore(
  userProfile: UserProfile,
  candidate: MockUser
): Promise<MatchScore> {
  const model = getGeminiModel();

  if (!model) {
    return calculateFallbackMatchScore(userProfile, candidate);
  }

  try {
    const prompt = `You are a hackathon team matching expert. Analyze how well these two people would work together as teammates.

Person A (User):
- Role: ${userProfile.role}
- Skills: ${userProfile.skills.join(', ')}
- Interests: ${userProfile.interests.join(', ')}
- Intent: ${userProfile.intent}

Person B (Candidate):
- Role: ${candidate.role}
- Skills: ${candidate.skills.join(', ')}
- Interests: ${candidate.interests.join(', ')}
- Intent: ${candidate.intent}

Rate their compatibility on a scale of 0-100, where:
- 0-40: Interest Match (shared interests)
- 0-30: Skill Complementarity (how well skills complement each other)
- 0-20: Role Compatibility (different roles work better together)
- 0-10: Intent Alignment (similar goals and motivations)

Respond ONLY with a JSON object in this exact format:
{
  "interestMatch": <number 0-40>,
  "skillComplementarity": <number 0-30>,
  "roleCompatibility": <number 0-20>,
  "intentAlignment": <number 0-10>
}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const breakdown = JSON.parse(jsonMatch[0]);
    const score = Math.round(
      breakdown.interestMatch +
      breakdown.skillComplementarity +
      breakdown.roleCompatibility +
      breakdown.intentAlignment
    );

    return {
      userId: candidate.id,
      score,
      breakdown,
    };
  } catch (error) {
    console.error('Gemini matching error:', error);
    return calculateFallbackMatchScore(userProfile, candidate);
  }
}

// Main function to calculate match scores for all candidates
export async function calculateMatchScores(
  userProfile: UserProfile,
  candidates: MockUser[],
  useGemini = true
): Promise<MatchScore[]> {
  if (!useGemini) {
    return candidates.map(candidate => calculateFallbackMatchScore(userProfile, candidate));
  }

  const scores = await Promise.all(
    candidates.map(candidate => calculateGeminiMatchScore(userProfile, candidate))
  );

  return scores;
}

// Sort candidates by match score and group by shared interests
export function sortAndGroupCandidates(
  candidates: MockUser[],
  scores: MatchScore[],
  userInterests: string[]
): MockUser[] {
  const candidatesWithScores = candidates.map(candidate => {
    const matchScore = scores.find(s => s.userId === candidate.id);
    const sharedInterests = candidate.interests.filter(i =>
      userInterests.some(ui => ui.toLowerCase() === i.toLowerCase())
    );
    return {
      ...candidate,
      matchScore: matchScore?.score || 0,
      sharedInterests: sharedInterests.length,
    };
  });

  // Sort by: 1) shared interests (descending), 2) match score (descending)
  return candidatesWithScores
    .sort((a, b) => {
      if (b.sharedInterests !== a.sharedInterests) {
        return b.sharedInterests - a.sharedInterests;
      }
      return b.matchScore - a.matchScore;
    })
    .map(({ matchScore, sharedInterests, ...candidate }) => candidate as MockUser);
}
