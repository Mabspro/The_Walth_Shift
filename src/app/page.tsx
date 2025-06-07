'use client';

import React, { useRef } from 'react';
import Hero from '@/components/Hero';
import Card from '@/components/Card';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import SvgAccent from '@/components/SvgAccent';
import { motion } from 'framer-motion';

export default function Home() {
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);

  // Scroll to section function
  const scrollToSection = (sectionNumber: number) => {
    let targetRef;
    
    if (sectionNumber === 2 && section2Ref.current) {
      targetRef = section2Ref.current;
    } else if (sectionNumber === 3 && section3Ref.current) {
      targetRef = section3Ref.current;
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (targetRef) {
      window.scrollTo({
        top: targetRef.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <NavBar isTransparent={true} />
      
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <section className="relative">
          <Hero 
            title="✨ Welcome to Your Wealth Era"
            subtitle="The Wealth Shift is your permission slip to grow differently. One bold choice at a time."
            ctaText="Start My Shift →"
            ctaLink="/manifesto"
            secondaryCtaText="Explore More"
            secondaryCtaLink="#"
            secondaryCtaOnClick={() => scrollToSection(2)}
          />
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            onClick={() => scrollToSection(2)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-accent" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </motion.div>
        </section>
        
        {/* Section 2: The Invitation */}
        <motion.section 
          id="section2"
          ref={section2Ref}
          className="min-h-screen py-16 bg-rich-green flex items-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background image with elegant blur effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#052e26] to-[#0f3f2f]"></div>
            <div 
              className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-95"
              style={{ 
                backgroundImage: 'url("/images/the_invitation.png")',
                backgroundPosition: 'center 20%',
                filter: 'drop-shadow(0 0 10px rgba(212,168,80,0.3))'
              }}
            ></div>
            {/* Blurred edges */}
            <div className="absolute inset-0 bg-rich-green/50 backdrop-blur-[1px]" 
              style={{
                maskImage: 'radial-gradient(ellipse at center, transparent 40%, black 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, transparent 40%, black 85%)'
              }}
            ></div>
            <div className="absolute inset-0 bg-rich-green/40"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <SvgAccent className="top-10 right-10" color="#d4a850" opacity={0.15} />
            <SvgAccent className="bottom-10 left-10" color="#d4a850" opacity={0.15} />
            <motion.div 
              className="text-center mb-48 mt-24" /* Further increased margins to lower cards more */
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent elegant-text">Your Wealth Shift Starts Here</h2>
              <p className="text-xl max-w-3xl mx-auto text-cream elegant-text mb-4">
                The Wealth Shift is your permission slip to grow differently. One bold choice at a time.
              </p>
              <p className="text-lg max-w-2xl mx-auto text-emerald-200 elegant-text">
                Just three simple steps to start shifting how you live, earn, and build wealth.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                icon="✍️"
                title="Step 1: Read the Manifesto"
                description="Explore our values and see if The Wealth Shift feels like home."
                linkUrl="/manifesto"
                linkText="Why We Shift →"
                className="backdrop-blur-sm bg-background/90"
              />
              <Card
                icon="🔓"
                title="Step 2: Enter the Portal"
                description="Get access to tools, community, and resources to keep you moving forward."
                linkUrl="/unlock"
                linkText="Unlock Access →"
                className="backdrop-blur-sm bg-background/90"
              />
              <Card
                icon="🧠"
                title="Step 3: Take the Assessment"
                description="Find out where you are on your financial journey—no shame, just clarity."
                linkUrl="/portal"
                linkText="Start Now →"
                className="backdrop-blur-sm bg-background/90"
              />
            </motion.div>
            
            {/* Scroll to next section button */}
            <motion.div 
              className="flex justify-center mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button 
                onClick={() => scrollToSection(3)}
                className="px-8 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 flex items-center gap-2 hover:shadow-[0_0_15px_#d4a850] hover:-translate-y-1"
              >
                Continue Your Journey
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                  />
                </svg>
              </button>
            </motion.div>
          </div>
        </motion.section>
        
        {/* Section 3: Our Philosophy */}
        <motion.section 
          id="section3"
          ref={section3Ref}
          className="min-h-screen py-20 bg-gradient-bg text-background flex items-center relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0f3f2f] to-[#052e26]"></div>
            <div className="absolute inset-0 opacity-10" style={{ 
              backgroundImage: 'radial-gradient(var(--accent) 2px, transparent 2px)', 
              backgroundSize: '30px 30px' 
            }}></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 max-w-4xl">
            <SvgAccent className="top-10 left-10" color="#d4a850" opacity={0.15} />
            <SvgAccent className="bottom-10 right-10" color="#d4a850" opacity={0.15} />
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">✨ The Wealth Shift Is Built On</h2>
              <div className="w-20 h-1 bg-accent/30 rounded mx-auto mb-12"></div>
            </motion.div>

            <motion.div 
              className="flex flex-col md:flex-row items-stretch gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="md:w-1/2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-background/20 backdrop-blur-sm rounded-lg p-6 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">🌱</span>
                    <span className="inline-block w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent font-bold">1</span>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--subheading)' }}>Intentional Growth</h3>
                  </div>
                  <p className="text-lg font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    We build wealth from the inside out—grounded in purpose, not pressure.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-background/20 backdrop-blur-sm rounded-lg p-6 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">🤝</span>
                    <span className="inline-block w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent font-bold">2</span>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--subheading)' }}>Aligned Community</h3>
                  </div>
                  <p className="text-lg font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    This space is for women who are ready to be real—with themselves and each other. If you&apos;re seeking growth, willing to show up honestly, and craving something deeper—you&apos;re home.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.02, 
                    y: -5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className="bg-background/20 backdrop-blur-sm rounded-lg p-6 border border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">✨</span>
                    <span className="inline-block w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent font-bold">3</span>
                    <h3 className="text-xl font-semibold" style={{ color: 'var(--subheading)' }}>Transformative Approach</h3>
                  </div>
                  <p className="text-lg font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    Growth happens at the intersection of challenge and support.
                  </p>
                </motion.div>
              </div>
              
              <div className="md:w-1/2 flex">
                <motion.div 
                  className="w-full bg-background/20 backdrop-blur-sm rounded-lg border border-accent/30 shadow-lg flex flex-col justify-center p-8 relative overflow-hidden"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  {/* Animated background elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20"></div>
                  <motion.div 
                    className="absolute inset-0" 
                    animate={{ 
                      backgroundPosition: ['0% 0%', '100% 100%'],
                      opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{ 
                      duration: 20, 
                      ease: "linear", 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23d4a850\' fill-opacity=\'0.2\'%3E%3Cpath d=\'M0 0h10v10H0zm10 10h10v10H10z\'/%3E%3C/g%3E%3C/svg%3E")',
                      backgroundSize: '30px 30px'
                    }}
                  ></motion.div>
                  
                  {/* Quote content */}
                  <div className="relative z-10 text-center">
                    <div className="bg-rich-green/70 backdrop-blur-sm p-6 rounded-lg border border-accent/30 mb-6">
                      <blockquote className="text-2xl md:text-3xl italic font-bold" style={{ color: 'var(--warm-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        &ldquo;Growth happens at the intersection of challenge and support.&rdquo;
                      </blockquote>
                    </div>
                    
                    <div className="text-center">
                      <span className="inline-block w-16 h-0.5 bg-accent rounded mb-4"></span>
                      <p className="text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                        — The Wealth Shift Manifesto
                      </p>
                      
                      <div className="mt-6 bg-rich-green/70 p-4 rounded-lg border border-accent/30">
                        <p className="text-sm font-bold" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                          The Wealth Shift was born in that space—between challenge and deep support.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-24 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-1 bg-accent/30 rounded"></div>
              <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-accent/30 to-accent/50"></div>
              
              {/* Content container with glass effect */}
              <div className="bg-background/20 backdrop-blur-sm rounded-xl p-12 border border-accent/30 shadow-lg">
                <motion.div 
                  className="text-center"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>✨ Your Wealth Shift Starts With One Bold Yes.</h2>
                  <div className="w-24 h-1 bg-accent rounded mx-auto mb-8"></div>
                  <p className="text-xl max-w-3xl mx-auto mb-10 font-medium elegant-text opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Start with a simple step—and join a movement of women choosing growth, clarity, and courage.
                    <br />
                    You don&apos;t have to do this alone. We shift together.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href="/assessment" 
                      className="px-10 py-4 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.5)]"
                    >
                      Start My Shift →
                    </a>
                  </motion.div>
                  
                  <p className="mt-6 text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    500+ women have already begun. Now it&apos;s your turn.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  );
}
