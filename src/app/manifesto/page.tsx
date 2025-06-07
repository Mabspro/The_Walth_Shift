'use client';

import React from 'react';
import GatedLayout from '@/app/GatedLayout';
import SimpleForm from '@/components/SimpleForm';
import Image from 'next/image';

export default function Manifesto() {
  return (
    <GatedLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>The Wealth Shift Manifesto</h1>
          <p className="text-xl font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Our core values and principles that guide our community and journey.
          </p>
        </div>
        
        {/* Manifesto Scroll Image */}
        <div className="flex justify-center mb-12">
          <div className="relative max-w-2xl w-full">
            <Image
              src="/images/scroll_manifesto.png"
              alt="The Wealth Shift Manifesto"
              width={800}
              height={1200}
              className="w-full h-auto rounded-lg shadow-2xl"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
            />
          </div>
        </div>
        
        {/* Commented out original manifesto content */}
        
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-8 mb-12 border border-accent/30 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Affirm Your Commitment</h2>
          <p className="text-center mb-8 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            To continue your journey and unlock access to our portal, please affirm your commitment
            to The Wealth Shift principles by completing the form below.
          </p>
          
          <SimpleForm
            title="Manifesto Commitment"
            description="Please affirm your commitment to The Wealth Shift principles to continue your journey."
            questions={[
              {
                id: 'commitment',
                text: 'I affirm that I have read and commit to the following principles:',
                type: 'checkbox',
                options: [
                  'Intentional Growth: I commit to embracing both comfort and discomfort as teachers on my journey.',
                  'Community Support: I commit to supporting fellow community members and contributing to collective elevation.',
                  'Authentic Empowerment: I commit to practices that build genuine confidence and self-awareness.',
                  'Holistic Prosperity: I commit to nurturing all dimensions of prosperity in balanced harmony.',
                  'Ethical Impact: I commit to considering the impact of my actions on others and the planet.'
                ],
                required: true
              },
              {
                id: 'personal_commitment',
                text: 'What aspect of The Wealth Shift resonates most with you, and how do you plan to incorporate it into your journey?',
                type: 'textarea',
                required: false
              }
            ]}
            submitButtonText="Continue to Portal"
            redirectUrl="/unlock"
            className=""
          />
        </div>
      </div>
    </GatedLayout>
  );
}
