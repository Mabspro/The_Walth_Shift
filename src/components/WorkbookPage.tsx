'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WorkbookTracker from '@/components/WorkbookTracker';

interface WorkbookPageProps {
  workbookId: string;
  day: number;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  previousDay?: number;
  nextDay?: number;
}

const WorkbookPage: React.FC<WorkbookPageProps> = ({
  workbookId,
  day,
  title,
  subtitle,
  children,
  previousDay,
  nextDay
}) => {
  const [showTracker, setShowTracker] = useState(false);
  
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8">
        <Link 
          href={`/portal/workbooks/${workbookId}`} 
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
          Back to Workbook
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg p-8 shadow-lg border border-accent/20">
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                  Day {day}
                </span>
              </div>
              <h1 className="text-3xl font-bold mb-2">{title}</h1>
              {subtitle && (
                <p className="text-lg text-gray-600 italic">{subtitle}</p>
              )}
            </div>
            
            <div className="prose max-w-none">
              {children}
            </div>
            
            <div className="mt-12 flex justify-between">
              {previousDay ? (
                <Link 
                  href={`/portal/workbooks/${workbookId}/day/${previousDay}`}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-md transition-colors duration-300 flex items-center"
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
                  Previous Day
                </Link>
              ) : (
                <div></div>
              )}
              
              {nextDay ? (
                <Link 
                  href={`/portal/workbooks/${workbookId}/day/${nextDay}`}
                  className="px-4 py-2 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 flex items-center"
                >
                  Next Day
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
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3">
          <div className="sticky top-24">
            <button
              onClick={() => setShowTracker(!showTracker)}
              className="w-full px-4 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 mb-4 flex items-center justify-center"
            >
              {showTracker ? 'Hide Progress Tracker' : 'Show Progress Tracker'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-2 transition-transform duration-300 ${showTracker ? 'rotate-180' : ''}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>
            
            {showTracker && (
              <WorkbookTracker 
                workbookId={workbookId} 
                totalDays={7} 
              />
            )}
            
            <div className="bg-white rounded-lg p-6 shadow-md border border-accent/20 mt-4">
              <h3 className="text-xl font-bold mb-4">Journal Prompts</h3>
              <p className="mb-4 text-gray-600">
                Take time to reflect on today&apos;s lesson. Write your thoughts in your journal or in the notes section below.
              </p>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                rows={6}
                placeholder="Your reflections..."
              ></textarea>
              <div className="mt-4 text-right">
                <button className="px-4 py-2 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkbookPage;
