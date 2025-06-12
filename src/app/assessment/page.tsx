'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GatedLayout from '@/app/GatedLayout';
import SimpleForm from '@/components/SimpleForm';
import { 
  assessmentQuestions, 
  calculateAnswerScore, 
  calculateAssessmentResult, 
  saveAssessmentResult,
  AssessmentAnswer,
  getPersonalizedMessage,
  getMindsetMessage,
  WealthShiftLevel
} from '@/utils/assessment';
import { motion, AnimatePresence } from 'framer-motion';

export default function Assessment() {
  const router = useRouter();
  const [showResults, setShowResults] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<ReturnType<typeof calculateAssessmentResult> | null>(null);

  // Transform the assessment questions to the format expected by SimpleForm
  const formQuestions = assessmentQuestions.map((question) => ({
    id: question.id,
    text: question.text,
    type: 'radio' as const,
    options: question.options,
    required: true
  }));

  // Create the form questions array with all assessment questions plus email
  const allFormQuestions = [
    ...formQuestions,
    {
      id: 'email',
      text: 'Your email address',
      type: 'text' as const, // Using const assertion
      required: true
    }
  ];

  const handleAssessmentSubmit = (formData: Record<string, string | string[]>) => {
    // Process the form data to calculate the assessment result
    const answers: AssessmentAnswer[] = [];
    
    assessmentQuestions.forEach((question) => {
      const answerValue = formData[question.id];
      if (typeof answerValue === 'string') {
        const answerIndex = question.options.findIndex(option => option === answerValue);
        if (answerIndex !== -1) {
          answers.push({
            questionId: question.id,
            answer: answerValue,
            score: calculateAnswerScore(answerIndex)
          });
        }
      }
    });
    
    // Calculate the assessment result
    const result = calculateAssessmentResult(answers);
    
    // Save the result to localStorage
    saveAssessmentResult(result);
    
    // Store the email separately
    if (typeof formData.email === 'string') {
      localStorage.setItem('wealthShiftEmail', formData.email);
    }
    
    // Set the result in state
    setAssessmentResult(result);
    
    // Show the results
    setShowResults(true);
    
    // After a delay, redirect to the manifesto page
    setTimeout(() => {
      router.push('/manifesto');
    }, 8000); // 8 seconds to read the results
  };

  return (
    <GatedLayout>
      <div className="max-w-6xl mx-auto">
        {!showResults ? (
          <>
            <div className="text-center mb-12 mt-16">
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>The Wealth Shift Assessment</h1>
              <p className="text-xl font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Discover where you are on your wealth journey and get personalized recommendations.
              </p>
            </div>
            
            <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-accent/30">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--subheading)' }}>✨ A Note Before You Begin</h2>
              <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                When I first came to the U.S., I didn&apos;t know how the money system worked — credit, retirement, assets. 
                And I carried shame for not knowing. But over time, I realized: most women were never truly taught either.
              </p>
              <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                That&apos;s why I created The Wealth Shift — to change that.
              </p>
              <div className="border-t border-accent/30 my-6"></div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--subheading)' }}>📝 What This Test Will Do</h3>
              <p className="mb-3 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                This isn&apos;t a pass or fail. It&apos;s a fresh start.
              </p>
              <p className="mb-3 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                It will help you:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>See where you are now</li>
                <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Uncover any mindset blocks</li>
                <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Know exactly what to do next</li>
              </ul>
              <p className="italic opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                💬 Some questions are U.S.-based. If they don&apos;t apply, skip them. You&apos;re still shifting.
              </p>
              <p className="mt-4 font-medium" style={{ color: 'var(--soft-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                You&apos;re not behind. You&apos;re just beginning.
              </p>
              
              {!showAssessment && (
                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowAssessment(true)}
                    className="px-8 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
                  >
                    Start Assessment
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Assessment form with 13 questions */}
            <AnimatePresence>
              {showAssessment && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <SimpleForm
                    title="The Wealth Shift Assessment"
                    description="Please answer each question honestly for the most accurate results."
                    questions={allFormQuestions}
                    submitButtonText="Submit Assessment"
                    onSubmit={handleAssessmentSubmit}
                    className=""
                  />
                  
                  <div className="mt-12 text-center">
                    <p className="text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                      Your responses are confidential and will only be used to enhance your personalized portal experience.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          // Results display
          <motion.div 
            className="my-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-accent/30">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
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
                  className="text-2xl font-bold text-center mb-4" 
                  style={{ color: 'var(--soft-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {assessmentResult?.wealthShiftLevel}
                </motion.h3>
                
                <motion.p 
                  className="text-lg opacity-90 leading-relaxed text-center mb-6" 
                  style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  {assessmentResult && getPersonalizedMessage(assessmentResult.wealthShiftLevel)}
                </motion.p>
                
                <motion.div 
                  className="bg-background/30 backdrop-blur-sm rounded-lg p-6 mb-6 border border-accent/20"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <h4 className="font-bold mb-2" style={{ color: 'var(--subheading)' }}>Your Mindset: {assessmentResult?.mindsetType}</h4>
                  <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    {assessmentResult && getMindsetMessage(assessmentResult.mindsetType)}
                  </p>
                </motion.div>
                
                <motion.div 
                  className="text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                >
                  <p className="text-lg font-medium mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    Redirecting to the Manifesto in a few seconds...
                  </p>
                  <div className="w-full bg-background/30 h-2 rounded-full overflow-hidden">
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
