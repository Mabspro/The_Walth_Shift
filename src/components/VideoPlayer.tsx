'use client';

import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  posterImage?: string;
  autoPlay?: boolean;
  controls?: boolean;
  width?: string;
  height?: string;
  onComplete?: () => void;
  customOverlay?: React.ReactNode;
  className?: string;
  showCustomControls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  title = 'Video Player',
  posterImage,
  autoPlay = false,
  controls = true,
  width = '100%',
  height = 'auto',
  onComplete,
  customOverlay,
  className = '',
  showCustomControls = false
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showOverlay, setShowOverlay] = useState(!autoPlay);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Determine if the video is from YouTube, Vimeo, or a direct file
  const isYouTube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const isVimeo = videoUrl.includes('vimeo.com');
  
  // Function to get YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  // Function to get Vimeo video ID
  const getVimeoId = (url: string) => {
    const regExp = /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|)(\d+)(?:$|\/|\?)/;
    const match = url.match(regExp);
    return match ? match[3] : null;
  };
  
  if (isYouTube) {
    const videoId = getYouTubeId(videoUrl);
    return (
      <div className="video-container relative w-full pt-[56.25%] overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${autoPlay ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else if (isVimeo) {
    const videoId = getVimeoId(videoUrl);
    return (
      <div className="video-container relative w-full pt-[56.25%] overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://player.vimeo.com/video/${videoId}?autoplay=${autoPlay ? 1 : 0}&controls=${controls ? 1 : 0}`}
          title={title}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    // Direct video file
    
    // Handle video events
    const handleTimeUpdate = () => {
      if (videoRef.current) {
        const currentProgress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(currentProgress);
        
        // Check if video is complete (95% watched)
        if (currentProgress > 95 && onComplete) {
          onComplete();
        }
      }
    };
    
    const handleLoadedMetadata = () => {
      if (videoRef.current) {
        setDuration(videoRef.current.duration);
      }
    };
    
    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
          setShowOverlay(false);
        }
        setIsPlaying(!isPlaying);
      }
    };
    
    // Format time in MM:SS
    const formatTime = (timeInSeconds: number) => {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor(timeInSeconds % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };
    
    const currentTime = videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00';
    const totalTime = videoRef.current ? formatTime(duration) : '0:00';
    
    return (
      <div className={`video-container relative w-full rounded-lg shadow-lg overflow-hidden ${className}`}>
        {/* Custom overlay */}
        {showOverlay && customOverlay && (
          <div 
            className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm cursor-pointer"
            onClick={togglePlay}
          >
            {customOverlay}
          </div>
        )}
        
        {/* Video element */}
        <video
          ref={videoRef}
          className="w-full"
          width={width}
          height={height}
          controls={controls && !showCustomControls}
          autoPlay={autoPlay}
          poster={posterImage}
          title={title}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={showCustomControls ? togglePlay : undefined}
          style={{ cursor: showCustomControls ? 'pointer' : 'default' }}
        >
          <source src={videoUrl} type={`video/${videoUrl.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
        
        {/* Custom controls */}
        {showCustomControls && (
          <div className="absolute bottom-0 left-0 right-0 bg-background/70 backdrop-blur-sm p-2 transition-opacity duration-300 opacity-0 hover:opacity-100">
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePlay}
                className="text-accent hover:text-highlight transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>
              
              <div className="flex-1 relative h-2 bg-foreground/20 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-accent rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-foreground/80">
                {currentTime} / {totalTime}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default VideoPlayer;
