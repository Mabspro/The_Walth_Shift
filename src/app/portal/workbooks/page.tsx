'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/Card';
import { 
  getAssessmentResult, 
  hasCompletedAssessment,
  availableWorkbooks,
  WorkbookType
} from '@/utils/assessment';

export default function Workbooks() {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [recommendedWorkbookIds, setRecommendedWorkbookIds] = useState<string[]>([]);
  const [featuredWorkbook, setFeaturedWorkbook] = useState(availableWorkbooks[0]);

  useEffect(() => {
    // Check if the user has completed the assessment
    const completed = hasCompletedAssessment();
    setAssessmentCompleted(completed);

    if (completed) {
      // Get the assessment result
      const result = getAssessmentResult();
      
      if (result) {
        // Get the recommended workbooks
        const recommended = result.recommendedWorkbooks
          .filter(workbook => workbook.recommended)
          .map(workbook => workbook.id);
        
        setRecommendedWorkbookIds(recommended);
        
        // Set the featured workbook to the first recommended workbook
        if (recommended.length > 0) {
          const firstRecommended = result.recommendedWorkbooks.find(w => w.id === recommended[0]);
          if (firstRecommended) {
            setFeaturedWorkbook(firstRecommended);
          }
        }
      }
    }
  }, []);

  // Map our workbook types to the card titles
  const workbookTypeToTitle = {
    [WorkbookType.MindsetAwareness]: "Abundance Mindset Activation",
    [WorkbookType.DebtClarity]: "Financial Clarity Blueprint",
    [WorkbookType.AssetsNetWorth]: "Value-Based Wealth Planning",
    [WorkbookType.Investing]: "Wealth Archetype Discovery",
    [WorkbookType.IncomeSideHustles]: "Prosperity Journaling Practice",
    [WorkbookType.Legacy]: "Wealth Legacy Planning"
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">Workbooks</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Access guided workbooks to deepen your understanding and practice.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-8 mb-12 border border-accent/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <div className="flex items-center mb-4">
              <h2 className="text-2xl font-bold">Featured Workbook</h2>
              {assessmentCompleted && recommendedWorkbookIds.includes(featuredWorkbook.id) && (
                <span className="ml-3 text-sm font-semibold px-3 py-1 bg-sage/20 text-sage rounded-full">
                  Recommended for You
                </span>
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <span className="text-2xl mr-2">{featuredWorkbook.icon}</span>
              {featuredWorkbook.title}
            </h3>
            <p className="mb-4">
              {featuredWorkbook.description}
              {featuredWorkbook.type === WorkbookType.MindsetAwareness && (
                <span> Through reflective prompts, visualization techniques, and practical activities, you&apos;ll begin to recognize and
                embrace the abundance that already exists in your life.</span>
              )}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>7 guided exercises</li>
              <li>3 visualization scripts</li>
              <li>Daily affirmation practice</li>
              <li>30-day abundance tracker</li>
            </ul>
          </div>
          <div className="md:w-1/3 bg-gray-50 rounded-lg p-6 shadow-md">
            <h4 className="font-bold mb-2">Start Today</h4>
            <p className="mb-4 text-sm">
              Estimated completion time: 4 weeks
              (15-20 minutes daily)
            </p>
            <a 
              href={`/portal/workbooks/${featuredWorkbook.id}`}
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              View Workbook
            </a>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Workbooks</h2>
        {assessmentCompleted && (
          <div className="text-sm text-gray-600">
            <span className="inline-block font-semibold mr-2 px-3 py-1 bg-sage/20 text-sage rounded-full">
              Recommended for You
            </span>
            <i>based on your assessment results</i>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {availableWorkbooks.map((workbook) => {
          const isRecommended = assessmentCompleted && recommendedWorkbookIds.includes(workbook.id);
          const title = workbookTypeToTitle[workbook.type] || workbook.title;
          
          return (
            <div key={workbook.id} className="relative">
              {isRecommended && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="inline-block text-sm font-semibold px-3 py-1 bg-sage/20 text-sage rounded-full">
                    Recommended
                  </span>
                </div>
              )}
              <Card
                icon={workbook.icon}
                title={title}
                description={workbook.description}
                linkUrl={`/portal/workbooks/${workbook.id}`}
                linkText="View Workbook"
              className=""
              />
            </div>
          );
        })}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16 border border-accent/20">
        <h2 className="text-2xl font-bold mb-4">How to Use Workbooks</h2>
        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Download the workbook</strong> - Click on the workbook you want to explore and download the PDF.
          </li>
          <li>
            <strong>Set aside dedicated time</strong> - Create a regular practice time to work through the exercises.
          </li>
          <li>
            <strong>Complete the exercises</strong> - Follow the instructions and complete each exercise thoughtfully.
          </li>
          <li>
            <strong>Reflect on your insights</strong> - Take time to reflect on what you&apos;re learning about yourself.
          </li>
          <li>
            <strong>Implement the practices</strong> - Apply the concepts and practices in your daily life.
          </li>
          <li>
            <strong>Track your progress</strong> - Use the provided trackers to monitor your growth and shifts.
          </li>
        </ol>
      </div>
    </div>
  );
}
