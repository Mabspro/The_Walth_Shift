'use client';

import React from 'react';
import Link from 'next/link';
import VideoCard from './VideoCard';
import { motion } from 'framer-motion';

// Define the video data structure
interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: string;
}

// Sample video data - in a real implementation, this would come from an API or CMS
const sampleVideos: Video[] = [
  {
    id: '1',
    title: 'Understanding Your Money Mindset',
    description: 'Discover how your beliefs about money shape your financial decisions and learn how to shift to an abundance mindset.',
    thumbnailUrl: '/images/video-card1.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    duration: '5:24'
  },
  {
    id: '2',
    title: 'Building Wealth Through Assets',
    description: 'Learn the fundamentals of asset building and how to create passive income streams that work for you.',
    thumbnailUrl: '/images/video-card2.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    duration: '7:15'
  },
  {
    id: '3',
    title: 'Financial Freedom Roadmap',
    description: 'A step-by-step guide to creating your personalized path to financial independence and true wealth.',
    thumbnailUrl: '/images/video-card3.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual video URL
    duration: '6:42'
  }
];

const VideoSection: React.FC = () => {
  return (
    <section className="py-16 bg-rich-green relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-rich-green opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Wealth Management Videos
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Explore our free educational videos to start your wealth journey. Click on any video to watch.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {sampleVideos.map((video) => (
            <VideoCard
              key={video.id}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              videoUrl={video.videoUrl}
              duration={video.duration}
            />
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            href="/assessment" 
            className="px-8 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-flex items-center gap-2 hover:shadow-[0_0_15px_rgba(212,168,80,0.5)] hover:-translate-y-1"
          >
            Watch More Videos
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
          <p className="mt-4 text-sm" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            Take the assessment to unlock our full library of wealth-building videos and resources.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
