'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import WorkbookPage from '@/components/WorkbookPage';

export default function DynamicWorkbookDay() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const workbookId = params.id as string;
  const day = parseInt(params.day as string, 10);
  
  useEffect(() => {
    // Redirect to the specific workbook day implementation if it exists
    // This is a simple routing mechanism to handle both dynamic and static workbook pages
    if (workbookId === 'workbook1' && day === 1) {
      router.push('/portal/workbooks/workbook1/day/1');
      return;
    }
    
    // For days that don&apos;t have a specific implementation yet, we could:
    // 1. Show a generic template
    // 2. Fetch content from an API
    // 3. Show a &quot;coming soon&quot; message
    
    setLoading(false);
  }, [workbookId, day, router]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
          <div className="h-4 bg-accent/20 rounded w-1/2 mx-auto mb-12"></div>
          <div className="h-96 bg-accent/10 rounded w-full max-w-2xl mx-auto"></div>
        </div>
      </div>
    );
  }
  
  // Generic workbook day content for days that don&apos;t have specific implementations
  return (
    <WorkbookPage
      workbookId={workbookId}
      day={day}
      title={`Day ${day}`}
      subtitle="Coming Soon"
      previousDay={day > 1 ? day - 1 : undefined}
      nextDay={day < 7 ? day + 1 : undefined}
    >
      <div className="space-y-6">
        <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 text-center">
          <h2 className="text-xl font-bold mb-4">This workbook day is coming soon!</h2>
          <p className="mb-4">
            We&apos;re working hard to bring you the best content for your wealth journey.
            This page will be available soon.
          </p>
          <p>
            In the meantime, you can explore other days of this workbook or check out our other resources.
          </p>
        </div>
      </div>
    </WorkbookPage>
  );
}
