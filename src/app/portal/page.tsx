'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import { 
  getAssessmentResult, 
  hasCompletedAssessment,
  WealthShiftLevel,
  Workbook
} from '@/utils/assessment';

export default function Portal() {
  const [assessmentCompleted, setAssessmentCompleted] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<ReturnType<typeof getAssessmentResult>>(null);
  const [recommendedWorkbooks, setRecommendedWorkbooks] = useState<Workbook[]>([]);

  useEffect(() => {
    // Check if the user has completed the assessment
    const completed = hasCompletedAssessment();
    setAssessmentCompleted(completed);

    if (completed) {
      // Get the assessment result
      const result = getAssessmentResult();
      setAssessmentResult(result);

      // Get the recommended workbooks
      if (result) {
        const recommended = result.recommendedWorkbooks.filter(workbook => workbook.recommended);
        setRecommendedWorkbooks(recommended);
      }
    }
  }, []);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-portal-text-primary">Your Wealth Shift Portal</h1>
        <p className="text-xl max-w-3xl mx-auto font-medium leading-relaxed text-portal-text-secondary">
          Welcome to your personal portal. Explore the resources and tools designed to support your wealth journey.
        </p>
      </div>
      
      <div className="mb-16">
        <div className="bg-portal-beige-card rounded-lg p-8 mb-8 border border-portal-border shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2 text-portal-text-primary">Welcome Back!</h2>
              <p className="mb-0 leading-relaxed text-portal-text-secondary">
                {assessmentCompleted 
                  ? "Continue your wealth journey by exploring your personalized recommendations."
                  : "Continue your journey by exploring the different sections of your portal."}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/portal/workbooks" 
                className="px-6 py-3 bg-accent hover:bg-highlight text-portal-beige font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
              >
                Start Today&apos;s Activity
              </Link>
            </div>
          </div>
        </div>
        
        {!assessmentCompleted ? (
          // Personalization Call-to-Action Card (shown if assessment not completed)
          <div className="bg-portal-accent-subtle rounded-lg p-8 mb-8 border border-portal-border shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold mb-3 text-portal-text-primary flex items-center">
                  <span className="text-3xl mr-3">✨</span>
                  Let&apos;s Get to Know You
                </h2>
                <p className="mb-4 leading-relaxed text-portal-text-secondary font-medium">
                  Before you dive into the portal, we&apos;d love to learn just a couple of things about you to create 
                  a personalized experience. This helps us curate the most relevant tools, workbooks, and challenges for your unique journey.
                </p>
                <ul className="text-sm text-portal-text-secondary space-y-1">
                  <li>• Customized content recommendations</li>
                  <li>• Personalized resource suggestions</li>
                  <li>• Tailored portal experience</li>
                </ul>
              </div>
              <div className="mt-6 md:mt-0 md:w-1/3 text-center">
                <Link 
                  href="/assessment" 
                  className="px-8 py-4 bg-accent hover:bg-highlight text-portal-beige font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1 text-lg"
                >
                  Get Started
                </Link>
                <p className="text-xs text-portal-text-muted mt-2">Just a few questions</p>
              </div>
            </div>
          </div>
        ) : (
          // Personalized Results Card (shown if assessment completed)
          <div className="bg-gradient-to-r from-accent/10 to-highlight/10 rounded-lg p-8 mb-8 border border-accent/30 shadow-lg">
            <div className="flex flex-col md:flex-row items-start">
              <div className="md:w-1/3 text-center mb-6 md:mb-0">
                <div className="bg-accent/20 rounded-full p-4 inline-block mb-3">
                  {assessmentResult?.wealthShiftLevel === WealthShiftLevel.SeedPlanter && <span className="text-4xl">🌱</span>}
                  {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Groundbreaker && <span className="text-4xl">🪴</span>}
                  {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Pathwalker && <span className="text-4xl">🏞️</span>}
                  {assessmentResult?.wealthShiftLevel === WealthShiftLevel.Oracle && <span className="text-4xl">🔮</span>}
                </div>
                <h3 className="text-xl font-bold mb-2 text-cream">
                  {assessmentResult?.wealthShiftLevel}
                </h3>
                <p className="text-sm text-cream/80">
                  Mindset: {assessmentResult?.mindsetType}
                </p>
              </div>
              <div className="md:w-2/3 md:pl-8 md:border-l border-accent/30">
                <h2 className="text-2xl font-bold mb-3 text-cream">Your Personalized Journey</h2>
                <p className="mb-4 leading-relaxed text-cream/90">
                  Based on your assessment, we&apos;ve curated the following workbooks to help you on your wealth journey:
                </p>
                <ul className="space-y-3 mb-6">
                  {recommendedWorkbooks.map((workbook) => (
                    <li key={workbook.id} className="flex items-center">
                      <span className="text-2xl mr-3">{workbook.icon}</span>
                      <span className="font-medium text-cream/90">{workbook.title} - <span className="text-sm text-cream/70">{workbook.description}</span></span>
                    </li>
                  ))}
                </ul>
                <Link 
                  href="/portal/workbooks" 
                  className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
                >
                  Start Your Recommended Workbooks
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          icon="📚"
          title="Workbooks"
          description="Access guided workbooks to deepen your understanding and practice."
          linkUrl="/portal/workbooks"
          linkText="View Workbooks"
        />
        <Card
          icon="🎯"
          title="Challenges"
          description="Engage with practical challenges to implement what you're learning."
          linkUrl="/portal/challenges"
          linkText="View Challenges"
        />
        <Card
          icon="🛍️"
          title="Marketplace"
          description="Discover curated resources and offerings to support your journey."
          linkUrl="/portal/marketplace"
          linkText="Visit Marketplace"
        />
        <Card
          icon="📦"
          title="Packages"
          description="Explore our transformation packages and choose your path."
          linkUrl="/portal/packages"
          linkText="View Packages"
        />
        <Card
          icon="🎉"
          title="Celebration"
          description="Acknowledge and celebrate your wins and milestones."
          linkUrl="/portal/celebration"
          linkText="Celebrate"
        />
        <Card
          icon="👥"
          title="Community"
          description="Connect with fellow members in WhatsApp Pods and The Shifters Community."
          linkUrl="/portal/community"
          linkText="Join Community"
        />
      </div>
      
      <div className="bg-portal-beige-card rounded-lg shadow-lg p-8 mb-16 border border-portal-border">
        <h2 className="text-2xl font-bold mb-4 text-portal-text-primary">Your Progress</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-portal-text-primary">Journey Completion</span>
            <span className="text-accent font-semibold">{assessmentCompleted ? "25%" : "0%"}</span>
          </div>
          <div className="w-full bg-portal-border rounded-full h-2.5">
            <div 
              className="bg-accent h-2.5 rounded-full transition-all duration-1000" 
              style={{ width: assessmentCompleted ? '25%' : '0%' }}
            ></div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-portal-text-primary">Recent Activity</h3>
        <ul className="space-y-3">
          {assessmentCompleted && (
            <>
              <li className="flex items-center justify-between p-3 bg-portal-accent-subtle rounded-md border border-portal-border">
                <span className="text-portal-text-secondary">Completed <span className="text-accent font-semibold">Assessment</span></span>
                <span className="text-sm text-portal-text-muted">Just now</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-portal-accent-subtle rounded-md border border-portal-border">
                <span className="text-portal-text-secondary">Affirmed <span className="text-accent font-semibold">Manifesto</span></span>
                <span className="text-sm text-portal-text-muted">Just now</span>
              </li>
              <li className="flex items-center justify-between p-3 bg-portal-accent-subtle rounded-md border border-portal-border">
                <span className="text-portal-text-secondary">Watched <span className="text-accent font-semibold">Welcome Video</span></span>
                <span className="text-sm text-portal-text-muted">Just now</span>
              </li>
            </>
          )}
          {!assessmentCompleted && (
            <li className="flex items-center justify-between p-3 bg-portal-accent-subtle rounded-md border border-portal-border">
              <span className="text-portal-text-secondary">No activity yet</span>
              <span className="text-sm text-portal-text-muted">-</span>
            </li>
          )}
        </ul>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4 text-portal-text-primary">Need Help?</h2>
        <p className="mb-6 leading-relaxed font-medium text-portal-text-secondary">
          If you have any questions or need assistance, our team is here to help.
        </p>
        <a 
          href="mailto:support@thewealthshift.com" 
          className="px-6 py-3 bg-accent hover:bg-highlight text-portal-beige font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
