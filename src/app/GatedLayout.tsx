import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface GatedLayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const GatedLayout: React.FC<GatedLayoutProps> = ({ 
  children,
  showFooter = true
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-portal-beige">
      <NavBar />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          {children}
        </div>
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default GatedLayout;
