import React from 'react';
import Card from '@/components/Card';

export default function Marketplace() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">Marketplace</h1>
        <p className="text-xl max-w-3xl mx-auto text-gray-600">
          Discover curated resources and offerings to support your wealth journey.
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-8 mb-12 border border-accent/20 shadow-lg">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Featured Resource</h2>
            <h3 className="text-xl font-semibold mb-2">Wealth Mindset Masterclass</h3>
            <p className="mb-4">
              This comprehensive masterclass takes you through the core principles of developing a wealth mindset.
              Learn from experts in psychology, finance, and personal development as they share practical strategies
              for transforming your relationship with money and abundance.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-1">
              <li>6 in-depth video modules</li>
              <li>Downloadable workbook</li>
              <li>Expert interviews</li>
              <li>Lifetime access</li>
            </ul>
          </div>
          <div className="md:w-1/3 bg-gray-50 rounded-lg p-6 shadow-md">
            <h4 className="font-bold mb-2">Special Offer</h4>
            <p className="mb-1 text-sm">Regular price: $197</p>
            <p className="mb-4 text-xl font-bold text-accent">Member price: $97</p>
            <a 
              href="#" 
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Digital Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Wealth Mindset Masterclass"
          description="Transform your relationship with money through this comprehensive video course."
          linkUrl="#"
          linkText="$97"
        />
        <Card
          title="Financial Freedom Planner"
          description="A digital planner designed to help you track your financial goals and progress."
          linkUrl="#"
          linkText="$37"
        />
        <Card
          title="Abundance Meditation Bundle"
          description="A collection of guided meditations focused on wealth and abundance."
          linkUrl="#"
          linkText="$27"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Books & Guides</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="The Wealth Shift: A Guidebook"
          description="The official guidebook to navigating your wealth journey with intention and purpose."
          linkUrl="#"
          linkText="$19.99"
        />
        <Card
          title="Mindful Money Management"
          description="A practical guide to managing your finances with mindfulness and intention."
          linkUrl="#"
          linkText="$15.99"
        />
        <Card
          title="Abundance Affirmations Journal"
          description="A guided journal filled with prompts and affirmations for cultivating abundance."
          linkUrl="#"
          linkText="$24.99"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="1:1 Wealth Coaching"
          description="Personalized coaching sessions to help you navigate your unique wealth journey."
          linkUrl="#"
          linkText="Starting at $150/session"
        />
        <Card
          title="Financial Strategy Session"
          description="A focused session to develop a clear financial strategy aligned with your goals."
          linkUrl="#"
          linkText="$97/session"
        />
        <Card
          title="Abundance Mindset Workshop"
          description="A live virtual workshop focused on cultivating an abundance mindset."
          linkUrl="#"
          linkText="$47"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-16 border border-accent/20">
        <h2 className="text-2xl font-bold mb-4">Our Curation Process</h2>
        <p className="mb-6">
          Every resource in our marketplace is carefully curated to ensure it aligns with our core values and provides
          genuine value to our community. Here&apos;s how we select the offerings:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quality</h3>
            <p>
              We personally review each resource to ensure it meets our high standards for quality and effectiveness.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Alignment</h3>
            <p>
              We select resources that align with our holistic approach to wealth and support your overall journey.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Value</h3>
            <p>
              We negotiate special pricing for our community to ensure you receive exceptional value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
