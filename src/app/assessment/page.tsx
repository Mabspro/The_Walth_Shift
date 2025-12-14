'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import GatedLayout from '@/app/GatedLayout';
import ModalAssessment from '@/components/ModalAssessment';
import { 
  calculateAssessmentResult, 
  saveAssessmentToDatabase,
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

  const handleAssessmentComplete = async (
    answers: AssessmentAnswer[], 
    email: string, 
    fullName: string, 
    phone?: string,
    password?: string,
    createAccount?: boolean
  ) => {
    // Calculate the assessment result
    const result = calculateAssessmentResult(answers);
    
    // If user wants to create an account, do that first
    if (createAccount && password) {
      const { signUp } = await import('@/utils/auth');
      const signUpResult = await signUp({
        email,
        password,
        fullName,
        phone
      });

      if (signUpResult.success) {
        // Account created successfully - store email for later redirect
        // User needs to verify email before accessing portal
        // We'll show results first, then redirect to signin when they try to enter portal
        sessionStorage.setItem('pendingVerification', email);
      } else {
        // Handle signup error - could show error message
        console.error('Account creation failed:', signUpResult.error);
        // Continue with assessment anyway (guest mode)
      }
    }
    
    // Save to both localStorage and Supabase
    await saveAssessmentToDatabase(email, fullName, phone, answers, result);
    
    // Close modal and show results
    setShowModal(false);
    setAssessmentResult(result);
    setShowResults(true);
    
    // After a delay, redirect to the manifesto page with flow parameter
    // Use replace to avoid adding to history and prevent back button issues
    setTimeout(() => {
      router.replace('/manifesto?flow=assessment');
    }, 8000); // 8 seconds to read the results
  };

  return (
    <GatedLayout>
      <div className="max-w-6xl mx-auto">
        {!showResults ? (
          <>
            <div className="text-center mb-12 mt-16">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 wealth-title">Start Your Wealth Shift</h1>
              <p className="text-xl font-medium leading-relaxed text-portal-text-secondary embossed-text mb-4">
                A free 5-minute financial test to help you understand where you stand, who you are with money, and what your next step should be.
              </p>
              <p className="text-lg italic leading-relaxed text-portal-text-secondary">
                Because every woman deserves clarity, confidence, and a path that finally makes sense.
              </p>
            </div>
            
            <div className="depth-card rounded-lg p-8 mb-8 border border-portal-border">
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-2xl mr-3 flex-shrink-0">✨</span>
                  <span className="leading-relaxed text-portal-text-secondary text-lg">
                    See your true starting point — without shame, pressure, or judgment.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 flex-shrink-0">✨</span>
                  <span className="leading-relaxed text-portal-text-secondary text-lg">
                    Discover your Wealth Shift Archetype — the money identity shaping your decisions.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3 flex-shrink-0">✨</span>
                  <span className="leading-relaxed text-portal-text-secondary text-lg">
                    Get your personalized roadmap — clear, simple steps for your financial rise.
                  </span>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowModal(true)}
                  className="luxury-button px-8 py-4 text-portal-beige font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-3 text-lg"
                >
                  Start My Test
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <p className="mt-4 text-sm text-portal-text-muted">
                  Takes less than 5 minutes. Your full results will be sent to your email.
                </p>
                <p className="mt-3 text-sm italic text-portal-text-muted">
                  &ldquo;This is where my own Wealth Shift began.&rdquo; — Beryl
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
