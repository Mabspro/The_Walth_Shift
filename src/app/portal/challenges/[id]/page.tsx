'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getChallengeById, completeChallenge, Challenge } from '@/utils/challenges';

export default function ChallengeDetail() {
  const params = useParams();
  const router = useRouter();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [steps, setSteps] = useState<{ text: string; completed: boolean }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  
  useEffect(() => {
    // Find the challenge by ID
    const id = params.id as string;
    const foundChallenge = getChallengeById(id);
    
    if (foundChallenge) {
      setChallenge(foundChallenge);
      setIsCompleted(foundChallenge.completed);
      
      // Set up challenge steps based on the challenge type
      const challengeSteps = getChallengeSteps(foundChallenge.id);
      
      // Check if steps are already saved in localStorage
      if (typeof window !== 'undefined') {
        const savedSteps = localStorage.getItem(`challenge_steps_${id}`);
        if (savedSteps) {
          setSteps(JSON.parse(savedSteps));
        } else {
          setSteps(challengeSteps);
        }
      } else {
        setSteps(challengeSteps);
      }
    } else {
      // Challenge not found, redirect to challenges list
      router.push('/portal/challenges');
    }
  }, [params.id, router]);
  
  const getChallengeSteps = (challengeId: string) => {
    // Define steps for each challenge
    const stepsMap: Record<string, { text: string; completed: boolean }[]> = {
      'challenge1': [
        { text: 'Write down 3 things you are grateful for each morning', completed: false },
        { text: 'Recite your abundance affirmations twice daily', completed: false },
        { text: 'Journal about one abundance win each evening', completed: false },
        { text: 'Notice and redirect scarcity thoughts', completed: false },
        { text: 'Share your abundance practice with someone else', completed: false }
      ],
      'challenge2': [
        { text: 'List all your debts with interest rates and balances', completed: false },
        { text: 'Choose a debt payoff strategy (avalanche or snowball)', completed: false },
        { text: 'Create a monthly payment plan', completed: false },
        { text: 'Find one expense to reduce and redirect to debt', completed: false },
        { text: 'Make your first extra payment', completed: false }
      ],
      'challenge3': [
        { text: 'Research 3 potential wealth-building assets', completed: false },
        { text: 'Calculate the potential return on each asset', completed: false },
        { text: 'Create a savings plan for your chosen asset', completed: false },
        { text: 'Take the first step toward acquiring the asset', completed: false },
        { text: 'Document your asset acquisition plan', completed: false }
      ],
      'challenge4': [
        { text: 'Research 3 investment platforms or options', completed: false },
        { text: 'Open an investment account', completed: false },
        { text: 'Set up automatic transfers to your investment account', completed: false },
        { text: 'Make your first investment', completed: false },
        { text: 'Create a regular investment schedule', completed: false }
      ],
      'challenge5': [
        { text: 'Brainstorm 5 potential income streams', completed: false },
        { text: 'Research the viability of each idea', completed: false },
        { text: 'Create an action plan for your chosen income stream', completed: false },
        { text: 'Take the first step to launch your side hustle', completed: false },
        { text: 'Make your first dollar from your new income stream', completed: false }
      ],
      'challenge6': [
        { text: 'Research estate planning options', completed: false },
        { text: 'Create a basic will or trust', completed: false },
        { text: 'Set up an automatic investment plan for retirement', completed: false },
        { text: 'Document your legacy goals and vision', completed: false },
        { text: 'Share your legacy plan with a trusted person', completed: false }
      ]
    };
    
    return stepsMap[challengeId] || [];
  };
  
  const toggleStep = (index: number) => {
    if (isCompleted) return; // Don't allow changes if challenge is already completed
    
    const newSteps = [...steps];
    newSteps[index].completed = !newSteps[index].completed;
    setSteps(newSteps);
    
    // Save to localStorage
    if (typeof window !== 'undefined' && challenge) {
      localStorage.setItem(`challenge_steps_${challenge.id}`, JSON.stringify(newSteps));
      
      // Check if all steps are completed
      const allCompleted = newSteps.every(step => step.completed);
      if (allCompleted && !isCompleted) {
        completeChallenge(challenge.id);
        setIsCompleted(true);
      }
    }
  };
  
  const calculateProgress = () => {
    const completedSteps = steps.filter(step => step.completed).length;
    return Math.round((completedSteps / steps.length) * 100);
  };
  
  if (!challenge) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-xl">Loading challenge...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <Link 
          href="/portal/challenges" 
          className="text-accent hover:text-highlight flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
          Back to Challenges
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg p-8 shadow-lg border border-accent/20">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">{challenge.icon}</span>
              <h1 className="text-3xl font-bold">{challenge.title}</h1>
            </div>
            
            <p className="text-lg mb-6">{challenge.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Challenge Steps</h2>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-start p-4 rounded-lg border ${
                      step.completed 
                        ? 'bg-sage/10 border-sage/20' 
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={`step-${index}`}
                      checked={step.completed}
                      onChange={() => toggleStep(index)}
                      disabled={isCompleted}
                      className="w-5 h-5 text-accent focus:ring-accent rounded mt-1"
                    />
                    <label 
                      htmlFor={`step-${index}`} 
                      className={`ml-3 ${step.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}
                    >
                      {step.text}
                    </label>
                    {step.completed && (
                      <span className="ml-auto text-sage">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Tips for Success</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Break down each step into smaller actions if needed</li>
                <li>Set aside dedicated time each day to work on your challenge</li>
                <li>Track your progress and celebrate small wins</li>
                <li>Don&apos;t be afraid to adjust your approach as you learn</li>
                <li>Share your journey with others for accountability</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg p-6 shadow-md border border-accent/20 sticky top-6">
            <h3 className="text-xl font-bold mb-4">Your Progress</h3>
            
            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">Challenge Progress</span>
                <span className="text-accent font-semibold">{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-accent h-2.5 rounded-full transition-all duration-500" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
            </div>
            
            {/* Reward */}
            <div className="mb-6">
              <h4 className="font-bold mb-2">Reward</h4>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-2xl mr-3">
                  {challenge.icon}
                </div>
                <span className="font-semibold">{challenge.reward}</span>
              </div>
            </div>
            
            {/* Completion status */}
            {isCompleted ? (
              <div className="p-4 bg-sage/10 rounded-lg border border-sage/20">
                <p className="text-sage font-semibold flex items-center">
                  <span className="text-xl mr-2">🎉</span>
                  Congratulations! You&apos;ve completed this challenge.
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Your badge has been added to your collection.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-600">
                  Complete all steps to earn your badge.
                </p>
              </div>
            )}
            
            {/* Related workbook */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-bold mb-2">Related Workbook</h4>
              <Link 
                href={`/portal/workbooks/${challenge.requiredWorkbookId}`}
                className="text-accent hover:text-highlight flex items-center"
              >
                View the workbook for this challenge
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
