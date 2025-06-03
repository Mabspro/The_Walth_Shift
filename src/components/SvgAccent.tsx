import React from 'react';

interface SvgAccentProps {
  className?: string;
  color?: string;
  opacity?: number;
}

const SvgAccent: React.FC<SvgAccentProps> = ({ 
  className = '', 
  color = 'currentColor',
  opacity = 0.1
}) => {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ opacity }}>
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Stylized African-inspired pattern */}
          <path
            d="M60 10C60 10 70 30 90 30C110 30 110 10 110 10C110 10 110 50 90 70C70 90 60 90 60 90C60 90 50 90 30 70C10 50 10 10 10 10C10 10 10 30 30 30C50 30 60 10 60 10Z"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M60 20C60 20 67 35 80 35C93 35 93 20 93 20C93 20 93 50 80 63C67 76 60 76 60 76C60 76 53 76 40 63C27 50 27 20 27 20C27 20 27 35 40 35C53 35 60 20 60 20Z"
            stroke={color}
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="60" cy="60" r="5" fill={color} />
          <circle cx="60" cy="40" r="3" fill={color} />
          <circle cx="60" cy="80" r="3" fill={color} />
          <circle cx="40" cy="60" r="3" fill={color} />
          <circle cx="80" cy="60" r="3" fill={color} />
        </g>
      </svg>
    </div>
  );
};

export default SvgAccent;
