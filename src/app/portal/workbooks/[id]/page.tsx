'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import WorkbookTracker from '@/components/WorkbookTracker';
import { availableWorkbooks, Workbook } from '@/utils/assessment';

export default function WorkbookDetail() {
  const params = useParams();
  const router = useRouter();
  const [workbook, setWorkbook] = useState<Workbook | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  
  useEffect(() => {
    // Find the workbook by ID
    const id = params.id as string;
    const foundWorkbook = availableWorkbooks.find(w => w.id === id);
    
    if (foundWorkbook) {
      setWorkbook(foundWorkbook);
      
      // Check if the workbook has been started
      if (typeof window !== 'undefined') {
        const savedProgress = localStorage.getItem(`workbook_progress_${id}`);
        if (savedProgress) {
          setIsStarted(true);
        }
      }
    } else {
      // Workbook not found, redirect to workbooks list
      router.push('/portal/workbooks');
    }
  }, [params.id, router]);
  
  const handleStartWorkbook = () => {
    setIsStarted(true);
    
    // Initialize progress in localStorage
    if (typeof window !== 'undefined' && workbook) {
      localStorage.setItem(`workbook_progress_${workbook.id}`, JSON.stringify(Array(7).fill(false)));
    }
  };
  
  const handleWorkbookComplete = () => {
    // In a real implementation, this would trigger an API call to unlock the challenge
    // For now, we'll just store the completion status in localStorage
    if (typeof window !== 'undefined' && workbook) {
      localStorage.setItem(`workbook_completed_${workbook.id}`, 'true');
      
      // Show a notification or redirect to the challenges page
      alert('Congratulations! You have unlocked a new challenge.');
    }
  };
  
  if (!workbook) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <p className="text-xl">Loading workbook...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <Link 
          href="/portal/workbooks" 
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
          Back to Workbooks
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg p-8 shadow-lg border border-accent/20">
            <div className="flex items-center mb-6">
              <span className="text-4xl mr-4">{workbook.icon}</span>
              <h1 className="text-3xl font-bold">{workbook.title}</h1>
            </div>
            
            <p className="text-lg mb-6">{workbook.description}</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">What You&apos;ll Learn</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Understand your current relationship with money</li>
                <li>Identify and overcome limiting beliefs</li>
                <li>Develop new empowering money habits</li>
                <li>Create a personalized wealth-building plan</li>
                <li>Track your progress and celebrate your wins</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">What&apos;s Included</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>7 guided exercises</li>
                <li>3 visualization scripts</li>
                <li>Daily affirmation practice</li>
                <li>30-day abundance tracker</li>
                <li>Reflection prompts and journaling space</li>
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">How to Use This Workbook</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Download the workbook PDF</li>
                <li>Set aside 15-20 minutes each day</li>
                <li>Complete one exercise per day</li>
                <li>Track your progress using the 7-day tracker</li>
                <li>Reflect on your insights and growth</li>
              </ol>
            </div>
            
            {!isStarted && (
              <div className="mt-8">
                <button
                  onClick={handleStartWorkbook}
                  className="px-8 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
                >
                  Start This Workbook
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:w-1/3">
          {isStarted ? (
            <WorkbookTracker 
              workbookId={workbook.id} 
              totalDays={7} 
              onComplete={handleWorkbookComplete}
            />
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-md border border-accent/20">
              <h3 className="text-xl font-bold mb-4">Ready to Begin?</h3>
              <p className="mb-4">
                Click the &quot;Start This Workbook&quot; button to begin your 7-day journey with this workbook.
              </p>
              <p className="mb-4">
                You&apos;ll be able to track your progress and mark each day as complete as you work through the exercises.
              </p>
              <p className="text-sm text-gray-600 italic">
                Completing all 7 days will unlock the associated challenge.
              </p>
            </div>
          )}
          
          <div className="mt-6 bg-white rounded-lg p-6 shadow-md border border-accent/20">
            <h3 className="text-xl font-bold mb-4">Download Resources</h3>
            <a 
              href="#" 
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center mb-3"
            >
              Download Workbook PDF
            </a>
            <a 
              href="#" 
              className="px-6 py-3 bg-white hover:bg-gray-50 text-accent border border-accent font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              Download Companion Audio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
