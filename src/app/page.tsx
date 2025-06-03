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
            title="The Wealth Shift"
            subtitle="A journey of growth, empowerment, and community building."
            ctaText="Begin Your Journey"
            ctaLink="/assessment"
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
              {/* Title removed as it's in the background image */}
              {/* <h2 className="text-3xl md:text-4xl font-bold mb-4 text-accent">The Invitation</h2> */}
              <p className="text-xl max-w-3xl mx-auto text-cream elegant-text">
                This is not just a website—it&apos;s a journey-based conversion funnel, rooted in personal growth and values.
              </p>
              
              <p className="italic text-center text-emerald-200 mt-10 mb-6 elegant-text">
                &ldquo;Every journey begins with a shift.&rdquo;
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card
                title="Assessment"
                description="Discover where you are on your wealth journey with our personalized assessment."
                linkUrl="/assessment"
                linkText="Take Assessment"
                className="backdrop-blur-sm bg-background/90"
              />
              <Card
                title="Manifesto"
                description="Understand our core values and commit to the principles that guide our community."
                linkUrl="/manifesto"
                linkText="Read Manifesto"
                className="backdrop-blur-sm bg-background/90"
              />
              <Card
                title="Portal"
                description="Access exclusive resources, workbooks, and community features."
                linkUrl="/unlock"
                linkText="Enter Portal"
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
              className="flex flex-col md:flex-row items-center gap-12"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="md:w-1/2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-accent">Our Philosophy</h2>
                  <div className="w-20 h-1 bg-accent/30 rounded mb-8"></div>
                </motion.div>
                
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-1 h-12 bg-highlight rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center" style={{ color: 'var(--subheading)' }}>
                        <span className="inline-block w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent">1</span>
                        Intentional Growth
                      </h3>
                      <p className="text-lg mb-2 pl-9 font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        The Wealth Shift is built on the foundation of <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>intentional growth</span>, community support, and authentic empowerment.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-1 h-12 bg-highlight rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center" style={{ color: 'var(--subheading)' }}>
                        <span className="inline-block w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent">2</span>
                        Aligned Community
                      </h3>
                      <p className="text-lg mb-2 pl-9 font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        We believe in creating a space that filters for <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>aligned participants</span> who are committed to their personal journey.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex items-start"
                  >
                    <div className="flex-shrink-0 mr-4 mt-1">
                      <div className="w-1 h-12 bg-highlight rounded-full"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 flex items-center" style={{ color: 'var(--subheading)' }}>
                        <span className="inline-block w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mr-3 text-accent">3</span>
                        Transformative Approach
                      </h3>
                      <p className="text-lg mb-2 pl-9 font-medium opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        Our approach is soft-premium, clean, and <span style={{ color: 'var(--earth-tone)', fontWeight: 'bold' }}>empowering</span> - designed to guide you through meaningful transformation.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="md:w-1/2 relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-lg">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent/20 backdrop-blur-sm"></div>
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
                
                {/* Quote container with animation */}
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center p-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <div className="group bg-background/30 backdrop-blur-sm p-8 rounded-lg border border-accent/50 shadow-inner transform transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,168,80,0.7)] hover:border-accent/70 cursor-pointer">
                    <div className="bg-rich-green/70 backdrop-blur-sm p-4 rounded-lg border border-accent/30">
                      <blockquote className="text-2xl italic text-center font-bold" style={{ color: 'var(--warm-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        &ldquo;Growth happens at the intersection of challenge and support.&rdquo;
                      </blockquote>
                    </div>
                    <div className="mt-6 text-center">
                      <span className="inline-block w-16 h-0.5 bg-accent rounded"></span>
                      <p className="text-xs mt-3 italic font-medium transition-opacity duration-300 group-hover:opacity-0" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Hover to reveal more</p>
                    </div>
                    
                    {/* Author attribution that appears on hover */}
                    <div className="mt-6 overflow-hidden h-0 group-hover:h-auto transition-all duration-500 ease-in-out">
                      <p className="text-sm text-center elegant-text font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                        — The Wealth Shift Manifesto
                      </p>
                      
                      <div className="mt-4 max-w-xs mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-rich-green/70 p-3 rounded-lg border border-accent/30">
                        <p className="text-sm text-center font-bold" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                          Tap into our community of like-minded individuals who are committed to growth and transformation.
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
                  <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--soft-gold)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Ready to Begin Your Journey?</h2>
                  <div className="w-24 h-1 bg-accent rounded mx-auto mb-8"></div>
                  <p className="text-xl max-w-3xl mx-auto mb-10 font-medium elegant-text opacity-90 leading-relaxed" style={{ color: 'var(--soft-sage)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                    Take the first step by completing our assessment and joining our community of growth-minded individuals.
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a 
                      href="/assessment" 
                      className="px-10 py-4 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.5)]"
                    >
                      Begin Your Journey
                    </a>
                  </motion.div>
                  
                  <p className="mt-6 text-sm elegant-text font-medium opacity-90" style={{ color: 'var(--warm-gold)', textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                    Join over 500 individuals who have already started their wealth shift
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
