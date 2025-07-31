'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
  title,
  description,
  thumbnailUrl,
  videoUrl,
  duration
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideo = () => {
    setIsOpen(true);
  };

  const closeVideo = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className="rounded-lg overflow-hidden shadow-lg border border-accent/20 bg-background/10 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
        onClick={openVideo}
      >
        <div className="relative w-full h-48">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-accent/80 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-background" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          {/* Duration badge */}
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              {duration}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--soft-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{title}</h3>
          <p className="text-sm opacity-90" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
            {description}
          </p>
        </div>
      </div>

      {/* Video Popup Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <div 
            className="relative w-full max-w-4xl bg-rich-green rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Close button - positioned at the top */}
            <div className="absolute top-4 right-4 z-50">
              <button 
                type="button"
                className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                onClick={closeVideo}
                aria-label="Close video"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div className="aspect-video relative">
              <iframe
                src={videoUrl}
                title={title}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-rich-green">
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--soft-gold)' }}>{title}</h3>
              <p className="text-sm" style={{ color: 'var(--soft-sage)' }}>{description}</p>
            </div>
            
            {/* Background overlay for closing when clicking outside */}
            <div 
              className="fixed inset-0 z-[-1]" 
              onClick={closeVideo}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoCard;
