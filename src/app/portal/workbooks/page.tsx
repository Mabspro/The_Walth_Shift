'use client';

import React from 'react';
import Link from 'next/link';

interface WorkbookListing {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  exercises: number;
  stanstoreUrl: string;
  packageRequired: string;
}

const workbookListings: WorkbookListing[] = [
  {
    id: 'mindset-reset',
    title: 'Mindset Reset',
    description: 'Transform your relationship with money through powerful mindset shifts and daily practices.',
    icon: '🧠',
    duration: '2 days (included in Golden Pass)',
    exercises: 5,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Free with Golden Pass'
  },
  {
    id: 'debt-freedom',
    title: 'Debt Freedom Journey',
    description: 'Clear strategies to understand, manage, and eliminate debt while building healthy financial habits.',
    icon: '💳',
    duration: '2 days (bonus mini-workbook)',
    exercises: 6,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Included in all packages'
  },
  {
    id: 'investing-intro',
    title: 'Investing Introduction',
    description: 'Demystify investing and learn the fundamentals to start building your wealth portfolio.',
    icon: '📈',
    duration: '2 days (bonus mini-workbook)',
    exercises: 7,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Included in all packages'
  },
  {
    id: 'financial-freedom',
    title: 'Financial Freedom Blueprint',
    description: 'Create your personalized roadmap to financial independence and lasting wealth.',
    icon: '🗺️',
    duration: '2 days (bonus mini-workbook)',
    exercises: 8,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Included in all packages'
  },
  {
    id: 'abundance-mindset',
    title: 'Abundance Mindset Activation',
    description: 'Deep dive into abundance thinking and reprogram your money beliefs for lasting change.',
    icon: '✨',
    duration: '4 weeks',
    exercises: 21,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Basic package or higher'
  },
  {
    id: 'financial-clarity',
    title: 'Financial Clarity Blueprint',
    description: 'Get crystal clear on your current financial situation and create an actionable plan forward.',
    icon: '🔍',
    duration: '4 weeks',
    exercises: 18,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Basic package or higher'
  },
  {
    id: 'wealth-planning',
    title: 'Value-Based Wealth Planning',
    description: 'Align your money with your values and create a wealth plan that reflects what truly matters.',
    icon: '💎',
    duration: '4 weeks',
    exercises: 20,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Basic package or higher'
  },
  {
    id: 'wealth-archetype',
    title: 'Wealth Archetype Discovery',
    description: 'Discover your unique wealth personality and leverage it for financial success.',
    icon: '🔮',
    duration: '3 weeks',
    exercises: 15,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Connected package or higher'
  },
  {
    id: 'prosperity-journal',
    title: 'Prosperity Journaling Practice',
    description: 'Develop a consistent journaling practice to track your progress and maintain momentum.',
    icon: '📓',
    duration: '8 weeks',
    exercises: 56,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Connected package or higher'
  },
  {
    id: 'legacy-planning',
    title: 'Wealth Legacy Planning',
    description: 'Build intergenerational wealth and create a lasting financial legacy for your family.',
    icon: '🏛️',
    duration: '6 weeks',
    exercises: 25,
    stanstoreUrl: '#', // TODO: Add Stanstore URL
    packageRequired: 'Premium package'
  }
];

export default function Workbooks() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-cream">Workbooks</h1>
        <p className="text-xl max-w-3xl mx-auto text-cream/80">
          Access guided workbooks to deepen your understanding and practice. All workbooks are delivered via Stanstore and accessible through FlipSnack.
        </p>
      </div>
      
      {/* Featured: Golden Pass Starter */}
      <div className="bg-gradient-to-r from-yellow-600/20 to-yellow-800/20 rounded-lg p-8 mb-12 border border-accent/30 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/4 text-center">
            <div className="text-8xl mb-4">🚪</div>
            <div className="bg-accent/20 rounded-full px-4 py-2 inline-block">
              <span className="text-xl font-bold text-cream">FREE</span>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold mb-2 text-cream">Golden Pass Starter Kit</h2>
            <p className="text-lg text-cream/90 mb-4 italic">Begin your transformation - completely free</p>
            <p className="mb-6 leading-relaxed text-cream/80">
              Get instant access to two powerful mini-workbooks, sample affirmation and lingo decks, 
              exclusive worksheets, and one month of community access.
            </p>
            <a 
              href="#" // TODO: Add Stanstore Golden Pass URL
              className="px-8 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
            >
              Get Your Free Starter Kit →
            </a>
          </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8 text-center text-cream">Available Workbooks</h2>
      <p className="text-center text-cream/80 mb-12 max-w-3xl mx-auto">
        All workbooks are delivered digitally through Stanstore and accessible via FlipSnack. 
        Purchase a package to unlock your workbooks or start with the free Golden Pass.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {workbookListings.map((workbook) => (
          <div 
            key={workbook.id}
            className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-6 border border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            <div className="text-center mb-4">
              <div className="text-5xl mb-3">{workbook.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-cream">{workbook.title}</h3>
              <p className="text-sm text-accent mb-4">{workbook.packageRequired}</p>
            </div>
            
            <p className="mb-4 leading-relaxed text-cream/80 text-sm">{workbook.description}</p>
            
            <div className="bg-deep-sage/20 rounded-md p-3 mb-4">
              <div className="flex justify-between text-sm text-cream/70 mb-1">
                <span>Duration:</span>
                <span className="font-semibold">{workbook.duration}</span>
              </div>
              <div className="flex justify-between text-sm text-cream/70">
                <span>Exercises:</span>
                <span className="font-semibold">{workbook.exercises}+</span>
              </div>
            </div>
            
            <a 
              href={workbook.stanstoreUrl}
              className="px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1 w-full text-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              Access on Stanstore
            </a>
          </div>
        ))}
      </div>
      
      {/* How It Works */}
      <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg shadow-lg p-8 mb-16 border border-accent/30">
        <h2 className="text-2xl font-bold mb-6 text-cream text-center">How to Access Your Workbooks</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-3">1️⃣</div>
            <h3 className="font-bold mb-2 text-cream">Choose Your Package</h3>
            <p className="text-sm text-cream/80">
              Select the package that fits your journey - start free with Golden Pass or upgrade for more content.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">2️⃣</div>
            <h3 className="font-bold mb-2 text-cream">Instant Delivery</h3>
            <p className="text-sm text-cream/80">
              After purchase, receive an email with FlipSnack links to all your workbooks and resources.
            </p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">3️⃣</div>
            <h3 className="font-bold mb-2 text-cream">Start Your Journey</h3>
            <p className="text-sm text-cream/80">
              Access your workbooks anytime, anywhere through the FlipSnack platform.
            </p>
          </div>
        </div>
        
        <div className="text-center pt-6 border-t border-accent/20">
          <p className="text-cream/90 mb-4">Ready to get started?</p>
          <Link 
            href="/portal/packages"
            className="px-8 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
          >
            View All Packages
          </Link>
        </div>
      </div>

      {/* Support */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4 text-cream">Need Help Accessing Your Workbooks?</h2>
        <p className="mb-6 leading-relaxed font-medium text-cream/80">
          If you&apos;ve purchased a package and need assistance accessing your workbooks, our team is here to help.
        </p>
        <a 
          href="mailto:support@thewealthshift.com" 
          className="px-6 py-3 bg-transparent border-2 border-accent hover:bg-accent/20 text-cream font-semibold rounded-md transition-all duration-300 inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
