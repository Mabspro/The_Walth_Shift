'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assessmentQuestions, calculateAnswerScore, AssessmentAnswer } from '@/utils/assessment';

interface ModalAssessmentProps {
  onComplete: (answers: AssessmentAnswer[], email: string, fullName: string) => void;
  onClose?: () => void;
}

const ModalAssessment: React.FC<ModalAssessmentProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<AssessmentAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);

  const totalQuestions = assessmentQuestions.length;
  const progress = ((currentQuestion + 1) / (totalQuestions + 1)) * 100;

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const answerIndex = assessmentQuestions[currentQuestion].options.findIndex(
        option => option === selectedAnswer
      );
      
      const newAnswer: AssessmentAnswer = {
        questionId: assessmentQuestions[currentQuestion].id,
        answer: selectedAnswer,
        score: calculateAnswerScore(answerIndex)
      };

      setAnswers([...answers, newAnswer]);
      setSelectedAnswer('');

      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowPersonalInfo(true);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer(answers[answers.length - 1]?.answer || '');
    }
  };

  const handleSubmit = () => {
    if (email && fullName) {
      onComplete(answers, email, fullName);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="depth-card w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-portal-border"
      >
        {/* Progress Bar */}
        <div className="sticky top-0 z-10 bg-portal-beige-light border-b border-portal-border p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-portal-text-primary">The Wealth Shift Assessment</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-portal-text-muted hover:text-portal-text-primary transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-3 bg-portal-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-accent via-warm-gold to-accent"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{
                  boxShadow: '0 0 10px rgba(212, 167, 106, 0.5)'
                }}
              />
            </div>
            <span className="text-sm font-semibold text-portal-text-secondary min-w-[80px] text-right">
              {showPersonalInfo ? 'Almost Done!' : `${currentQuestion + 1} of ${totalQuestions}`}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <AnimatePresence mode="wait">
            {!showPersonalInfo ? (
              <motion.div
                key={currentQuestion}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <p className="text-sm font-medium text-accent mb-3">
                    Question {currentQuestion + 1} of {totalQuestions}
                  </p>
                  <h3 className="text-2xl font-bold text-portal-text-primary mb-6 leading-relaxed">
                    {assessmentQuestions[currentQuestion].text}
                  </h3>
                </div>

                <div className="space-y-3 mb-8">
                  {assessmentQuestions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                        selectedAnswer === option
                          ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                          : 'border-portal-border bg-portal-beige-light hover:border-accent/50 hover:bg-portal-accent-subtle'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswer === option
                            ? 'border-accent bg-accent'
                            : 'border-portal-border'
                        }`}>
                          {selectedAnswer === option && (
                            <div className="w-2.5 h-2.5 rounded-full bg-portal-beige" />
                          )}
                        </div>
                        <span className={`text-base ${
                          selectedAnswer === option
                            ? 'text-portal-text-primary font-medium'
                            : 'text-portal-text-secondary'
                        }`}>
                          {option}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="personal-info"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-portal-text-primary mb-3 wealth-title">
                    Almost There! ✨
                  </h3>
                  <p className="text-portal-text-secondary leading-relaxed">
                    Please provide your details to receive your personalized wealth shift results.
                  </p>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-portal-text-primary mb-2">
                      Full Name <span className="text-accent">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-portal-beige-light rounded-lg border-2 border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-portal-text-primary transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-portal-text-primary mb-2">
                      Email Address <span className="text-accent">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-portal-beige-light rounded-lg border-2 border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 text-portal-text-primary transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-portal-border">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0 && !showPersonalInfo}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentQuestion === 0 && !showPersonalInfo
                  ? 'opacity-0 cursor-not-allowed'
                  : 'text-portal-text-primary border-2 border-portal-border hover:border-accent hover:bg-portal-accent-subtle'
              }`}
            >
              ← Back
            </button>

            {!showPersonalInfo ? (
              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className={`luxury-button px-8 py-3 rounded-lg font-semibold text-portal-beige transition-all duration-300 ${
                  !selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {currentQuestion < totalQuestions - 1 ? 'Next Question →' : 'Continue →'}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!email || !fullName}
                className={`luxury-button px-8 py-3 rounded-lg font-semibold text-portal-beige transition-all duration-300 ${
                  !email || !fullName ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                See My Results →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalAssessment;
