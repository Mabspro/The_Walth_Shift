'use client';

import React, { useState, useEffect } from 'react';
import { getCommunityPosts, type CommunityPost } from '@/utils/community';

export default function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const communityPosts = await getCommunityPosts();
        setPosts(communityPosts);
      } catch (error) {
        console.error('Error loading community posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-6">
        <div className="text-center py-20">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-3/4 mx-auto mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6">
      {/* Hero Section */}
      <div className="text-center mb-16 mt-8">
        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-deep-sage">
          🌿 The Wealth Shift Community
        </h1>
        <p className="text-2xl max-w-3xl mx-auto font-medium leading-relaxed text-sage italic">
          Where connection meets purpose.
        </p>
      </div>

      {/* Opening Story */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 border border-accent/30 shadow-lg mb-8">
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            Isn't it funny how, in a world that's more connected than ever, we can still feel completely alone?
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            We scroll. We follow. We double-tap.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            But deep down, we crave something social media rarely gives — <span className="text-accent font-semibold">real connection</span>.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            I don't know about you, but I used to feel like I was shouting into a void — trying to grow, trying to learn, 
            but not really seeing or being seen.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            I wanted women I could talk to about money, life, and the quiet moments in between — women who understood 
            that growth isn't just about numbers, it's about mindset, courage, and accountability.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            My desire to build community came from that space.
          </p>
          <p className="text-lg leading-relaxed text-sage font-medium">
            From wanting to walk this journey beside women who were also rebuilding their confidence, redefining wealth, 
            and learning how to give themselves grace.
          </p>
        </div>
        <p className="text-xl text-center font-semibold text-deep-sage italic">
          That's how the Wealth Shift Community was born — as a gathering place for women who want to grow together, not just get ahead.
        </p>
      </div>

      {/* Mission */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-deep-sage">💫 Our Mission</h2>
          <p className="text-xl text-sage italic font-medium">
            To create a space where women learn, heal, and rise — together.
          </p>
        </div>
        <div className="bg-gradient-to-br from-accent/10 to-highlight/10 rounded-lg p-8 border border-accent/30">
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            This isn't about perfection or pretending to have it all figured out.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            It's about celebrating progress, learning through vulnerability, and realizing that money conversations 
            can be warm, human, and empowering.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 font-medium">
            When women gather with intention, something powerful happens.
          </p>
          <p className="text-lg leading-relaxed text-sage font-medium">
            We learn faster. We grow deeper. We hold each other accountable to becoming our best selves — not just 
            financially, but mentally, emotionally, and spiritually.
          </p>
        </div>
        <p className="text-xl text-center mt-6 font-semibold text-accent">
          That's the heartbeat of The Wealth Shift Community.
        </p>
      </div>

      {/* Wealth Shifter Pods */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-800/20 rounded-lg p-8 md:p-12 border border-accent/30 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">🌸 The Wealth Shifter Pods</h2>
            <p className="text-xl text-sage italic font-medium">Your circle for growth and accountability.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              These are small, intimate WhatsApp groups — about fifteen women per pod — where transformation happens in real time.
            </p>
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              Each pod becomes its own little world of sisterhood and support.
            </p>
            
            <div className="bg-sage/20 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-deep-sage">Inside, you'll find:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✨</span>
                  <span className="text-sage font-medium">Weekly thought-provoking prompts that stretch your mindset</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💬</span>
                  <span className="text-sage font-medium">Accountability check-ins to help you stay consistent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🎉</span>
                  <span className="text-sage font-medium">Celebration threads for every step forward</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">☕</span>
                  <span className="text-sage font-medium">Monthly live Q&A calls with me for connection and coaching</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg leading-relaxed text-sage mb-6 italic font-medium">
              I still remember joining a women's savings group years ago. It wasn't fancy — just a few of us helping 
              each other save. But I saw how powerful women become when they unite around a shared goal.
            </p>
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              That same energy inspired these pods. Only this time, we're not just saving money — we're saving dreams, 
              confidence, and consistency.
            </p>
            <p className="text-lg leading-relaxed text-sage mb-8 font-medium">
              Whether you're celebrating a debt payoff, a mindset shift, or your first investment, your pod will be 
              right there cheering you on.
            </p>
            
            <div className="text-center">
              <p className="text-portal-text-secondary mb-4 font-medium">
                If you've purchased the <span className="text-accent font-semibold">Connected</span> or{' '}
                <span className="text-accent font-semibold">Premium</span> package, your six-month pod experience is included.
              </p>
              <p className="text-portal-text-secondary mb-6 font-medium">
                If you started with the Basic package, you can join anytime once you're ready for deeper connection.
              </p>
              <a 
                href="#" // TODO: Add form link
                className="px-8 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
              >
                Join a WhatsApp Pod
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The Shifters Community */}
      <div className="mb-16">
        <div className="bg-gradient-to-r from-purple-600/20 to-purple-800/20 rounded-lg p-8 md:p-12 border border-accent/30 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-deep-sage">💎 The Shifters Community</h2>
            <p className="text-xl text-sage italic font-medium">For the woman ready to elevate.</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              After completing your core Wealth Shift workbooks and journeying through your pod, you'll graduate into 
              The Shifters Community — our advanced circle for women building long-term wealth.
            </p>
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              This is where we expand your toolkit and your mindset.
            </p>
            
            <div className="bg-deep-sage/30 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 text-deep-sage">We'll explore:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">📈</span>
                  <span className="text-sage font-medium">Investing with confidence</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">🏠</span>
                  <span className="text-sage font-medium">Real estate, business, and building assets</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💼</span>
                  <span className="text-sage font-medium">Protecting and multiplying your money</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">💬</span>
                  <span className="text-sage font-medium">Deeper money mindset and legacy building conversations</span>
                </li>
              </ul>
            </div>
            
            <p className="text-lg leading-relaxed text-sage mb-6 font-medium">
              Here, we host guest speakers, trainings, and discussions that challenge you to think bigger and live bolder.
            </p>
            <p className="text-xl text-center font-semibold text-accent mb-8">
              You can't buy your way into this community — you grow your way here.
            </p>
            <p className="text-lg leading-relaxed text-sage text-center font-medium">
              It's the next chapter of your Wealth Shift journey, where ambition meets strategy, and community meets mastery.
            </p>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center text-deep-sage">🌿 Why It Matters</h2>
        <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 border border-accent/30">
          <p className="text-lg leading-relaxed text-sage mb-4 text-center font-medium">
            Because women thrive in safe, honest spaces.
          </p>
          <p className="text-lg leading-relaxed text-sage mb-4 text-center font-medium">
            Because money isn't just about dollars — it's about freedom, options, and peace.
          </p>
          <p className="text-lg leading-relaxed text-sage text-center font-medium">
            And because every woman deserves to walk her journey surrounded by people who understand her fire.
          </p>
          <p className="text-xl text-center mt-8 font-semibold text-accent">
            This isn't just about building wealth.<br />
            It's about building women — confident, clear, and connected.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">☀️ How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6 border border-accent/30">
            <div className="text-4xl mb-3">1️⃣</div>
            <p className="text-sage font-medium">Purchase your Connected or Premium package.</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6 border border-accent/30">
            <div className="text-4xl mb-3">2️⃣</div>
            <p className="text-sage font-medium">Get placed in a WhatsApp Pod — your small accountability circle.</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6 border border-accent/30">
            <div className="text-4xl mb-3">3️⃣</div>
            <p className="text-sage font-medium">Journey for six months through weekly prompts, Q&As, and celebrations.</p>
          </div>
          <div className="bg-gradient-to-br from-accent/10 to-accent/20 rounded-lg p-6 border border-accent/30">
            <div className="text-4xl mb-3">4️⃣</div>
            <p className="text-sage font-medium">Graduate into The Shifters Community for advanced wealth-building.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">🌺 Join Us</h2>
        <div className="bg-gradient-to-r from-accent/20 to-highlight/20 rounded-lg p-8 border border-accent/30 text-center">
          <p className="text-xl leading-relaxed text-sage mb-8 font-medium">
            Come find your circle — the one where your dreams are celebrated, your goals are remembered, 
            and your growth is taken seriously.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#" // TODO: Add form link
              className="px-8 py-4 bg-accent hover:bg-highlight text-rich-green font-bold rounded-md transition-all duration-300 inline-block hover:shadow-[0_0_20px_rgba(212,168,80,0.6)] hover:-translate-y-1"
            >
              Join a Pod
            </a>
            <a 
              href="/portal/packages"
              className="px-8 py-4 bg-transparent border-2 border-accent hover:bg-accent/20 text-deep-sage font-bold rounded-md transition-all duration-300 inline-block"
            >
              Learn More About Packages
            </a>
          </div>
        </div>
      </div>

      {/* Community Updates/Posts Section */}
      {posts.length > 0 && (
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-deep-sage">📢 Community Updates</h2>
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-6 border border-accent/30 shadow-lg ${
                  post.isPinned ? 'ring-2 ring-accent' : ''
                }`}
              >
                {post.isPinned && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-accent text-sm font-semibold">📌 Pinned</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-deep-sage">{post.title}</h3>
                  {post.postType && (
                    <span className="text-xs px-3 py-1 bg-accent/20 text-accent rounded-full capitalize">
                      {post.postType}
                    </span>
                  )}
                </div>
                {post.excerpt && (
                  <p className="text-sage mb-4 leading-relaxed font-medium">{post.excerpt}</p>
                )}
                <div className="prose prose-invert max-w-none">
                  <div 
                    className="text-sage leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-accent/10 text-accent rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-accent/20">
                  <div className="text-sm text-portal-text-secondary">
                    {post.authorName && <span>By {post.authorName}</span>}
                    {post.publishedAt && (
                      <span className="ml-2">
                        • {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Note */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-gradient-to-br from-sage/10 to-deep-sage/10 rounded-lg p-8 md:p-12 border border-accent/30 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-deep-sage">✨ A Note from Me</h2>
          <div className="space-y-4 text-lg leading-relaxed text-sage font-medium">
            <p>
              I believe that when women come together with honesty, intention, and love — we rise faster, stronger, and freer.
            </p>
            <p>
              So this space is for the woman who's tired of trying to do it all alone.
            </p>
            <p>
              For the one who's ready to grow, give, and glow — with sisters by her side.
            </p>
            <p className="text-xl font-semibold text-accent text-center mt-8">
              Here's to the women shifting wealth, rewriting their stories, and reminding each other what's possible.
            </p>
            <p className="text-right text-portal-text-secondary mt-6 italic">
              — Beryl, Founder of The Wealth Shift
            </p>
          </div>
        </div>
      </div>

      {/* Support */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold mb-4 text-deep-sage">Questions About Our Community?</h2>
        <p className="mb-6 leading-relaxed font-medium text-sage max-w-2xl mx-auto">
          Our team is here to help you find your circle and connect with other women on this journey.
        </p>
        <a 
          href="mailto:support@thewealthshift.com" 
          className="px-6 py-3 bg-transparent border-2 border-accent hover:bg-accent/20 text-deep-sage font-semibold rounded-md transition-all duration-300 inline-block"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
