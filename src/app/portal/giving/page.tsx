import React from 'react';
import Card from '@/components/Card';

export default function Giving() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Giving</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Find opportunities to contribute and give back to the community.
          True wealth includes the ability to make a positive impact.
        </p>
      </div>
      
      <div className="bg-gradient-bg text-background rounded-lg p-8 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Featured Initiative</h2>
            <h3 className="text-xl font-semibold mb-2">Women&apos;s Entrepreneurship Fund</h3>
            <p className="mb-4">
              Our Women&apos;s Entrepreneurship Fund provides microloans and mentorship to women entrepreneurs
              in underserved communities. By contributing to this fund, you help create economic opportunities
              and support the growth of women-led businesses.
            </p>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Current Progress</span>
                <span>$15,750 of $25,000</span>
              </div>
              <div className="w-full bg-background/20 rounded-full h-2.5">
                <div className="bg-accent h-2.5 rounded-full" style={{ width: '63%' }}></div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 bg-background text-foreground rounded-lg p-6 shadow-md">
            <h4 className="font-bold mb-2">Make a Contribution</h4>
            <p className="mb-4 text-sm">
              Every contribution, no matter the size, makes a difference in the lives of women entrepreneurs.
            </p>
            <a 
              href="#" 
              className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center mb-3"
            >
              Contribute Now
            </a>
            <a 
              href="#" 
              className="px-6 py-3 bg-transparent border border-accent text-accent hover:bg-accent/10 font-semibold rounded-md transition-colors duration-300 inline-block w-full text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Current Initiatives</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Women's Entrepreneurship Fund"
          description="Support women entrepreneurs in underserved communities through microloans and mentorship."
          linkUrl="#"
          linkText="Contribute"
        />
        <Card
          title="Financial Literacy Program"
          description="Help fund financial literacy workshops for high school students in low-income areas."
          linkUrl="#"
          linkText="Contribute"
        />
        <Card
          title="Community Garden Project"
          description="Support the development of community gardens that provide fresh produce and economic opportunities."
          linkUrl="#"
          linkText="Contribute"
        />
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Volunteer Opportunities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <Card
          title="Mentorship Program"
          description="Share your expertise by mentoring aspiring entrepreneurs in our community."
          linkUrl="#"
          linkText="Apply to Mentor"
        />
        <Card
          title="Workshop Facilitator"
          description="Lead workshops on financial literacy, entrepreneurship, or personal development."
          linkUrl="#"
          linkText="Apply to Facilitate"
        />
        <Card
          title="Community Ambassador"
          description="Represent The Wealth Shift in your community and help spread our message."
          linkUrl="#"
          linkText="Learn More"
        />
      </div>
      
      <div className="bg-accent/10 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Impact Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Maya&apos;s Story</h3>
            <p className="mb-4">
              &ldquo;With the microloan from the Women&apos;s Entrepreneurship Fund, I was able to purchase equipment
              for my catering business. Within six months, I hired two employees and doubled my revenue.
              The mentorship I received was just as valuable as the financial support.&rdquo;
            </p>
            <p className="text-sm text-foreground/70">
              Maya J., Catering Business Owner
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold mb-2">Community Garden Impact</h3>
            <p className="mb-4">
              &ldquo;The community garden project has transformed our neighborhood. Not only do we have
              access to fresh produce, but it has become a gathering place that brings people together.
              We&apos;ve seen increased community engagement and even started a weekly farmers market.&rdquo;
            </p>
            <p className="text-sm text-foreground/70">
              Sarah T., Community Garden Coordinator
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-background rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4">Our Giving Philosophy</h2>
        <p className="mb-6">
          At The Wealth Shift, we believe that true wealth includes the ability to make a positive impact
          in the world. Our giving initiatives are guided by these principles:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Empowerment</h3>
            <p>
              We focus on initiatives that empower individuals and communities to create sustainable change.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Education</h3>
            <p>
              We believe in the transformative power of education and prioritize initiatives that build knowledge and skills.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Economic Opportunity</h3>
            <p>
              We support initiatives that create economic opportunities and pathways to financial independence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
