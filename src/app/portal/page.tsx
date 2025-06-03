import React from 'react';
import Link from 'next/link';
import Card from '@/components/Card';

export default function Portal() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Your Wealth Shift Portal</h1>
        <p className="text-xl max-w-3xl mx-auto font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          Welcome to your personal portal. Explore the resources and tools designed to support your wealth journey.
        </p>
      </div>
      
      <div className="mb-16">
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-8 mb-8 border border-accent/30 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Welcome Back!</h2>
              <p className="mb-0 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Continue your journey by exploring the different sections of your portal.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link 
                href="/portal/workbooks" 
                className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
              >
                Start Today&apos;s Activity
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Workbooks"
          description="Access guided workbooks to deepen your understanding and practice."
          linkUrl="/portal/workbooks"
          linkText="View Workbooks"
        />
        <Card
          title="Challenges"
          description="Engage with practical challenges to implement what you're learning."
          linkUrl="/portal/challenges"
          linkText="View Challenges"
        />
        <Card
          title="Marketplace"
          description="Discover curated resources and offerings to support your journey."
          linkUrl="/portal/marketplace"
          linkText="Visit Marketplace"
        />
        <Card
          title="Giving"
          description="Find opportunities to contribute and give back to the community."
          linkUrl="/portal/giving"
          linkText="Explore Giving"
        />
        <Card
          title="Celebration"
          description="Acknowledge and celebrate your wins and milestones."
          linkUrl="/portal/celebration"
          linkText="Celebrate"
        />
        <Card
          title="Community"
          description="Connect with fellow members on the wealth journey."
          linkUrl="#"
          linkText="Coming Soon"
        />
      </div>
      
      <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-16 border border-accent/30">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--subheading)' }}>Your Progress</h2>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Journey Completion</span>
            <span style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>25%</span>
          </div>
          <div className="w-full bg-foreground/10 rounded-full h-2.5">
            <div className="bg-accent h-2.5 rounded-full" style={{ width: '25%' }}></div>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--subheading)' }}>Recent Activity</h3>
        <ul className="space-y-3">
          <li className="flex items-center justify-between p-3 bg-background/10 backdrop-blur-sm rounded-md border border-accent/10">
            <span className="opacity-90" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Completed <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>Assessment</span></span>
            <span className="text-sm opacity-80" style={{ color: 'var(--warm-gold)' }}>2 days ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-background/10 backdrop-blur-sm rounded-md border border-accent/10">
            <span className="opacity-90" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Affirmed <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>Manifesto</span></span>
            <span className="text-sm opacity-80" style={{ color: 'var(--warm-gold)' }}>2 days ago</span>
          </li>
          <li className="flex items-center justify-between p-3 bg-background/10 backdrop-blur-sm rounded-md border border-accent/10">
            <span className="opacity-90" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Watched <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>Welcome Video</span></span>
            <span className="text-sm opacity-80" style={{ color: 'var(--warm-gold)' }}>1 day ago</span>
          </li>
        </ul>
      </div>
      
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Need Help?</h2>
        <p className="mb-6 opacity-90 leading-relaxed font-medium" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
          If you have any questions or need assistance, our team is here to help.
        </p>
        <a 
          href="mailto:support@thewealthshift.com" 
          className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
