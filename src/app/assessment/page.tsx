'use client';

import React from 'react';
import GatedLayout from '@/app/GatedLayout';
import SimpleForm from '@/components/SimpleForm';

export default function Assessment() {
  return (
    <GatedLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 mt-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Let&apos;s Get to Know You</h1>
          <p className="text-xl font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Help us create a personalized experience by sharing a bit about your wealth journey.
            This will help us curate the most relevant resources and tools for you.
          </p>
        </div>
        
        <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-8 border border-accent/30">
          <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--subheading)' }}>Just a Few Questions</h2>
          <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            This will take just a few minutes to complete. Please answer each question honestly 
            so we can create the best personalized experience for you.
          </p>
          <p className="mb-4 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Your responses will help us:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Understand your current <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>wealth mindset</span></li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Curate <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>personalized content</span> for your portal</li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Recommend the right <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>tools and workbooks</span> for you</li>
            <li className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Connect you with relevant <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>resources</span> and community members</li>
          </ul>
          <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            After sharing a bit about yourself, you&apos;ll be directed to our manifesto page where you can
            learn more about our core values and principles.
          </p>
        </div>
        
        {/* Simple personalization form with redirect to manifesto page */}
        <SimpleForm
          title="Tell Us About Your Journey"
          description="Please answer the following questions to help us personalize your experience."
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
          className=""
        />
        
        <div className="mt-12 text-center">
          <p className="text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            By sharing a bit about yourself, you&apos;re helping us create the perfect experience for your wealth journey.
            Your responses are confidential and will only be used to enhance your personalized portal experience.
          </p>
        </div>
      </div>
    </GatedLayout>
  );
}
