'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getChallenges, Challenge, getEarnedBadges } from '@/utils/challenges';

export default function Challenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  
  useEffect(() => {
    // Get challenges with their unlock status
    const allChallenges = getChallenges();
    setChallenges(allChallenges);
    
    // Get earned badges
    const badges = getEarnedBadges();
    setEarnedBadges(badges);
  }, []);
  
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">Challenges</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Complete challenges to earn badges and deepen your wealth journey.
        </p>
      </div>
      
      {/* Badges Section */}
      <div className="bg-white rounded-lg p-8 mb-12 border border-accent/20 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Your Badges</h2>
        
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {earnedBadges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-3xl mb-2">
                  {challenges.find(c => c.reward === badge)?.icon || '🏆'}
                </div>
                <span className="text-center font-semibold">{badge}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              Complete challenges to earn badges and track your progress.
            </p>
            <p className="mt-2 text-accent font-semibold">
              Start by completing a workbook to unlock your first challenge!
            </p>
          </div>
        )}
      </div>
      
      {/* Available Challenges */}
      <h2 className="text-2xl font-bold mb-6">Available Challenges</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {challenges.map((challenge) => (
          <div 
            key={challenge.id} 
            className={`bg-white rounded-lg overflow-hidden border shadow-md transition-all duration-300 ${
              challenge.unlocked 
                ? 'border-accent/30 hover:shadow-lg hover:-translate-y-1' 
                : 'border-gray-200 opacity-75'
            }`}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{challenge.icon}</span>
                <h3 className="text-xl font-bold">{challenge.title}</h3>
                {challenge.completed && (
                  <span className="ml-auto bg-sage/20 text-sage px-3 py-1 rounded-full text-sm font-semibold">
                    Completed
                  </span>
                )}
              </div>
              
              <p className="mb-6 text-gray-600">{challenge.description}</p>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Reward:</span>
                  <span className="ml-2 font-semibold text-accent">{challenge.reward}</span>
                </div>
                
                {challenge.unlocked ? (
                  <Link 
                    href={`/portal/challenges/${challenge.id}`}
                    className="px-4 py-2 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300"
                  >
                    {challenge.completed ? 'View Details' : 'Start Challenge'}
                  </Link>
                ) : (
                  <div className="flex items-center">
                    <span className="text-sm text-gray-500 mr-2">Locked</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              {!challenge.unlocked && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    Complete the <Link href={`/portal/workbooks/${challenge.requiredWorkbookId}`} className="text-accent hover:text-highlight">required workbook</Link> to unlock this challenge.
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* How Challenges Work */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16 border border-accent/20">
        <h2 className="text-2xl font-bold mb-4">How Challenges Work</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Complete a workbook</strong> - Each challenge is unlocked by completing its corresponding workbook.
          </li>
          <li>
            <strong>Take action in the real world</strong> - Challenges require you to apply what you&apos;ve learned to your real financial life.
          </li>
          <li>
            <strong>Track your progress</strong> - Mark your progress as you complete each step of the challenge.
          </li>
          <li>
            <strong>Earn your badge</strong> - Once you complete a challenge, you&apos;ll earn a badge to showcase your achievement.
          </li>
          <li>
            <strong>Build momentum</strong> - Each challenge builds on the previous one, creating a comprehensive wealth-building journey.
          </li>
        </ol>
      </div>
    </div>
  );
}
