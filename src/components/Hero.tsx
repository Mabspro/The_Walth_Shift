import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  secondaryCtaOnClick?: () => void;
  backgroundImage?: string;
  imageAlt?: string;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaText = 'Get Started',
  ctaLink = '/assessment',
  secondaryCtaText,
  secondaryCtaLink,
  secondaryCtaOnClick,
  backgroundImage = '/images/bg_image.png',
  imageAlt = 'Hero background'
}) => {
  return (
    <div className="relative min-h-[100vh] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={imageAlt}
          fill
          priority
          style={{ objectFit: 'cover' }}
          className="brightness-[0.9]"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-rich-green/50 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl text-cream ml-0 md:ml-8 lg:ml-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cream">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl md:text-2xl mb-8 text-cream/90">
              {subtitle}
            </p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={ctaLink}
              className="px-8 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 text-center"
            >
              {ctaText}
            </Link>
            
            {secondaryCtaText && (
              secondaryCtaOnClick ? (
                <button 
                  onClick={secondaryCtaOnClick}
                  className="px-8 py-3 bg-transparent hover:bg-cream/10 border border-cream text-cream font-semibold rounded-md transition-colors duration-300 text-center"
                >
                  {secondaryCtaText}
                </button>
              ) : secondaryCtaLink && (
                <Link 
                  href={secondaryCtaLink}
                  className="px-8 py-3 bg-transparent hover:bg-cream/10 border border-cream text-cream font-semibold rounded-md transition-colors duration-300 text-center"
                >
                  {secondaryCtaText}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default Hero;
