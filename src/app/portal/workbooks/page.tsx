import React from 'react';
import Card from '@/components/Card';

export default function Workbooks() {
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
            <h2 className="text-2xl font-bold mb-4">Featured Workbook</h2>
            <h3 className="text-xl font-semibold mb-2">Abundance Mindset Activation</h3>
            <p className="mb-4">
              This comprehensive workbook guides you through exercises designed to shift your mindset from scarcity to abundance.
              Through reflective prompts, visualization techniques, and practical activities, you&apos;ll begin to recognize and
              embrace the abundance that already exists in your life.
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
              href="#" 
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              Download Workbook
            </a>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">All Workbooks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Abundance Mindset Activation"
          description="Shift from scarcity to abundance through guided exercises and practices."
          linkUrl="#"
          linkText="View Workbook"
        />
        <Card
          title="Financial Clarity Blueprint"
          description="Gain clarity on your current financial situation and set empowering goals."
          linkUrl="#"
          linkText="View Workbook"
        />
        <Card
          title="Value-Based Wealth Planning"
          description="Align your wealth-building strategies with your core values and purpose."
          linkUrl="#"
          linkText="View Workbook"
        />
        <Card
          title="Wealth Archetype Discovery"
          description="Discover your unique wealth archetype and leverage your natural strengths."
          linkUrl="#"
          linkText="Coming Soon"
          className="opacity-70"
        />
        <Card
          title="Prosperity Journaling Practice"
          description="Transform your relationship with wealth through guided journaling prompts."
          linkUrl="#"
          linkText="Coming Soon"
          className="opacity-70"
        />
        <Card
          title="Wealth Legacy Planning"
          description="Create a meaningful plan for your wealth legacy and impact."
          linkUrl="#"
          linkText="Coming Soon"
          className="opacity-70"
        />
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
