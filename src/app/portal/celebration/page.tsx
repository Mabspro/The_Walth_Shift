import React from 'react';

export default function Celebration() {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Celebration</h1>
        <p className="text-xl max-w-3xl mx-auto">
          A space to acknowledge and celebrate your wins and milestones.
          Recognizing progress is an essential part of the wealth journey.
        </p>
      </div>
      
      <div className="bg-gradient-bg text-background rounded-lg p-8 mb-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Share Your Win</h2>
          <p className="max-w-2xl mx-auto">
            Big or small, every win deserves to be celebrated. Share your achievements with our community
            and inspire others on their journey.
          </p>
        </div>
        
        <div className="bg-background text-foreground rounded-lg p-6 shadow-md max-w-2xl mx-auto">
          <form className="space-y-4">
            <div>
              <label htmlFor="winTitle" className="form-label">What are you celebrating?</label>
              <input 
                type="text" 
                id="winTitle" 
                className="form-input" 
                placeholder="e.g., Completed my first investment, Paid off debt, etc."
              />
            </div>
            <div>
              <label htmlFor="winDescription" className="form-label">Tell us more about your win</label>
              <textarea 
                id="winDescription" 
                className="form-input min-h-[120px]" 
                placeholder="Share the details of your achievement and what it means to you..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="winCategory" className="form-label">Category</label>
              <select id="winCategory" className="form-input">
                <option value="">Select a category</option>
                <option value="financial">Financial</option>
                <option value="mindset">Mindset</option>
                <option value="personal">Personal Growth</option>
                <option value="business">Business</option>
                <option value="giving">Giving</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="text-center pt-4">
              <button 
                type="submit" 
                className="px-6 py-3 bg-accent hover:bg-highlight text-background font-semibold rounded-md transition-colors duration-300 inline-block"
              >
                Share Your Win
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">Community Celebrations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Financial Win</span>
            <h3 className="text-xl font-bold mt-1">Paid Off My Credit Card Debt!</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              After 18 months of focused effort, I&apos;ve finally paid off $12,000 in credit card debt!
              The abundance mindset practices and financial strategies I learned here were game-changers.
              I feel so much lighter and more empowered now.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Jessica R.</span>
              <span className="text-sm text-foreground/70">2 days ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Mindset Win</span>
            <h3 className="text-xl font-bold mt-1">Overcame My Scarcity Mindset</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              I realized I&apos;ve been operating from a place of scarcity my whole life. Through the
              workbooks and challenges, I&apos;ve shifted to an abundance mindset. I&apos;m now seeing opportunities
              everywhere and taking inspired action instead of holding back out of fear.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Marcus T.</span>
              <span className="text-sm text-foreground/70">1 week ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Business Win</span>
            <h3 className="text-xl font-bold mt-1">Launched My Side Business!</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              I finally took the leap and launched my coaching business! After months of preparation
              and working through my fears, I signed my first three clients this week. I&apos;m so grateful
              for the support and encouragement from this community.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Aisha J.</span>
              <span className="text-sm text-foreground/70">3 days ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Personal Growth Win</span>
            <h3 className="text-xl font-bold mt-1">Established a Daily Meditation Practice</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              I&apos;ve been trying to establish a meditation practice for years without success. The 21-Day
              Abundance Practice challenge helped me finally make it stick. I&apos;ve meditated for 30 days
              straight and feel more centered and clear than ever before.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">David L.</span>
              <span className="text-sm text-foreground/70">2 weeks ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Financial Win</span>
            <h3 className="text-xl font-bold mt-1">Started My Investment Portfolio</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              After years of putting it off due to fear and confusion, I finally opened an investment
              account and made my first investments! The Financial Clarity Blueprint workbook gave me
              the confidence and knowledge I needed to take this important step.
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Sophia C.</span>
              <span className="text-sm text-foreground/70">1 month ago</span>
            </div>
          </div>
        </div>
        
        <div className="bg-background rounded-lg shadow-md overflow-hidden">
          <div className="bg-accent/10 p-4">
            <span className="text-sm font-semibold text-accent">Giving Win</span>
            <h3 className="text-xl font-bold mt-1">Started Mentoring Young Entrepreneurs</h3>
          </div>
          <div className="p-6">
            <p className="mb-4">
              I signed up for the mentorship program and have been working with two young entrepreneurs
              for the past month. It&apos;s been incredibly rewarding to share my knowledge and see them
              grow. I&apos;m learning as much from them as they are from me!
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground/70">Robert K.</span>
              <span className="text-sm text-foreground/70">3 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-accent/10 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Milestone Celebrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-background rounded-lg p-6 shadow-md text-center">
            <div className="text-accent text-4xl font-bold mb-2">127</div>
            <h3 className="text-lg font-semibold mb-2">Community Members</h3>
            <p className="text-sm">
              Have completed the full 21-Day Abundance Practice challenge
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-md text-center">
            <div className="text-accent text-4xl font-bold mb-2">$43,750</div>
            <h3 className="text-lg font-semibold mb-2">Total Debt Paid Off</h3>
            <p className="text-sm">
              Reported by community members in the last 3 months
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 shadow-md text-center">
            <div className="text-accent text-4xl font-bold mb-2">18</div>
            <h3 className="text-lg font-semibold mb-2">New Businesses Launched</h3>
            <p className="text-sm">
              By community members since the beginning of the year
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-background rounded-lg shadow-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Why We Celebrate</h2>
        <p className="text-center max-w-3xl mx-auto mb-8">
          Celebration is a powerful practice that reinforces positive behaviors, builds confidence,
          and creates momentum on your wealth journey. Here&apos;s why we make celebration a priority:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Reinforces Growth</h3>
            <p>
              Celebrating wins reinforces the behaviors and mindsets that lead to success,
              making it more likely you&apos;ll continue those positive patterns.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Builds Community</h3>
            <p>
              Sharing our celebrations creates connection and inspiration within our community,
              reminding us that we&apos;re not alone on this journey.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Creates Momentum</h3>
            <p>
              Acknowledging progress, even small steps, creates positive momentum that
              carries you forward toward your larger goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
