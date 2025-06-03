'use client';

import React from 'react';
import GatedLayout from '@/app/GatedLayout';
import SimpleForm from '@/components/SimpleForm';

export default function Assessment() {
  return (
    <GatedLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Your Wealth Journey Assessment</h1>
          <p className="text-xl font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Discover where you are on your wealth journey with our personalized assessment.
            This will help us understand your needs and provide you with the most relevant resources.
          </p>
        </div>
        
        <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-accent/30">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--subheading)' }}>Before You Begin</h2>
          <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            This assessment will take approximately 5-10 minutes to complete. Please answer each question
            honestly to get the most accurate results.
          </p>
          <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Your responses will help us:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Understand your current <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>wealth mindset</span></li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Identify areas for <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>growth and development</span></li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Customize your <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>journey</span> through The Wealth Shift</li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Connect you with relevant <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>resources</span> and community members</li>
          </ul>
          <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            After completing the assessment, you&apos;ll be directed to our manifesto page where you can
            learn more about our core values and principles.
          </p>
        </div>
        
        {/* Simple assessment form with redirect to manifesto page */}
        <SimpleForm
          title="Wealth Journey Assessment"
          description="Please answer the following questions to help us understand your wealth journey better."
          questions={[
            {
              id: 'wealth_mindset',
              text: 'How would you describe your current relationship with wealth?',
              type: 'radio',
              options: [
                'I struggle with financial scarcity and often worry about money',
                'I\'m financially stable but feel stuck or uncertain about growth',
                'I\'m growing my wealth but want more purpose and alignment',
                'I have abundance but seek deeper meaning and impact'
              ],
              required: true
            },
            {
              id: 'growth_areas',
              text: 'Which areas of wealth are you most interested in developing? (Select all that apply)',
              type: 'checkbox',
              options: [
                'Financial literacy and investment knowledge',
                'Mindset and relationship with money',
                'Purpose-driven wealth creation',
                'Community and collaborative opportunities',
                'Ethical impact and giving'
              ],
              required: true
            },
            {
              id: 'biggest_challenge',
              text: 'What is your biggest challenge when it comes to wealth building?',
              type: 'radio',
              options: [
                'Lack of knowledge or resources',
                'Limiting beliefs or mindset blocks',
                'Finding alignment with my values',
                'Building supportive community',
                'Other'
              ],
              required: true
            },
            {
              id: 'email',
              text: 'Your email address',
              type: 'text',
              required: true
            }
          ]}
          submitButtonText="Continue to Manifesto"
          redirectUrl="/manifesto"
          className="bg-background/10 backdrop-blur-sm rounded-lg border border-accent/20 p-2"
        />
        
        <div className="mt-12 text-center">
          <p className="text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            By completing this assessment, you&apos;re taking the first step on your wealth journey.
            Your responses are confidential and will only be used to enhance your experience.
          </p>
        </div>
      </div>
    </GatedLayout>
  );
}
