'use client';

import React, { useState } from 'react';
import { subscribeEmail } from '@/utils/email-subscribers';

interface EmailSubscribeProps {
  className?: string;
  source?: string;
  title?: string;
  description?: string;
}

export default function EmailSubscribe({
  className = '',
  source = 'landing_page',
  title = 'Stay Connected',
  description = 'Get updates, insights, and exclusive content delivered to your inbox.'
}: EmailSubscribeProps) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const result = await subscribeEmail(email, fullName || undefined, source);

    if (result.success) {
      setStatus('success');
      setEmail('');
      setFullName('');
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className={`bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 border border-accent/30 shadow-lg ${className}`}>
      <h3 className="text-2xl font-bold mb-2 text-cream">{title}</h3>
      {description && (
        <p className="text-cream/80 mb-6 leading-relaxed">{description}</p>
      )}
      
      {status === 'success' ? (
        <div className="bg-accent/20 border border-accent rounded-lg p-4 text-center">
          <p className="text-cream font-semibold">✓ Thank you for subscribing!</p>
          <p className="text-cream/80 text-sm mt-1">We'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your name (optional)"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-background/40 backdrop-blur-sm rounded-md border border-accent/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-cream placeholder-cream/50"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-background/40 backdrop-blur-sm rounded-md border border-accent/30 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-cream placeholder-cream/50"
            />
          </div>
          {status === 'error' && errorMessage && (
            <p className="text-red-300 text-sm">{errorMessage}</p>
          )}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,168,80,0.6)]"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}

