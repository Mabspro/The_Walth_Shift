'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GatedLayout from '@/app/GatedLayout';
import VideoPlayer from '@/components/VideoPlayer';
import Link from 'next/link';
import { getCurrentUser } from '@/utils/auth';

export default function Unlock() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser();
      
      if (!user) {
        // Check if user has pending email verification
        const pendingEmail = sessionStorage.getItem('pendingVerification');
        if (pendingEmail) {
          sessionStorage.removeItem('pendingVerification');
          router.replace(`/signin?verify=1&email=${encodeURIComponent(pendingEmail)}`);
          return;
        }
        
        // Not authenticated - redirect to signin
        router.replace('/signin?redirect=/unlock');
        return;
      }

      setIsAuthenticated(true);
      setIsCheckingAuth(false);
    }

    checkAuth();
  }, [router]);

  if (isCheckingAuth) {
    return (
      <GatedLayout showFooter={false}>
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
          </div>
        </div>
      </GatedLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  return (
    <GatedLayout showFooter={false}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-portal-text-primary">Welcome to The Wealth Shift</h1>
          <p className="text-xl font-medium leading-relaxed text-portal-text-secondary">
            Congratulations on completing your assessment and affirming our manifesto.
            You&apos;re now ready to begin your wealth journey with us.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-portal-text-primary">Watch Your Welcome Message</h2>
          
          {/* Sample video for demonstration - replace with actual welcome video */}
          <VideoPlayer 
            videoUrl="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
            title="Welcome to The Wealth Shift"
            autoPlay={false}
            controls={false}
            showCustomControls={true}
            posterImage="/images/wealth.png"
            className=""
            onComplete={() => {
              // Show a success message or highlight the portal button when video is complete
              document.getElementById('portal-button')?.classList.add('animate-pulse', 'shadow-[0_0_20px_rgba(212,168,80,0.7)]');
            }}
            customOverlay={
              <div className="text-center p-8 bg-portal-beige-card border border-portal-border rounded-xl shadow-lg max-w-md">
                <h3 className="text-2xl font-bold mb-4 text-portal-text-primary">
                  Your Personal Welcome
                </h3>
                <p className="mb-6 leading-relaxed text-portal-text-secondary">
                  A special message to guide you through your wealth journey.
                </p>
                <button 
                  className="px-6 py-3 bg-accent hover:bg-highlight text-portal-beige font-semibold rounded-md transition-all duration-300 flex items-center gap-2 mx-auto hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Play Video
                </button>
              </div>
            }
          />
        </div>
        
        <div className="bg-portal-beige-card rounded-lg p-12 mb-12 border border-portal-border shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-portal-text-primary">Your Journey Begins Now</h2>
          <p className="text-lg mb-8 leading-relaxed text-portal-text-secondary">
            You now have access to our exclusive portal with resources, workbooks, challenges, and more.
            Take your time to explore and engage with the content that resonates with you.
          </p>
          
          <Link 
            id="portal-button"
            href="/portal" 
            className="px-8 py-4 bg-accent hover:bg-highlight text-portal-beige font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
          >
            Enter The Portal
          </Link>
        </div>
        
        <div className="max-w-2xl mx-auto bg-portal-accent-subtle rounded-lg p-8 border border-portal-border shadow-inner">
          <h3 className="text-xl font-bold mb-4 text-portal-text-primary">What to Expect Inside</h3>
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span className="leading-relaxed text-portal-text-secondary"><strong className="text-accent">Workbooks:</strong> Guided exercises to deepen your understanding and practice.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span className="leading-relaxed text-portal-text-secondary"><strong className="text-accent">Challenges:</strong> Practical activities to implement what you&apos;re learning.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span className="leading-relaxed text-portal-text-secondary"><strong className="text-accent">Marketplace:</strong> Curated resources and offerings to support your journey.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span className="leading-relaxed text-portal-text-secondary"><strong className="text-accent">Giving:</strong> Opportunities to contribute and give back to the community.</span>
            </li>
            <li className="flex items-start">
              <span className="text-accent mr-2">✦</span>
              <span className="leading-relaxed text-portal-text-secondary"><strong className="text-accent">Celebration:</strong> A space to acknowledge and celebrate your wins.</span>
            </li>
          </ul>
        </div>
      </div>
    </GatedLayout>
  );
}
