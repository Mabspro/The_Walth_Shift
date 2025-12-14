/**
 * Assessment Logic for The Wealth Shift
 * 
 * This file contains the logic for scoring the assessment and determining the user's
 * Wealth Shift Level, Mindset Type, and recommended workbooks.
 */

// Types for assessment data
export interface AssessmentQuestion {
  id: string;
  text: string;
  options: string[];
}

export interface AssessmentAnswer {
  questionId: string;
  answer: string;
  score: number;
}

export interface AssessmentResult {
  totalScore: number;
  wealthShiftLevel: WealthShiftLevel;
  mindsetType: MindsetType;
  recommendedWorkbooks: Workbook[];
}

export enum WealthShiftLevel {
  SeedPlanter = 'Seed Planter',
  Groundbreaker = 'Groundbreaker',
  Pathwalker = 'Pathwalker',
  Oracle = 'Oracle'
}

export enum MindsetType {
  Fixed = 'Fixed Mindset',
  Neutral = 'Neutral Mindset',
  Growth = 'Growth Mindset'
}

export enum WorkbookType {
  MindsetAwareness = 'Workbook 1: Mindset & Awareness',
  DebtClarity = 'Workbook 2: Debt & Money Clarity',
  AssetsNetWorth = 'Workbook 3: Assets & Net Worth',
  Investing = 'Workbook 4: Investing Foundations',
  IncomeSideHustles = 'Workbook 5: Income & Side Hustles',
  Legacy = 'Workbook 6: Financial Independence & Legacy'
}

export interface Workbook {
  id: string;
  type: WorkbookType;
  title: string;
  description: string;
  recommended: boolean;
  icon: string;
}

// Assessment questions
export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'q1',
    text: 'How do you feel when the topic of money comes up in your relationships?',
    options: [
      'I avoid it completely — it brings me anxiety',
      'I get uncomfortable, but I try to stay open',
      'I can talk about it when I trust the other person',
      'I talk openly and feel safe discussing money'
    ]
  },
  {
    id: 'q2',
    text: 'Do you feel worthy of financial freedom and peace?',
    options: [
      'Not really — I don\'t see that for me',
      'I want to believe that, but I struggle',
      'I believe it\'s possible with effort',
      'I deeply believe I deserve wealth and freedom'
    ]
  },
  {
    id: 'q3',
    text: 'When you make a financial mistake, how do you usually respond?',
    options: [
      'I feel ashamed and judge myself',
      'I try to ignore it or avoid thinking about it',
      'I reflect and try to learn from it',
      'I see it as a learning opportunity and move forward stronger'
    ]
  },
  {
    id: 'q4',
    text: 'Do you believe your financial situation can change no matter where you\'re starting?',
    options: [
      'Honestly, I doubt it',
      'I want to believe, but I\'m not sure',
      'I believe it\'s possible with time',
      'Absolutely — I know I can shift my future'
    ]
  },
  {
    id: 'q5',
    text: 'Do you know how much debt you currently owe?',
    options: [
      'I avoid looking — it stresses me out',
      'I have a rough idea',
      'I\'ve tracked it before, but not recently',
      'I know the exact total and check in often'
    ]
  },
  {
    id: 'q6',
    text: 'What is your current relationship with debt?',
    options: [
      'It controls me — I feel stuck',
      'I\'m trying to face it, but it\'s messy',
      'I have a plan, though not perfect',
      'I have a clear strategy and I\'m following it'
    ]
  },
  {
    id: 'q7',
    text: 'When you get paid, what usually happens to your money?',
    options: [
      'It disappears — I don\'t track or plan',
      'I try to save, but often fall short',
      'I save or cover my needs with some structure',
      'I assign every dollar intentionally (budget/saving/investing)'
    ]
  },
  {
    id: 'q8',
    text: 'Do you currently own any wealth-building assets?',
    options: [
      'No, and I\'m not sure where to start',
      'I think I own one or two (like a car or savings)',
      'I own some (stocks, property, business)',
      'I own multiple assets and I\'m actively growing them'
    ]
  },
  {
    id: 'q9',
    text: 'Have you done anything in the past 6 months to grow your income?',
    options: [
      'No, I\'ve just been surviving',
      'I\'ve thought about it but haven\'t taken action',
      'I\'ve made one or two small moves',
      'I\'ve taken clear steps to increase what I earn'
    ]
  },
  {
    id: 'q10',
    text: 'How confident do you feel about investing?',
    options: [
      'I don\'t understand it at all — I\'m intimidated',
      'I want to invest but don\'t know how',
      'I\'ve started investing and I\'m learning',
      'I invest consistently and feel confident'
    ]
  },
  {
    id: 'q11',
    text: 'Do you know how much you\'ll need to retire comfortably?',
    options: [
      'I\'ve never thought about it',
      'I\'ve thought about it but don\'t know the number',
      'I have a general idea',
      'I\'ve calculated it and I\'m working toward it'
    ]
  },
  {
    id: 'q12',
    text: 'Are you interested in building a business, side hustle, or digital income stream?',
    options: [
      'Not at all — I just want stability',
      'I\'m curious, but haven\'t explored it',
      'I\'ve started brainstorming or trying small things',
      'Yes — I\'m building or ready to launch something'
    ]
  },
  {
    id: 'q13',
    text: 'Do you believe you can earn more money without working more hours?',
    options: [
      'No — more money means more work',
      'I\'m not sure, but I hope so',
      'I believe it\'s possible but need to learn how',
      'Yes — I believe in creating income beyond time'
    ]
  }
];

