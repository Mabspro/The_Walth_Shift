import React from 'react';
import Card from '@/components/Card';

export default function Challenges() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Challenges</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Engage with practical challenges to implement what you&apos;re learning and create lasting change.
        </p>
      </div>
      
      <div className="bg-gradient-bg text-background rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Current Challenge</h2>
            <h3 className="text-xl font-semibold mb-2">21-Day Abundance Practice</h3>
            <p className="mb-4">
              This 21-day challenge guides you through daily practices designed to shift your relationship with abundance.
              Each day includes a simple 5-10 minute activity that builds upon the previous day&apos;s work.
            </p>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Progress</span>
                <span>Day 3 of 21</span>
              </div>
              <div className="w-full bg-background/20 rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 bg-background text-foreground rounded-lg p-6 shadow-md">
            <h4 className="font-bold mb-2">Today&apos;s Challenge</h4>
            <p className="mb-4 text-sm">
              <strong>Day 3: Gratitude Inventory</strong><br />
              Create a detailed inventory of all the abundance already present in your life.
            </p>
            <a 
              href="#" 
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              View Today&apos;s Challenge
            </a>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Upcoming Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Money Mindset Reset"
          description="A 14-day challenge to transform your relationship with money through daily practices."
          linkUrl="#"
          linkText="Starting June 15"
          className="opacity-70"
        />
        <Card
          title="Wealth Visualization"
          description="A 7-day challenge focused on powerful visualization techniques for wealth creation."
          linkUrl="#"
          linkText="Starting June 22"
          className="opacity-70"
        />
        <Card
          title="Prosperity Habits"
          description="A 30-day challenge to establish daily habits that support your wealth journey."
          linkUrl="#"
          linkText="Starting July 1"
          className="opacity-70"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Past Challenges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Wealth Affirmations"
          description="A 10-day challenge introducing powerful wealth affirmations and how to use them effectively."
          linkUrl="#"
          linkText="View Challenge"
        />
        <Card
          title="Financial Decluttering"
          description="A 5-day challenge to organize and simplify your financial life."
          linkUrl="#"
          linkText="View Challenge"
        />
      </div>
      
      <div className="bg-background rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4">How Challenges Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-accent text-4xl font-bold mb-2">01</div>
            <h3 className="text-lg font-semibold mb-2">Join a Challenge</h3>
            <p>
              Browse available challenges and join the one that resonates with your current focus.
              Each challenge has a specific start date and duration.
            </p>
          </div>
          <div>
            <div className="text-accent text-4xl font-bold mb-2">02</div>
            <h3 className="text-lg font-semibold mb-2">Daily Practice</h3>
            <p>
              Each day, you&apos;ll receive a new challenge activity. Complete the activity and mark it as done
              to track your progress.
            </p>
          </div>
          <div>
            <div className="text-accent text-4xl font-bold mb-2">03</div>
            <h3 className="text-lg font-semibold mb-2">Reflect & Integrate</h3>
            <p>
              After completing a challenge, take time to reflect on your experience and how you&apos;ll
              integrate what you&apos;ve learned into your daily life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
