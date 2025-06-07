import React from 'react';
import Link from 'next/link';

interface NavBarProps {
  isPortal?: boolean;
  isTransparent?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ isPortal = false, isTransparent = false }) => {
  return (
    <nav className={`w-full py-4 px-6 fixed top-0 left-0 z-50 transition-all duration-300 ${
      isTransparent 
        ? 'bg-transparent backdrop-blur-sm' 
        : 'bg-rich-green/90 backdrop-blur-sm'
    }`}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-3xl font-bold" style={{ color: '#D4A76A' }}>The Wealth Shift</h1>
        </Link>
        
        {isPortal ? (
          <div className="hidden md:flex space-x-8">
            <Link href="/portal" className="nav-link">Dashboard</Link>
            <Link href="/portal/workbooks" className="nav-link">Workbooks</Link>
            <Link href="/portal/challenges" className="nav-link">Challenges</Link>
            <Link href="/portal/marketplace" className="nav-link">Marketplace</Link>
            <Link href="/portal/giving" className="nav-link">Giving</Link>
            <Link href="/portal/celebration" className="nav-link">Celebration</Link>
          </div>
        ) : (
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/assessment" className="nav-link">Assessment</Link>
            <Link href="/manifesto" className="nav-link">Manifesto</Link>
          </div>
        )}
        
        <div className="md:hidden">
          <button 
            className="text-foreground focus:outline-none" 
            aria-label="Toggle menu"
            title="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu - hidden by default */}
      <div className="hidden md:hidden absolute top-full left-0 w-full bg-background shadow-md py-4 px-6">
        {isPortal ? (
          <div className="flex flex-col space-y-4">
            <Link href="/portal" className="nav-link">Dashboard</Link>
            <Link href="/portal/workbooks" className="nav-link">Workbooks</Link>
            <Link href="/portal/challenges" className="nav-link">Challenges</Link>
            <Link href="/portal/marketplace" className="nav-link">Marketplace</Link>
            <Link href="/portal/giving" className="nav-link">Giving</Link>
            <Link href="/portal/celebration" className="nav-link">Celebration</Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/assessment" className="nav-link">Assessment</Link>
            <Link href="/manifesto" className="nav-link">Manifesto</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
