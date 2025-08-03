'use client';

import React from 'react';
import WorkbookPage from '@/components/WorkbookPage';

export default function WorkbookDay1() {
  return (
    <WorkbookPage
      workbookId="workbook1"
      day={1}
      title="The Wealth Shift Begins in Your Mind"
      subtitle="Your Mindset, Your Family Beliefs, and the Legacy You're About to Break"
      nextDay={2}
    >
      <div className="space-y-6">
        <div className="bg-accent/10 p-6 rounded-lg border border-accent/20">
          <h2 className="text-xl font-bold mb-4">Welcome Message</h2>
          <p className="mb-4">
            Before we talk about budgets, debt, or income…
            We have to start with the only thing that controls every decision you've ever made about money:
            Your mindset.
          </p>
          <blockquote className="italic border-l-4 border-accent pl-4 py-2 mb-4">
            "Becoming is better than being." – Carol Dweck
          </blockquote>
          <p>
            In her book Mindset: The New Psychology of Success, psychologist Carol Dweck reveals a truth that changed the way the world thinks about potential:
            You're not born smart or successful.
            You become smart and successful—when you believe growth is possible.
          </p>
          <p>
            This applies to your career.
            Your relationships.
            Your personal goals.
            And especially to your finances.
          </p>
          <p>
            But your mindset didn't begin with you.
            Maybe no one sat you down and said, "Here's how to think about money."
            But you learned anyway.
            You watched. You absorbed. You copied.
            What your parents said.
            What they didn't say.
            What you saw.
            And what you silently decided from your earliest memories.
          </p>
          <p>
            Now, without even realizing it, you may be living by those same silent rules.
            But today, you get to wake up—and choose different.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Part 1: What Is a Mindset—And Why Does It Shape Your Wealth?</h2>
          <p className="mb-4">
            A mindset is the set of beliefs you hold about yourself and the world.
            It influences how you think, feel, and act especially in the face of difficulty.
            Your mindset is like your brain's operating system. It decides:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Whether you believe change is possible</li>
            <li>Whether you see mistakes as failure or feedback</li>
            <li>Whether you act from fear or from power</li>
          </ul>
          <p className="mb-4">
            Your mindset doesn't just affect your confidence.
            It directly shapes your relationship with money.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">The Two Mindsets: Fixed vs. Growth</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🔒</span>
                <h4 className="text-lg font-bold">Fixed Mindset</h4>
              </div>
              <p className="mb-3">
                A fixed mindset believes that your intelligence, abilities, or financial status are set in stone.
              </p>
              <p className="mb-3">People with a fixed mindset often think:</p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>"I'm just not good at this."</li>
                <li>"If I fail, it means I'll never get it."</li>
                <li>"Other people succeed because they're lucky or naturally smart."</li>
              </ul>
              <p className="mb-3">In money terms, a fixed mindset sounds like:</p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>"I'll always be behind."</li>
                <li>"I was never taught how to manage money—so I never will."</li>
                <li>"Wealthy people are just born that way."</li>
                <li>"I've messed up too much to fix it now."</li>
              </ul>
              <p className="font-semibold">
                Fixed mindsets lead to avoidance, shame, and staying stuck.
                You don't try—because you believe your financial story is already written.
              </p>
            </div>
            
            <div className="bg-accent/10 p-6 rounded-lg">
              <div className="flex items-center mb-3">
                <span className="text-3xl mr-3">🔓</span>
                <h4 className="text-lg font-bold">Growth Mindset</h4>
              </div>
              <p className="mb-3">
                A growth mindset believes that with effort, learning, and persistence—you can get better at anything.
              </p>
              <p className="mb-3">People with a growth mindset say things like:</p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>"I don't understand this yet, but I will."</li>
                <li>"Setbacks teach me something valuable."</li>
                <li>"I trust the process. I can improve."</li>
              </ul>
              <p className="mb-3">In finances, this sounds like:</p>
              <ul className="list-disc pl-6 mb-3 space-y-1">
                <li>"I wasn't taught, but I'm capable of learning."</li>
                <li>"It's okay to be a beginner."</li>
                <li>"Each decision I make is a step toward wealth."</li>
                <li>"I can break the cycle and create a new legacy."</li>
              </ul>
              <p className="font-semibold">
                A growth mindset opens the door to financial peace and power.
                You stop hiding—and start healing, learning, and building wealth on purpose.
              </p>
            </div>
          </div>
          
          <div className="bg-accent/20 p-4 rounded-lg mb-6">
            <h4 className="font-bold mb-2 flex items-center">
              <span className="text-xl mr-2">💡</span>
              The Wealth Shift Principle:
            </h4>
            <p>
              Wealth doesn't begin with your income.
              Wealth begins in your mind.
              You don't need to be perfect—just willing to grow.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Part 2: What You Learned About Money (Without Even Realizing)</h2>
          <p className="mb-4">
            Your current beliefs didn't come from nowhere.
            You inherited many of them—from your parents, your culture, your environment, and even silence.
            Let's uncover the money messages you were raised with—and choose what stays and what goes.
          </p>
          
          <div className="bg-rich-green/30 p-6 rounded-lg border border-accent/30 mb-6">
            <h3 className="text-xl font-bold mb-4 text-accent">Exercise 1: What Was the Financial Atmosphere in Your Home?</h3>
            <p className="mb-2 text-soft-sage">Fill in the blanks:</p>
            <div className="space-y-4 mb-4">
              <div>
                <p className="mb-2 text-soft-sage">Growing up, money in my house felt:</p>
                <input 
                  type="text" 
                  className="w-full p-3 bg-rich-green/50 text-cream border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent placeholder-soft-sage/70"
                  placeholder="Your answer here..."
                />
              </div>
              <div>
                <p className="mb-2 text-soft-sage">My parents (or caregivers) taught me that money was:</p>
                <input 
                  type="text" 
                  className="w-full p-3 bg-rich-green/50 text-cream border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent placeholder-soft-sage/70"
                  placeholder="Your answer here..."
                />
              </div>
              <div>
                <p className="mb-2 text-soft-sage">I often heard phrases like:</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase1" className="mr-2 accent-accent" />
                    <label htmlFor="phrase1" className="text-soft-sage">"We can't afford that."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase2" className="mr-2 accent-accent" />
                    <label htmlFor="phrase2" className="text-soft-sage">"Money doesn't grow on trees."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase3" className="mr-2 accent-accent" />
                    <label htmlFor="phrase3" className="text-soft-sage">"Rich people are greedy."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase4" className="mr-2 accent-accent" />
                    <label htmlFor="phrase4" className="text-soft-sage">"You have to work hard for every dollar."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase5" className="mr-2 accent-accent" />
                    <label htmlFor="phrase5" className="text-soft-sage">"As long as the bills are paid, we're fine."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phrase6" className="mr-2 accent-accent" />
                    <label htmlFor="phrase6" className="text-soft-sage">"You better marry someone who has money."</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="phraseOther" className="mr-2 accent-accent" />
                    <label htmlFor="phraseOther" className="text-soft-sage">Other:</label>
                    <input 
                      type="text" 
                      className="ml-2 p-2 bg-rich-green/50 text-cream border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent placeholder-soft-sage/70"
                      placeholder="Type here..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-rich-green/30 p-6 rounded-lg border border-accent/30 mb-6">
            <h3 className="text-xl font-bold mb-4 text-accent">Exercise 2: What Beliefs Did You Pick Up?</h3>
            <p className="mb-4 text-soft-sage">Check any that shaped your younger self—positive or negative. Be honest, not judgmental.</p>
            
            <div className="mb-6">
              <h4 className="font-bold mb-3 flex items-center text-warm-gold">
                <span className="text-xl mr-2">🧱</span>
                Limiting Beliefs:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="limiting1" className="mr-2 accent-accent" />
                  <label htmlFor="limiting1" className="text-soft-sage">"Money is stressful and unpredictable."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting2" className="mr-2 accent-accent" />
                  <label htmlFor="limiting2" className="text-soft-sage">"People like me will never be wealthy."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting3" className="mr-2 accent-accent" />
                  <label htmlFor="limiting3" className="text-soft-sage">"Talking about money causes conflict."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting4" className="mr-2 accent-accent" />
                  <label htmlFor="limiting4" className="text-soft-sage">"I have to work 10x harder just to get ahead."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting5" className="mr-2 accent-accent" />
                  <label htmlFor="limiting5" className="text-soft-sage">"If I make more, I'll lose it anyway."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting6" className="mr-2 accent-accent" />
                  <label htmlFor="limiting6" className="text-soft-sage">"Debt is normal—everyone has it."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting7" className="mr-2 accent-accent" />
                  <label htmlFor="limiting7" className="text-soft-sage">"If I want something nice, I should feel guilty."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting8" className="mr-2 accent-accent" />
                  <label htmlFor="limiting8" className="text-soft-sage">"It's selfish to want more money."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting9" className="mr-2 accent-accent" />
                  <label htmlFor="limiting9" className="text-soft-sage">"I'm bad with money and always will be."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="limiting10" className="mr-2 accent-accent" />
                  <label htmlFor="limiting10" className="text-soft-sage">"Only people with connections or privilege succeed."</label>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-3 flex items-center text-warm-gold">
                <span className="text-xl mr-2">🌱</span>
                Empowering Beliefs:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="empowering1" className="mr-2 accent-accent" />
                  <label htmlFor="empowering1" className="text-soft-sage">"I can always figure things out."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering2" className="mr-2 accent-accent" />
                  <label htmlFor="empowering2" className="text-soft-sage">"Money can be a tool for freedom and joy."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering3" className="mr-2 accent-accent" />
                  <label htmlFor="empowering3" className="text-soft-sage">"I may not know everything, but I'm open to learning."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering4" className="mr-2 accent-accent" />
                  <label htmlFor="empowering4" className="text-soft-sage">"Saving even a little matters."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering5" className="mr-2 accent-accent" />
                  <label htmlFor="empowering5" className="text-soft-sage">"Hard work and smart choices create opportunity."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering6" className="mr-2 accent-accent" />
                  <label htmlFor="empowering6" className="text-soft-sage">"It's okay to want more—as long as I stay aligned with my values."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering7" className="mr-2 accent-accent" />
                  <label htmlFor="empowering7" className="text-soft-sage">"I deserve peace and security around money."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering8" className="mr-2 accent-accent" />
                  <label htmlFor="empowering8" className="text-soft-sage">"Wealth is something I can grow into."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering9" className="mr-2 accent-accent" />
                  <label htmlFor="empowering9" className="text-soft-sage">"I'm capable of breaking generational cycles."</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="empowering10" className="mr-2 accent-accent" />
                  <label htmlFor="empowering10" className="text-soft-sage">"I don't have to do it alone—community and knowledge are part of wealth."</label>
                </div>
              </div>
            </div>
            
            <div className="mt-4 bg-rich-green/50 p-4 rounded-lg border border-accent/20">
              <h4 className="font-bold mb-2 flex items-center text-warm-gold">
                <span className="text-xl mr-2">💡</span>
                Reflection tip:
              </h4>
              <p className="text-soft-sage">
                Which of your beliefs feel like hand-me-downs?
                Which ones do you want to keep, nurture, or pass on?
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Part 3: Rewrite the Rules – With a Growth Mindset</h2>
          
          <div className="bg-accent/10 p-6 rounded-lg border border-accent/20 mb-6">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <span className="text-2xl mr-2">💌</span>
              Note from Beryl:
            </h3>
            <p className="mb-4">
              When I did this exercise for myself, I started by writing down every old belief I had about money—no matter how small, silly, or painful it felt.
              That part came easy.
              But creating new, empowering beliefs? That was harder.
            </p>
            <p className="mb-4">
              So I asked ChatGPT to help me.
              I gave it my list of limiting beliefs—and it helped me rewrite each one into something hopeful, strong, and full of growth.
            </p>
            <p>
              The rewired beliefs became the foundation for my daily affirmations—and now, my mindset is one of my greatest assets.
              Now it's your turn.
            </p>
          </div>
          
          <div className="bg-rich-green/30 p-6 rounded-lg border border-accent/30 mb-6">
            <h3 className="text-xl font-bold mb-4 text-accent">Rewire Table – From Limiting to Empowering</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-rich-green/50">
                    <th className="border border-accent/30 p-3 text-left text-warm-gold">Old Belief</th>
                    <th className="border border-accent/30 p-3 text-left text-warm-gold">New Empowering Belief</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I'm bad with money."</td>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I'm learning every day, and that makes me powerful."</td>
                  </tr>
                  <tr>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"People like me never build wealth."</td>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I am capable of building a legacy that changes everything."</td>
                  </tr>
                  <tr>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I'm too far behind to catch up."</td>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I am starting exactly where I need to—and I'm moving forward."</td>
                  </tr>
                  <tr>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I always mess up with money."</td>
                    <td className="border border-accent/30 p-3 text-soft-sage bg-rich-green/40">"I learn from every mistake and grow stronger each time."</td>
                  </tr>
                  <tr>
                    <td className="border border-accent/30 p-3 bg-rich-green/40">
                      <input 
                        type="text" 
                        className="w-full p-2 bg-rich-green/30 text-cream border-0 focus:outline-none placeholder-soft-sage/70 rounded"
                        placeholder="Your old belief..."
                      />
                    </td>
                    <td className="border border-accent/30 p-3 bg-rich-green/40">
                      <input 
                        type="text" 
                        className="w-full p-2 bg-rich-green/30 text-cream border-0 focus:outline-none placeholder-soft-sage/70 rounded"
                        placeholder="Your new empowering belief..."
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-rich-green/50 p-4 rounded-lg border border-accent/20">
              <h4 className="font-bold mb-2 flex items-center text-warm-gold">
                <span className="text-xl mr-2">💡</span>
                Pro tip:
              </h4>
              <p className="text-soft-sage">
                If you feel stuck, ask ChatGPT:
                "Help me reframe this belief: [insert your limiting belief]."
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">My Story: The Belief That Almost Kept Me Broke</h2>
          <p className="mb-4">
            I used to believe I'd always be behind.
            At 33, as a single mom with a net worth of $2,000, I told myself:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>"I'm not good with money."</li>
            <li>"People like me don't build wealth."</li>
            <li>"It's too late to start over."</li>
          </ul>
          <p className="mb-4">
            But those weren't facts.
            They were fears—inherited from what I saw, not what I was truly capable of.
          </p>
          <p className="mb-4">
            Letting go of that belief wasn't just freeing.
            It was necessary.
          </p>
          <p>
            The moment I released the lie that I'd never catch up, I found space to create something entirely new.
            And you can too.
          </p>
        </div>

        <div className="bg-rich-green/30 p-6 rounded-lg border border-accent/30">
          <h2 className="text-xl font-bold mb-4 text-accent">Day 1 Reflection Prompt</h2>
          <p className="mb-4 text-soft-sage">
            What's one money belief I've carried that no longer serves me—and how has it shaped the way I've been living?
          </p>
          <div className="bg-rich-green/50 p-4 rounded-lg mb-4 border border-accent/20">
            <h4 className="font-bold mb-2 flex items-center text-warm-gold">
              <span className="text-xl mr-2">💡</span>
              Example from Beryl:
            </h4>
            <p className="italic text-soft-sage">
              "One of the beliefs I carried for years was: 'I'll always be behind financially.'
              That belief made me play small. It made me settle. It kept me from investing, asking questions, or believing I was capable of building something new.
              But once I realized it was just a belief not a fact. I replaced it with: 'I am capable of catching up and creating a legacy beyond anything I was handed.' That one shift changed everything."
            </p>
          </div>
          <textarea 
            className="w-full p-3 bg-rich-green/50 text-cream border border-accent/30 rounded-md focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent placeholder-soft-sage/70"
            rows={6}
            placeholder="Your reflection here..."
          ></textarea>
        </div>

        <div className="bg-accent/20 p-6 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-4">Day One Affirmation:</h2>
          <p className="text-lg italic">
            "I am not my past. I am not my parents. I am not my pain. I am becoming who I was always meant to be—wealthy, wise, and free."
          </p>
        </div>
      </div>
    </WorkbookPage>
  );
}