// Available workbooks
export const availableWorkbooks: Workbook[] = [
  {
    id: 'workbook1',
    type: WorkbookType.MindsetAwareness,
    title: 'Mindset & Awareness',
    description: 'Build a solid emotional foundation for your wealth journey.',
    recommended: true, // Always recommended for all users
    icon: '🧠'
  },
  {
    id: 'workbook2',
    type: WorkbookType.DebtClarity,
    title: 'Debt & Money Clarity',
    description: 'Get clear on your current financial situation and create a plan to move forward.',
    recommended: false,
    icon: '💰'
  },
  {
    id: 'workbook3',
    type: WorkbookType.AssetsNetWorth,
    title: 'Assets & Net Worth',
    description: 'Learn how to build and grow your assets to increase your net worth.',
    recommended: false,
    icon: '📈'
  },
  {
    id: 'workbook4',
    type: WorkbookType.Investing,
    title: 'Investing Foundations',
    description: 'Understand the basics of investing and how to get started.',
    recommended: false,
    icon: '📊'
  },
  {
    id: 'workbook5',
    type: WorkbookType.IncomeSideHustles,
    title: 'Income & Side Hustles',
    description: 'Explore ways to increase your income and create additional revenue streams.',
    recommended: false,
    icon: '💼'
  },
  {
    id: 'workbook6',
    type: WorkbookType.Legacy,
    title: 'Financial Independence & Legacy',
    description: 'Plan for long-term financial independence and create a lasting legacy.',
    recommended: false,
    icon: '🌟'
  }
];

/**
 * Calculate the score for a single answer
 * A = 1, B = 2, C = 3, D = 4
 */
export const calculateAnswerScore = (answerIndex: number): number => {
  return answerIndex + 1; // 0-based index to 1-4 score
};

/**
 * Determine the Wealth Shift Level based on total score
 * 0-18: Seed Planter
 * 19-32: Groundbreaker
 * 33-44: Pathwalker
 * 45-52: Oracle
 */
export const determineWealthShiftLevel = (totalScore: number): WealthShiftLevel => {
  if (totalScore <= 18) {
    return WealthShiftLevel.SeedPlanter;
  } else if (totalScore <= 32) {
    return WealthShiftLevel.Groundbreaker;
  } else if (totalScore <= 44) {
    return WealthShiftLevel.Pathwalker;
  } else {
    return WealthShiftLevel.Oracle;
  }
};

/**
 * Determine the Mindset Type based on the sum of scores for questions 1-4
 * 4-8: Fixed Mindset
 * 9-12: Neutral Mindset
 * 13-16: Growth Mindset
 */
