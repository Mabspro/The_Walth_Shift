/**
 * Challenge Logic for The Wealth Shift
 * 
 * This file contains the logic for unlocking challenges based on workbook completion.
 */

export interface Challenge {
  id: string;
  title: string;
  description: string;
  requiredWorkbookId: string;
  unlocked: boolean;
  completed: boolean;
  icon: string;
  reward: string;
}

// Available challenges
export const availableChallenges: Challenge[] = [
  {
    id: 'challenge1',
    title: 'Abundance Mindset Challenge',
    description: 'Practice daily gratitude and abundance affirmations for 7 days straight.',
    requiredWorkbookId: 'workbook1',
    unlocked: false,
    completed: false,
    icon: '🌱',
    reward: 'Abundance Mindset Badge'
  },
  {
    id: 'challenge2',
    title: 'Debt Freedom Challenge',
    description: 'Create a debt payoff plan and make your first extra payment.',
    requiredWorkbookId: 'workbook2',
    unlocked: false,
    completed: false,
    icon: '💰',
    reward: 'Debt Freedom Badge'
  },
  {
    id: 'challenge3',
    title: 'Asset Building Challenge',
    description: 'Identify and acquire your first (or next) wealth-building asset.',
    requiredWorkbookId: 'workbook3',
    unlocked: false,
    completed: false,
    icon: '📈',
    reward: 'Asset Builder Badge'
  },
  {
    id: 'challenge4',
    title: 'Investing Starter Challenge',
    description: 'Open an investment account and make your first investment.',
    requiredWorkbookId: 'workbook4',
    unlocked: false,
    completed: false,
    icon: '📊',
    reward: 'Investor Badge'
  },
  {
    id: 'challenge5',
    title: 'Income Booster Challenge',
    description: 'Launch your first side hustle or negotiate a raise.',
    requiredWorkbookId: 'workbook5',
    unlocked: false,
    completed: false,
    icon: '💼',
    reward: 'Income Booster Badge'
  },
  {
    id: 'challenge6',
    title: 'Legacy Builder Challenge',
    description: 'Create a will or trust and set up an automatic investment plan.',
    requiredWorkbookId: 'workbook6',
    unlocked: false,
    completed: false,
    icon: '🌟',
    reward: 'Legacy Builder Badge'
  }
];

/**
 * Check if a workbook has been completed
 */
export const isWorkbookCompleted = (workbookId: string): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(`workbook_completed_${workbookId}`) === 'true';
  }
  return false;
};

/**
 * Get all challenges with their unlock status
 */
export const getChallenges = (): Challenge[] => {
  const challenges = [...availableChallenges];
  
  if (typeof window !== 'undefined') {
    // Update unlock status based on workbook completion
    challenges.forEach(challenge => {
      challenge.unlocked = isWorkbookCompleted(challenge.requiredWorkbookId);
      
      // Check if challenge is completed
      const completed = localStorage.getItem(`challenge_completed_${challenge.id}`);
      if (completed === 'true') {
        challenge.completed = true;
      }
    });
  }
  
  return challenges;
};

/**
 * Get a specific challenge by ID
 */
export const getChallengeById = (challengeId: string): Challenge | undefined => {
  const challenges = getChallenges();
  return challenges.find(challenge => challenge.id === challengeId);
};

/**
 * Mark a challenge as completed
 */
export const completeChallenge = (challengeId: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(`challenge_completed_${challengeId}`, 'true');
  }
};

/**
 * Get all earned badges
 */
export const getEarnedBadges = (): string[] => {
  const challenges = getChallenges();
  return challenges
    .filter(challenge => challenge.completed)
    .map(challenge => challenge.reward);
};

/**
 * Check if all challenges are completed
 */
export const areAllChallengesCompleted = (): boolean => {
  const challenges = getChallenges();
  return challenges.every(challenge => challenge.completed);
};
