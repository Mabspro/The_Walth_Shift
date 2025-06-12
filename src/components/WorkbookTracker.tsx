'use client';

import React, { useState, useEffect } from 'react';

interface WorkbookTrackerProps {
  workbookId: string;
  totalDays: number;
  onComplete?: () => void;
}

const WorkbookTracker: React.FC<WorkbookTrackerProps> = ({
  workbookId,
  totalDays = 7,
  onComplete
}) => {
  const [progress, setProgress] = useState<boolean[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  // Load progress from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem(`workbook_progress_${workbookId}`);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);
        setProgress(parsedProgress);
        
        // Check if all days are completed
        const allCompleted = parsedProgress.every((day: boolean) => day);
        setIsComplete(allCompleted);
      } else {
        // Initialize progress array with false values
        setProgress(Array(totalDays).fill(false));
      }
    }
  }, [workbookId, totalDays]);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && progress.length > 0) {
      localStorage.setItem(`workbook_progress_${workbookId}`, JSON.stringify(progress));
      
      // Check if all days are completed
      const allCompleted = progress.every(day => day);
      setIsComplete(allCompleted);
      
      // Call onComplete callback if all days are completed
      if (allCompleted && onComplete && !isComplete) {
        onComplete();
      }
    }
  }, [progress, workbookId, onComplete, isComplete]);

  const toggleDay = (index: number) => {
    const newProgress = [...progress];
    newProgress[index] = !newProgress[index];
    setProgress(newProgress);
  };

  const calculatePercentage = () => {
    const completedDays = progress.filter(day => day).length;
    return Math.round((completedDays / totalDays) * 100);
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-accent/20">
      <h3 className="text-xl font-bold mb-4">7-Day Tracker</h3>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="font-semibold text-gray-700">Progress</span>
          <span className="text-accent font-semibold">{calculatePercentage()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-accent h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${calculatePercentage()}%` }}
          ></div>
        </div>
      </div>
      
      {/* Day checkboxes */}
      <div className="space-y-3">
        {progress.map((isCompleted, index) => (
          <div key={index} className="flex items-center">
            <input
              type="checkbox"
              id={`day-${index + 1}`}
              checked={isCompleted}
              onChange={() => toggleDay(index)}
              className="w-5 h-5 text-accent focus:ring-accent rounded"
            />
            <label htmlFor={`day-${index + 1}`} className="ml-3 text-gray-700 font-medium">
              Day {index + 1}
            </label>
            {isCompleted && (
              <span className="ml-auto text-sage">
                ✓ Completed
              </span>
            )}
          </div>
        ))}
      </div>
      
      {/* Completion message */}
      {isComplete && (
        <div className="mt-6 p-4 bg-sage/10 rounded-lg border border-sage/20">
          <p className="text-sage font-semibold flex items-center">
            <span className="text-xl mr-2">🎉</span>
            Congratulations! You&apos;ve completed this workbook.
          </p>
          <p className="text-sm text-gray-600 mt-1">
            You&apos;ve unlocked the associated challenge. Check the Challenges section to continue your journey.
          </p>
        </div>
      )}
      
      {/* Email opt-in */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="email-opt-in"
            className="w-5 h-5 text-accent focus:ring-accent rounded mt-1"
          />
          <label htmlFor="email-opt-in" className="ml-3 text-sm text-gray-600">
            Send me daily reminders and encouragement to complete this workbook
          </label>
        </div>
      </div>
    </div>
  );
};

export default WorkbookTracker;