export const determineMindsetType = (answers: AssessmentAnswer[]): MindsetType => {
  const mindsetQuestions = ['q1', 'q2', 'q3', 'q4'];
  const mindsetScore = answers
    .filter(answer => mindsetQuestions.includes(answer.questionId))
    .reduce((sum, answer) => sum + answer.score, 0);

  if (mindsetScore <= 8) {
    return MindsetType.Fixed;
  } else if (mindsetScore <= 12) {
    return MindsetType.Neutral;
  } else {
    return MindsetType.Growth;
  }
};

/**
 * Determine recommended workbooks based on assessment answers
 * Workbook 1: Always recommended
 * Workbook 2: Recommended if Q5 or Q6 = score 1 or 2 (A or B)
 * Workbook 3: Recommended if Q7 or Q8 = score 1 or 2
 * Workbook 4: Recommended if Q9 or Q10 = score 1 or 2
 * Workbook 5: ONLY if Q12 and Q13 = score 3 or 4 (C or D)
 * Workbook 6: Recommended if Q13 = score 3 or 4 (C or D)
 */
export const determineRecommendedWorkbooks = (answers: AssessmentAnswer[]): Workbook[] => {
  const answerMap = new Map<string, number>();
  answers.forEach(answer => {
    answerMap.set(answer.questionId, answer.score);
  });

  const recommendedWorkbooks = [...availableWorkbooks];

  // Workbook 1 is always recommended
  recommendedWorkbooks[0].recommended = true;

  // Workbook 2: Debt & Clarity
  recommendedWorkbooks[1].recommended = 
    (answerMap.get('q5') || 0) <= 2 || (answerMap.get('q6') || 0) <= 2;

  // Workbook 3: Assets & Net Worth
  recommendedWorkbooks[2].recommended = 
    (answerMap.get('q7') || 0) <= 2 || (answerMap.get('q8') || 0) <= 2;

  // Workbook 4: Investing
  recommendedWorkbooks[3].recommended = 
    (answerMap.get('q9') || 0) <= 2 || (answerMap.get('q10') || 0) <= 2;

  // Workbook 5: Income & Side Hustles - ONLY if Q12 and Q13 = score 3 or 4
  recommendedWorkbooks[4].recommended = 
    (answerMap.get('q12') || 0) >= 3 && (answerMap.get('q13') || 0) >= 3;

  // Workbook 6: Legacy
  recommendedWorkbooks[5].recommended = 
    (answerMap.get('q13') || 0) >= 3;

  return recommendedWorkbooks;
};

/**
 * Get the personalized message based on the Wealth Shift Level
 */
export const getPersonalizedMessage = (wealthShiftLevel: WealthShiftLevel): string => {
  switch (wealthShiftLevel) {
    case WealthShiftLevel.SeedPlanter:
      return `You're a Seed Planter. You're just beginning to explore your relationship with money — and that takes courage. Maybe you've felt confused, overwhelmed, or like you've been left out of the wealth-building conversation. That ends now. You don't have to figure this out alone. This is the first step to rewriting your money story — with clarity, power, and self-love.`;
    
    case WealthShiftLevel.Groundbreaker:
      return `You're a Groundbreaker. You've started doing the work — learning, reflecting, and becoming more aware. You may not feel "ready," but you're open. And that openness is everything. Now is the time to build real structure around your financial life so you can move from surviving to thriving.`;
    
    case WealthShiftLevel.Pathwalker:
      return `You're a Pathwalker. You've done some real work — and it shows. You've made progress with your mindset, your habits, and your financial clarity. But there's still room to grow, especially in building wealth and creating your bigger vision. You're no longer in survival mode. You're building. Let's keep that momentum strong.`;
    
    case WealthShiftLevel.Oracle:
      return `You're an Oracle. You've done the inner work. You've taken real action. You've moved past excuses, and now you're playing the long game. You're not just building wealth — you're building legacy. But even the most powerful women need space to reflect, refine, and elevate.`;
    
    default:
      return `You're on your wealth journey. Let's take the next step together.`;
  }
};

/**
 * Get the mindset message based on the Mindset Type
 */
