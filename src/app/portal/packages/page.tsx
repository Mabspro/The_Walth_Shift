'use client';

import React, { useState } from 'react';

interface Package {
  id: string;
  name: string;
  price: number;
  paymentPlan?: string;
  tagline: string;
  description: string;
  features: string[];
  color: string;
  icon: string;
  stanstoreUrl: string;
  isFree?: boolean;
}

const packages: Package[] = [
  {
    id: 'golden-pass',
    name: 'Golden Pass',
    price: 0,
    tagline: 'Your first step into The Wealth Shift',
    description: 'Step through the golden door and begin your Wealth Shift journey. With your free Golden Pass, you\'ll receive two powerful mini-workbooks, sample affirmation and lingo decks, exclusive worksheets, and one month of access to The Shift Club.',
    features: [
      '2-Day Mindset Reset Mini-Workbook',
      '2-Day Bonus Mini-Workbook (Debt, Investing, or Freedom)',
      'Mini Affirmation & Financial Lingo Deck PDFs',
      '1 Bonus Worksheet (Find Your Investor Type or Plan Your Retirement)',
      '1-Month Access to The Shift Club WhatsApp Community',
      'Financial Literacy Test Access'
    ],
    color: 'from-yellow-600/20 to-yellow-800/20',
    icon: '🚪',
    stanstoreUrl: '#', // TODO: Add actual Stanstore URL
    isFree: true
  },
  {
    id: 'guided-shift',
    name: 'The Guided Shift',
    price: 199,
    paymentPlan: '3 payments of $66',
    tagline: 'Begin your transformation with guided support',
    description: 'Perfect for those starting their wealth journey. Get access to essential workbooks and resources to build a strong financial foundation.',
    features: [
      'All Golden Pass Benefits',
      'Core Wealth Shift Workbooks (3 months)',
      'Weekly Guided Prompts',
      'Access to Exclusive Resources',
      'Progress Tracking Dashboard',
      'Email Support'
    ],
    color: 'from-emerald-600/20 to-emerald-800/20',
    icon: '🌱',
    stanstoreUrl: '#' // TODO: Add actual Stanstore URL
  },
  {
    id: 'empowered-shift',
    name: 'The Empowered Shift',
    price: 479,
    paymentPlan: '3 payments of $160',
    tagline: 'Connect, grow, and transform together',
    description: 'For those ready to deepen their journey with community support. Includes everything in The Guided Shift plus exclusive community access.',
    features: [
      'All Guided Shift Benefits',
      '6-Month Wealth Shifter Pod (WhatsApp Group)',
      'Weekly Accountability Check-ins',
      'Monthly Live Q&A Calls',
      'Celebration Threads & Milestones',
      'Graduate to The Shifters Community',
      'Priority Email Support'
    ],
    color: 'from-blue-600/20 to-blue-800/20',
    icon: '💎',
    stanstoreUrl: '#' // TODO: Add actual Stanstore URL
  },
  {
    id: 'full-experience',
    name: 'The Full Experience',
    price: 997,
    paymentPlan: '3 payments of $332',
    tagline: 'The complete wealth transformation journey',
    description: 'The ultimate transformation package. Everything you need to shift your financial story, mindset, and future.',
    features: [
      'All Empowered Shift Benefits',
      'Extended Workbook Access (12 months)',
      'Advanced Wealth Building Modules',
      'Guest Speaker Sessions',
      'Real Estate & Investment Training',
      'Legacy Building Workshops',
      'VIP Support & Coaching Sessions',
      'Lifetime Access to The Shifters Community'
    ],
    color: 'from-purple-600/20 to-purple-800/20',
    icon: '👑',
    stanstoreUrl: '#' // TODO: Add actual Stanstore URL
  },
  {
    id: 'business-builder',
    name: 'The Business Builder',
    price: 1299,
    paymentPlan: '3 payments of $433',
    tagline: 'ChatGPT Edition - Build your empire with AI',
    description: 'For the ambitious entrepreneur. Combines all Full Experience benefits with exclusive AI-powered business building tools and strategies.',
    features: [
      'All Full Experience Benefits',
      'ChatGPT Business Building Masterclass',
      'AI-Powered Marketing Strategies',
      'Automated Systems & Workflows',
      'Advanced Business Templates',
      'One-on-One Strategy Sessions',
      'Exclusive Business Builder Community',
      'Priority VIP Support'
    ],
    color: 'from-indigo-600/20 to-indigo-800/20',
    icon: '🚀',
    stanstoreUrl: '#' // TODO: Add actual Stanstore URL
  }
];

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-cream">
          Choose Your Wealth Shift Experience
        </h1>
        <p className="text-xl max-w-3xl mx-auto font-medium leading-relaxed text-cream/80">
          Select the package that aligns with your goals and begin your transformation journey.
        </p>
      </div>

      {/* Featured: Golden Pass (Free) */}
      <div className="mb-16">
        <div className={`bg-gradient-to-r ${packages[0].color} rounded-lg p-8 border border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/4 text-center">
              <div className="text-8xl mb-4">{packages[0].icon}</div>
              <div className="bg-accent/20 rounded-full px-4 py-2 inline-block">
                <span className="text-2xl font-bold text-cream">FREE</span>
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold mb-2 text-cream">{packages[0].name}</h2>
              <p className="text-lg text-cream/90 mb-4 italic">{packages[0].tagline}</p>
              <p className="mb-6 leading-relaxed text-cream/80">{packages[0].description}</p>
              <ul className="space-y-2 mb-6">
                {packages[0].features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-accent mr-2 mt-1">✓</span>
                    <span className="text-cream/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={packages[0].stanstoreUrl}
                className="px-8 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
              >
                Start Your Journey →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Paid Packages Grid */}
      <h2 className="text-3xl font-bold mb-8 text-center text-cream">Premium Experiences</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {packages.slice(1).map((pkg) => (
          <div 
            key={pkg.id}
            className={`bg-gradient-to-br ${pkg.color} rounded-lg p-8 border border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              selectedPackage === pkg.id ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{pkg.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-cream">{pkg.name}</h3>
              <p className="text-lg text-cream/90 italic mb-4">{pkg.tagline}</p>
              <div className="mb-2">
                <span className="text-4xl font-bold text-cream">${pkg.price}</span>
              </div>
              {pkg.paymentPlan && (
                <p className="text-sm text-cream/70">or {pkg.paymentPlan}</p>
              )}
            </div>
            
            <p className="mb-6 leading-relaxed text-cream/80 text-center">{pkg.description}</p>
            
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2 mt-1 flex-shrink-0">✓</span>
                  <span className="text-cream/90">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="text-center">
              <a 
                href={pkg.stanstoreUrl}
                className="px-8 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1 w-full"
              >
                Choose {pkg.name}
              </a>
              
              {(pkg.id === 'empowered-shift' || pkg.id === 'full-experience') && (
                <button
                  className="mt-3 text-sm text-accent hover:text-highlight underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    // TODO: Open community modal
                  }}
                >
                  Learn more about community benefits →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table - Desktop */}
      <div className="hidden lg:block mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-cream">Compare All Packages</h2>
        <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 border border-accent/30 shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-accent/30">
                <th className="text-left py-4 px-4 text-cream">Feature</th>
                {packages.map(pkg => (
                  <th key={pkg.id} className="text-center py-4 px-4 text-cream">{pkg.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">Price</td>
                {packages.map(pkg => (
                  <td key={pkg.id} className="text-center py-3 px-4 text-cream font-bold">
                    {pkg.isFree ? 'FREE' : `$${pkg.price}`}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">Mini Workbooks</td>
                {packages.map(pkg => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    <span className="text-accent text-xl">✓</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">Full Workbooks (3 months)</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx > 0 ? <span className="text-accent text-xl">✓</span> : <span className="text-cream/30">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">WhatsApp Pod (6 months)</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 2 ? <span className="text-accent text-xl">✓</span> : <span className="text-cream/30">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">The Shifters Community Access</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 2 ? <span className="text-accent text-xl">✓</span> : <span className="text-cream/30">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">Advanced Training Modules</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 3 ? <span className="text-accent text-xl">✓</span> : <span className="text-cream/30">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-cream/80">ChatGPT Business Tools</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx === 4 ? <span className="text-accent text-xl">✓</span> : <span className="text-cream/30">-</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 mb-16 border border-accent/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-cream">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cream">How do I access my workbooks after purchase?</h3>
            <p className="text-cream/80">
              After completing your purchase through Stanstore, you&apos;ll receive an immediate confirmation email 
              with FlipSnack links to all your workbooks, PDFs, and community access instructions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cream">Can I upgrade my package later?</h3>
            <p className="text-cream/80">
              Absolutely! You can upgrade your package at any time. Contact our support team, and we&apos;ll 
              help you upgrade while crediting your previous purchase.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cream">What is The Shifters Community?</h3>
            <p className="text-cream/80">
              The Shifters Community is our advanced circle for women who have completed their core workbooks 
              and WhatsApp Pod journey. It&apos;s where we explore investing, real estate, business growth, 
              and wealth protection strategies together.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-cream">Do you offer refunds?</h3>
            <p className="text-cream/80">
              We offer a 14-day satisfaction guarantee. If you&apos;re not completely satisfied with your 
              purchase, contact us within 14 days for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <div className="bg-gradient-to-r from-accent/20 to-highlight/20 rounded-lg p-12 border border-accent/30">
          <h2 className="text-3xl font-bold mb-4 text-cream">Ready to Begin Your Wealth Shift?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-cream/90">
            Every journey starts with a single step. Choose your path and transform your relationship with wealth.
          </p>
          <a 
            href={packages[0].stanstoreUrl}
            className="px-10 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1 text-lg"
          >
            Start Free with Golden Pass
          </a>
        </div>
      </div>

      {/* Support */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4 text-cream">Questions About Our Packages?</h2>
        <p className="mb-6 leading-relaxed font-medium text-cream/80">
          Our team is here to help you choose the right experience for your journey.
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
