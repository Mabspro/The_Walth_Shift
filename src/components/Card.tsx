import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  linkUrl?: string;
  linkText?: string;
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  linkUrl,
  linkText = 'Learn More',
  className = '',
  children
}) => {
  return (
    <div className={`bg-background/20 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 border border-accent/20 ${className}`}>
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--subheading)' }}>{title}</h3>
        {description && <p className="mb-4 opacity-90 leading-relaxed font-medium" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>{description}</p>}
        {children}
        {linkUrl && (
          <div className="mt-4">
            <Link 
              href={linkUrl}
              className="inline-flex items-center text-accent hover:text-highlight transition-all duration-300 hover:shadow-[0_0_10px_rgba(212,168,80,0.5)]"
            >
              {linkText}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 5l7 7-7 7" 
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
