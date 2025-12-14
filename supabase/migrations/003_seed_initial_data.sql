-- The Wealth Shift - Seed Initial Data
-- Run this after schema and RLS policies are set up

-- Insert initial packages (matching the current static packages)
INSERT INTO packages (title, description, price, currency, duration, features, is_featured, is_active, display_order) VALUES
(
  'Golden Pass',
  'Step through the golden door and begin your Wealth Shift journey. With your free Golden Pass, you''ll receive two powerful mini-workbooks, sample affirmation and lingo decks, exclusive worksheets, and one month of access to The Shift Club.',
  0.00,
  'USD',
  'lifetime',
  '["2-Day Mindset Reset Mini-Workbook", "2-Day Bonus Mini-Workbook (Debt, Investing, or Freedom)", "Mini Affirmation & Financial Lingo Deck PDFs", "1 Bonus Worksheet (Find Your Investor Type or Plan Your Retirement)", "1-Month Access to The Shift Club WhatsApp Community", "Financial Literacy Test Access"]'::jsonb,
  true,
  true,
  0
),
(
  'The Guided Shift',
  'Perfect for those starting their wealth journey. Get access to essential workbooks and resources to build a strong financial foundation.',
  199.00,
  'USD',
  'lifetime',
  '["All Golden Pass Benefits", "Core Wealth Shift Workbooks (3 months)", "Weekly Guided Prompts", "Access to Exclusive Resources", "Progress Tracking Dashboard", "Email Support"]'::jsonb,
  false,
  true,
  1
),
(
  'The Empowered Shift',
  'For those ready to deepen their journey with community support. Includes everything in The Guided Shift plus exclusive community access.',
  479.00,
  'USD',
  'lifetime',
  '["All Guided Shift Benefits", "6-Month Wealth Shifter Pod (WhatsApp Group)", "Weekly Accountability Check-ins", "Monthly Live Q&A Calls", "Celebration Threads & Milestones", "Graduate to The Shifters Community", "Priority Email Support"]'::jsonb,
  false,
  true,
  2
),
(
  'The Full Experience',
  'The ultimate transformation package. Everything you need to shift your financial story, mindset, and future.',
  997.00,
  'USD',
  'lifetime',
  '["All Empowered Shift Benefits", "Extended Workbook Access (12 months)", "Advanced Wealth Building Modules", "Guest Speaker Sessions", "Real Estate & Investment Training", "Legacy Building Workshops", "VIP Support & Coaching Sessions", "Lifetime Access to The Shifters Community"]'::jsonb,
  false,
  true,
  3
),
(
  'The Business Builder',
  'For the ambitious entrepreneur. Combines all Full Experience benefits with exclusive AI-powered business building tools and strategies.',
  1299.00,
  'USD',
  'lifetime',
  '["All Full Experience Benefits", "ChatGPT Business Building Masterclass", "AI-Powered Marketing Strategies", "Automated Systems & Workflows", "Advanced Business Templates", "One-on-One Strategy Sessions", "Exclusive Business Builder Community", "Priority VIP Support"]'::jsonb,
  false,
  true,
  4
)
ON CONFLICT DO NOTHING;

