import React from 'react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen portal-light-theme">
      <NavBar isPortal={true} />
      <main className="flex-grow pt-32 pb-12 bg-cream min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}
