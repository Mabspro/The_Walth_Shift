'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GatedLayout from '@/app/GatedLayout';
import ModalAssessment from '@/components/ModalAssessment';
import { 
  calculateAssessmentResult, 
  saveAssessmentResult,
  AssessmentAnswer,
  getPersonalizedMessage,
  getMindsetMessage,
  WealthShiftLevel
} from '@/utils/assessment';
import { motion } from 'framer-motion';

export default function Assessment() {
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<ReturnType<typeof calculateAssessmentResult> | null>(null);

  const handleAssessmentComplete = (answers: AssessmentAnswer[], email: string, fullName: string) => {
    // Calculate the assessment result
    const result = calculateAssessmentResult(answers);
    
    // Save the result to localStorage
    saveAssessmentResult(result);
    
    // Store the email and name separately
    localStorage.setItem('wealthShiftEmail', email);
    localStorage.setItem('wealthShiftName', fullName);
    
    // Close modal and show results
    setShowModal(false);
    setAssessmentResult(result);
    setShowResults(true);
    
    // After a delay, redirect to the manifesto page with flow parameter
    setTimeout(() => {
      router.push('/manifesto?flow=assessment');
    }, 8000); // 8 seconds to read the results
  };

  return (
    <GatedLayout>
      <div className="max-w-6xl mx-auto">
        {!showResults ? (
          <>
            <div className="text-center mb-12 mt-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 wealth-title">The Wealth Shift Assessment</h1>
              <p className="text-xl font-medium leading-relaxed text-portal-text-secondary embossed-text">
                Discover where you are on your wealth journey and get personalized recommendations.
              </p>
            </div>
            
            <div className="depth-card rounded-lg p-8 mb-8 border border-portal-border">
              <h2 className="text-2xl font-bold mb-4 text-portal-text-primary">✨ A Note Before You Begin</h2>
              <p className="mb-4 leading-relaxed text-portal-text-secondary">
                When I first came to the U.S., I didn&apos;t know how the money system worked — credit, retirement, assets. 
                And I carried shame for not knowing. But over time, I realized: most women were never truly taught either.
              </p>
              <p className="mb-4 leading-relaxed text-portal-text-secondary">
                That&apos;s why I created The Wealth Shift — to change that.
              </p>
              <div className="border-t border-portal-border my-6"></div>
              <h3 className="text-xl font-bold mb-3 text-portal-text-primary">📝 What This Test Will Do</h3>
              <p className="mb-3 leading-relaxed text-portal-text-secondary">
                This isn&apos;t a pass or fail. It&apos;s a fresh start.
              </p>
              <p className="mb-3 leading-relaxed text-portal-text-secondary">
                It will help you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="leading-relaxed text-portal-text-secondary">See where you are now</li>
                <li className="leading-relaxed text-portal-text-secondary">Uncover any mindset blocks</li>
                <li className="leading-relaxed text-portal-text-secondary">Know exactly what to do next</li>
              </ul>
              <p className="italic leading-relaxed text-portal-text-secondary">
                💬 Some questions are U.S.-based. If they don&apos;t apply, skip them. You&apos;re still shifting.
              </p>
              <p className="mt-4 font-medium text-accent">
                You&apos;re not behind. You&apos;re just beginning.
              </p>
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="luxury-button px-8 py-4 text-portal-beige font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Start Assessment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="mt-4 text-sm text-portal-text-muted">
                  ⏱️ Takes about 3-5 minutes
                </p>
              </div>
            </div>
            
            {/* Modal Assessment */}
            {showModal && (
              <ModalAssessment
                onComplete={handleAssessmentComplete}
                onClose={() => setShowModal(false)}
              />
            )}
          </>
        ) : (
          // Results display
          <motion.div 
            className="my-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="depth-card rounded-lg p-8 mb-8 border border-portal-border">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 wealth-title">
                  Your Wealth Shift Results
                </h2>
                <div className="w-24 h-1 bg-accent rounded mx-auto"></div>
              </div>
              
              <div className="mb-8">
                <motion.div 
                  className="flex items-center justify-center mb-4"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-accent/20 rounded-full p-4">
                    {assessmentResult?.wealthShiftLevel === WealthShiftLevel.SeedPlanter && <span className="text-4xl">🌱</span>}
                    {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Groundbreaker && <span className="text-4xl">🪴</span>}
                    {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Pathwalker && <span className="text-4xl">🏞️</span>}
                    {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Oracle && <span className="text-4xl">🔮</span>}
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl font-bold text-center mb-4 text-accent"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {assessmentResult?.wealthShiftLevel}
                </motion.h3>
                
                <motion.p 
                  className="text-lg leading-relaxed text-center mb-6 text-portal-text-secondary"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {assessmentResult && getPersonalizedMessage(assessmentResult.wealthShiftLevel)}
                </motion.p>
                
                <motion.div 
                  className="bg-portal-accent-subtle rounded-lg p-6 mb-6 border border-portal-border"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <h4 className="font-bold mb-2 text-portal-text-primary">Your Mindset: {assessmentResult?.mindsetType}</h4>
                  <p className="leading-relaxed text-portal-text-secondary">
                    {assessmentResult && getMindsetMessage(assessmentResult.mindsetType)}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <p className="text-lg font-medium mb-4 text-accent">
                    Redirecting to the Manifesto in a few seconds...
                  </p>
                  <div className="w-full bg-portal-border h-2 rounded-full overflow-hidden">
                    <div className="bg-accent h-full rounded-full animate-progress"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </GatedLayout>
  );
}