export const getMindsetMessage = (mindsetType: MindsetType): string => {
  switch (mindsetType) {
    case MindsetType.Fixed:
      return `You may still carry limiting beliefs about money and yourself. That's okay. We start here.`;
    
    case MindsetType.Neutral:
      return `You're becoming aware of your mindset, but there's still room to shift deeper.`;
    
    case MindsetType.Growth:
      return `You're grounded in belief and openness. Let's put that energy into action.`;
    
    default:
      return `Your mindset is a powerful tool on your wealth journey.`;
  }
};

/**
 * Calculate the assessment result based on the answers
 */
export const calculateAssessmentResult = (answers: AssessmentAnswer[]): AssessmentResult => {
  const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
  const wealthShiftLevel = determineWealthShiftLevel(totalScore);
  const mindsetType = determineMindsetType(answers);
  const recommendedWorkbooks = determineRecommendedWorkbooks(answers);

  return {
    totalScore,
    wealthShiftLevel,
    mindsetType,
    recommendedWorkbooks
  };
};

/**
 * Save assessment result to localStorage
 */
export const saveAssessmentResult = (result: AssessmentResult): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('wealthShiftAssessment', JSON.stringify(result));
  }
};

/**
 * Get assessment result from localStorage
 */
export const getAssessmentResult = (): AssessmentResult | null => {
  if (typeof window !== 'undefined') {
    const savedResult = localStorage.getItem('wealthShiftAssessment');
    if (savedResult) {
      return JSON.parse(savedResult);
    }
  }
  return null;
};

/**
 * Check if assessment has been completed
 */
export const hasCompletedAssessment = (): boolean => {
  return getAssessmentResult() !== null;
};

/**
 * Save assessment result to Supabase database
 * This function saves both to localStorage (for immediate access) and Supabase (for persistence)
 */
export const saveAssessmentToDatabase = async (
  email: string,
  fullName: string,
  phone: string | undefined,
  answers: AssessmentAnswer[],
  result: AssessmentResult
): Promise<{ success: boolean; error?: string }> => {
  // First, save to localStorage for immediate access
  saveAssessmentResult(result);
  localStorage.setItem('wealthShiftEmail', email);
  localStorage.setItem('wealthShiftName', fullName);

  // Then try to save to Supabase
  try {
    const { createClient } = await import('@/utils/supabase/client');
    const supabase = createClient();

    // Get client IP and user agent
    const ipAddress = typeof window !== 'undefined' ? await getClientIP() : null;
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : null;

    // Prepare responses data
    const responsesData = answers.map(answer => ({
      questionId: answer.questionId,
      answer: answer.answer,
      score: answer.score
    }));

    // Insert assessment response
    const { error: assessmentError } = await supabase
      .from('assessment_responses')
      .insert({
        email,
        full_name: fullName,
        phone: phone || null,
        wealth_shift_level: result.wealthShiftLevel,
        mindset_type: result.mindsetType,
        total_score: result.totalScore,
        responses: responsesData,
        ip_address: ipAddress,
        user_agent: userAgent
      });

    if (assessmentError) {
      console.error('Error saving assessment to database:', assessmentError);
      // Don't fail the whole process if database save fails
      return { success: false, error: assessmentError.message };
    }

    // Also save to email_subscribers (upsert to avoid duplicates)
    const { error: subscriberError } = await supabase
      .from('email_subscribers')
      .upsert({
        email,
        full_name: fullName,
        source: 'assessment',
        status: 'active'
      }, {
        onConflict: 'email'
      });

    if (subscriberError) {
      console.error('Error saving subscriber:', subscriberError);
      // This is non-critical, so we continue
    }

    return { success: true };
  } catch (error) {
    console.error('Error in saveAssessmentToDatabase:', error);
    // Return success anyway since localStorage save worked
    return { success: true, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

/**
 * Get client IP address (simplified version)
 * In production, you might want to use a service or API route
 */
async function getClientIP(): Promise<string | null> {
  try {
    // Try to get IP from a service (optional)
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || null;
  } catch {
    // If that fails, return null
    return null;
  }
}