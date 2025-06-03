'use client';

import React from 'react';
import GatedLayout from '@/app/GatedLayout';
import SimpleForm from '@/components/SimpleForm';

export default function Manifesto() {
  return (
    <GatedLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>The Wealth Shift Manifesto</h1>
          <p className="text-xl font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Our core values and principles that guide our community and journey.
          </p>
        </div>
        
        <div className="bg-background/20 backdrop-blur-sm rounded-lg shadow-lg p-8 mb-12 border border-accent/30">
          <div className="prose prose-lg max-w-none">
            <h2 style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Our Beliefs</h2>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              At The Wealth Shift, we believe that true wealth extends beyond financial abundance. 
              It encompasses <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>holistic well-being</span>, meaningful relationships, and purposeful living.
            </p>
            
            <h3 style={{ color: 'var(--subheading)' }}>1. Intentional Growth</h3>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              We believe in the power of <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>intentional growth</span> and continuous learning. 
              Every challenge is an opportunity for expansion, and every setback contains a lesson.
              We commit to embracing both comfort and discomfort as teachers on our journey.
            </p>
            
            <h3 style={{ color: 'var(--subheading)' }}>2. Community Support</h3>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              We believe that we rise by lifting others. Our community is built on <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>mutual support</span>,
              shared wisdom, and collective elevation. We commit to creating spaces where authentic
              connection can flourish and where each member feels seen, heard, and valued.
            </p>
            
            <h3 style={{ color: 'var(--subheading)' }}>3. Authentic Empowerment</h3>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              We believe in <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>empowerment</span> that comes from within. True power is not about control over others
              but mastery of self. We commit to practices that build genuine confidence, self-awareness,
              and the ability to create positive change in our lives and communities.
            </p>
            
            <h3 style={{ color: 'var(--subheading)' }}>4. Holistic Prosperity</h3>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              We believe that prosperity is multidimensional. Financial abundance is one aspect of a
              wealthy life, alongside <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>health, relationships, creativity</span>, and spiritual fulfillment.
              We commit to nurturing all dimensions of prosperity in balanced harmony.
            </p>
            
            <h3 style={{ color: 'var(--subheading)' }}>5. Ethical Impact</h3>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              We believe that how we build wealth matters as much as the wealth itself. We commit to
              creating value, solving real problems, and considering the <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>impact</span> of our actions on
              others and the planet. Our success should contribute to collective well-being.
            </p>
            
            <h2 className="mt-12" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Our Commitment</h2>
            <p className="opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              By joining The Wealth Shift community, you&apos;re committing to these principles and to your own
              growth journey. You&apos;re agreeing to show up authentically, support fellow community members,
              and embrace both the challenges and celebrations along the way.
            </p>
          </div>
        </div>
        
        <div className="bg-background/20 backdrop-blur-sm rounded-lg p-8 mb-12 border border-accent/30 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Affirm Your Commitment</h2>
          <p className="text-center mb-8 opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            To continue your journey and unlock access to our portal, please affirm your commitment
            to The Wealth Shift principles by completing the form below.
          </p>
          
          {/* Simple manifesto commitment form with redirect to unlock page */}
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
            className="bg-background/10 backdrop-blur-sm rounded-lg border border-accent/20 p-2"
          />
        </div>
      </div>
    </GatedLayout>
  );
}
