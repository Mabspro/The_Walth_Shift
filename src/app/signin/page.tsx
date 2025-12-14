'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { signIn } from '@/utils/auth';
import GatedLayout from '@/app/GatedLayout';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  useEffect(() => {
    // Check if user is coming from signup (via query param or sessionStorage)
    const verify = searchParams.get('verify');
    const emailParam = searchParams.get('email');
    
    if (verify === '1' && emailParam) {
      setShowVerifyMessage(true);
      setEmail(emailParam);
      // Clean up URL
      router.replace('/signin', { scroll: false });
    } else {
      // Check sessionStorage as fallback
      const pendingEmail = sessionStorage.getItem('pendingVerification');
      if (pendingEmail) {
        setShowVerifyMessage(true);
        setEmail(pendingEmail);
        sessionStorage.removeItem('pendingVerification');
      }
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await signIn({ email, password });

    if (result.success) {
      // Redirect to portal
      router.push('/portal');
    } else {
      const errorMessage = result.error || 'Sign in failed. Please try again.';
      setError(errorMessage);
      
      // If error is about email not confirmed, show helpful message
      if (errorMessage.toLowerCase().includes('email') || errorMessage.toLowerCase().includes('confirm')) {
        setShowVerifyMessage(true);
      }
      
      setIsLoading(false);
    }
  };

  return (
    <GatedLayout>
      <div className="max-w-md mx-auto mt-16">
        <div className="depth-card rounded-lg p-8 border border-portal-border">
          <h1 className="text-3xl font-bold mb-2 text-center text-deep-sage">Sign In</h1>
          <p className="text-center mb-8 text-sage font-medium">
            Welcome back! Sign in to continue your wealth journey.
          </p>

          {showVerifyMessage && (
            <div className="mb-6 p-6 bg-accent/10 border-2 border-accent rounded-lg">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📧</div>
                <div className="flex-1">
                  <h3 className="font-bold text-deep-sage mb-2">Check Your Email!</h3>
                  <p className="text-sage text-sm mb-2">
                    We've sent a confirmation email to <strong>{email}</strong>. 
                    Please click the link in that email to verify your account.
                  </p>
                  <p className="text-sage text-sm">
                    Once you've verified your email, you can sign in below to access your portal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
              {(error.includes('Email not confirmed') || error.toLowerCase().includes('email')) && (
                <p className="text-red-600 text-xs mt-2">
                  Please check your email and click the confirmation link before signing in.
                </p>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block font-semibold mb-2 text-deep-sage">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-semibold mb-2 text-deep-sage">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-portal-beige-light rounded-md border border-portal-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 text-portal-text-primary"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="/forgot-password"
                className="text-sm text-sage hover:text-accent transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(212,168,80,0.6)]"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-sage">
              Don't have an account?{' '}
              <Link
                href="/assessment"
                className="text-accent hover:text-highlight font-semibold transition-colors"
              >
                Start Your Assessment →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GatedLayout>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={
      <GatedLayout>
        <div className="max-w-md mx-auto mt-16">
          <div className="depth-card rounded-lg p-8 border border-portal-border">
            <div className="animate-pulse">
              <div className="h-8 bg-accent/20 rounded w-48 mx-auto mb-4"></div>
            </div>
          </div>
        </div>
      </GatedLayout>
    }>
      <SignInContent />
    </Suspense>
  );
}
