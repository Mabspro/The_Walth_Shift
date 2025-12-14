'use client';

import React, { useState, useEffect } from 'react';
import { getPackages, getFeaturedPackage, type Package } from '@/utils/packages';

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState<Package[]>([]);
  const [featuredPackage, setFeaturedPackage] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const [allPackages, featured] = await Promise.all([
          getPackages(),
          getFeaturedPackage()
        ]);
        setPackages(allPackages);
        setFeaturedPackage(featured);
      } catch (error) {
        console.error('Error loading packages:', error);
        // Fallback is handled in getPackages()
        const fallback = await getPackages();
        setPackages(fallback);
        setFeaturedPackage(fallback.find(pkg => pkg.isFree) || fallback[0] || null);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6">
        <div className="text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-4 bg-accent/10 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  const displayPackages = packages.length > 0 ? packages : [];
  const featured = featuredPackage || displayPackages.find(pkg => pkg.isFree) || displayPackages[0];
  const paidPackages = displayPackages.filter(pkg => !pkg.isFree);

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-deep-sage">
          Choose Your Wealth Shift Experience
        </h1>
        <p className="text-xl max-w-3xl mx-auto font-medium leading-relaxed text-sage">
          Select the package that aligns with your goals and begin your transformation journey.
        </p>
      </div>

      {/* Featured: Golden Pass (Free) */}
      {featured && (
        <div className="mb-16">
          <div className={`bg-gradient-to-r ${featured.color} rounded-lg p-8 border border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300`}>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/4 text-center">
                <div className="text-8xl mb-4">{featured.icon}</div>
                <div className="bg-accent/20 rounded-full px-4 py-2 inline-block">
                  <span className="text-2xl font-bold text-deep-sage">FREE</span>
                </div>
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold mb-2 text-deep-sage">{featured.name}</h2>
                <p className="text-lg text-sage mb-4 italic font-medium">{featured.tagline}</p>
                <p className="mb-6 leading-relaxed text-portal-text-secondary font-medium">{featured.description}</p>
                <ul className="space-y-2 mb-6">
                  {featured.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">✓</span>
                      <span className="text-sage font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={featured.stanstoreUrl}
                  className="px-8 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
                >
                  Start Your Journey →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paid Packages Grid */}
      {paidPackages.length > 0 && (
        <>
          <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">Premium Experiences</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {paidPackages.map((pkg) => (
          <div 
            key={pkg.id}
            className={`bg-gradient-to-br ${pkg.color} rounded-lg p-8 border border-accent/30 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
              selectedPackage === pkg.id ? 'ring-2 ring-accent' : ''
            }`}
            onClick={() => setSelectedPackage(pkg.id)}
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{pkg.icon}</div>
              <h3 className="text-2xl font-bold mb-2 text-deep-sage">{pkg.name}</h3>
              <p className="text-lg text-sage italic mb-4 font-medium">{pkg.tagline}</p>
              <div className="mb-2">
                <span className="text-4xl font-bold text-deep-sage">${pkg.price}</span>
              </div>
              {pkg.paymentPlan && (
                <p className="text-sm text-portal-text-secondary font-medium">or {pkg.paymentPlan}</p>
              )}
            </div>
            
            <p className="mb-6 leading-relaxed text-portal-text-secondary text-center font-medium">{pkg.description}</p>
            
            <ul className="space-y-3 mb-8">
              {pkg.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2 mt-1 flex-shrink-0">✓</span>
                  <span className="text-sage font-medium">{feature}</span>
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
        </>
      )}

      {/* Comparison Table - Desktop */}
      <div className="hidden lg:block mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">Compare All Packages</h2>
        <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 border border-accent/30 shadow-lg overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-accent/30">
                <th className="text-left py-4 px-4 text-deep-sage">Feature</th>
                {packages.map(pkg => (
                  <th key={pkg.id} className="text-center py-4 px-4 text-deep-sage">{pkg.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">Price</td>
                {packages.map(pkg => (
                  <td key={pkg.id} className="text-center py-3 px-4 text-deep-sage font-bold">
                    {pkg.isFree ? 'FREE' : `$${pkg.price}`}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">Mini Workbooks</td>
                {packages.map(pkg => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    <span className="text-accent text-xl">✓</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">Full Workbooks (3 months)</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx > 0 ? <span className="text-accent text-xl">✓</span> : <span className="text-portal-text-muted">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">WhatsApp Pod (6 months)</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 2 ? <span className="text-accent text-xl">✓</span> : <span className="text-portal-text-muted">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">The Shifters Community Access</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 2 ? <span className="text-accent text-xl">✓</span> : <span className="text-portal-text-muted">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">Advanced Training Modules</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx >= 3 ? <span className="text-accent text-xl">✓</span> : <span className="text-portal-text-muted">-</span>}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-accent/20">
                <td className="py-3 px-4 text-sage font-medium">ChatGPT Business Tools</td>
                {packages.map((pkg, idx) => (
                  <td key={pkg.id} className="text-center py-3 px-4">
                    {idx === 4 ? <span className="text-accent text-xl">✓</span> : <span className="text-portal-text-muted">-</span>}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 mb-16 border border-accent/30">
        <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-deep-sage">How do I access my workbooks after purchase?</h3>
            <p className="text-sage font-medium leading-relaxed">
              After completing your purchase through Stanstore, you&apos;ll receive an immediate confirmation email 
              with FlipSnack links to all your workbooks, PDFs, and community access instructions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-deep-sage">Can I upgrade my package later?</h3>
            <p className="text-sage font-medium leading-relaxed">
              Absolutely! You can upgrade your package at any time. Contact our support team, and we&apos;ll 
              help you upgrade while crediting your previous purchase.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-deep-sage">What is The Shifters Community?</h3>
            <p className="text-sage font-medium leading-relaxed">
              The Shifters Community is our advanced circle for women who have completed their core workbooks 
              and WhatsApp Pod journey. It&apos;s where we explore investing, real estate, business growth, 
              and wealth protection strategies together.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-deep-sage">Do you offer refunds?</h3>
            <p className="text-sage font-medium leading-relaxed">
              We offer a 14-day satisfaction guarantee. If you&apos;re not completely satisfied with your 
              purchase, contact us within 14 days for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mb-16">
        <div className="bg-gradient-to-r from-accent/20 to-highlight/20 rounded-lg p-12 border border-accent/30">
          <h2 className="text-3xl font-bold mb-4 text-deep-sage">Ready to Begin Your Wealth Shift?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-sage font-medium">
            Every journey starts with a single step. Choose your path and transform your relationship with wealth.
          </p>
          {featured && (
            <a 
              href={featured.stanstoreUrl}
              className="px-10 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1 text-lg"
            >
              Start Free with Golden Pass
            </a>
          )}
        </div>
      </div>

      {/* Support */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4 text-deep-sage">Questions About Our Packages?</h2>
        <p className="mb-6 leading-relaxed font-medium text-sage">
          Our team is here to help you choose the right experience for your journey.
        </p>
        <a 
          href="mailto:support@thewealthshift.com" 
          className="px-6 py-3 bg-transparent border-2 border-accent hover:bg-accent/20 text-deep-sage font-semibold rounded-md transition-all duration-300 inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
