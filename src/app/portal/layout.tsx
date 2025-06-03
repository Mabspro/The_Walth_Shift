import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar isPortal={true} />
      <main className="flex-grow pt-24 pb-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
