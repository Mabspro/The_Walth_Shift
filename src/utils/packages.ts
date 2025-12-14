/**
 * Package utilities for fetching and managing packages from Supabase
 */

import { createClient } from '@/utils/supabase/client'
import type { Database } from '@/types/database'

type PackageRow = Database['public']['Tables']['packages']['Row']

export interface Package {
  id: string
  name: string
  price: number
  paymentPlan?: string
  tagline: string
  description: string
  features: string[]
  color: string
  icon: string
  stanstoreUrl: string
  isFree?: boolean
}

// Mapping of package titles to UI properties (colors, icons, etc.)
const packageMetadata: Record<string, { color: string; icon: string; paymentPlan?: string; stanstoreUrl: string }> = {
  'Golden Pass': {
    color: 'from-yellow-600/20 to-yellow-800/20',
    icon: '🚪',
    stanstoreUrl: '#'
  },
  'The Guided Shift': {
    color: 'from-emerald-600/20 to-emerald-800/20',
    icon: '🌱',
    paymentPlan: '3 payments of $66',
    stanstoreUrl: '#'
  },
  'The Empowered Shift': {
    color: 'from-blue-600/20 to-blue-800/20',
    icon: '💎',
    paymentPlan: '3 payments of $160',
    stanstoreUrl: '#'
  },
  'The Full Experience': {
    color: 'from-purple-600/20 to-purple-800/20',
    icon: '👑',
    paymentPlan: '3 payments of $332',
    stanstoreUrl: '#'
  },
  'The Business Builder': {
    color: 'from-indigo-600/20 to-indigo-800/20',
    icon: '🚀',
    paymentPlan: '3 payments of $433',
    stanstoreUrl: '#'
  }
}

/**
 * Transform database package to UI package format
 */
function transformPackage(dbPackage: PackageRow): Package | null {
  const metadata = packageMetadata[dbPackage.title]
  
  if (!metadata) {
    console.warn(`No metadata found for package: ${dbPackage.title}`)
    return null
  }

  // Extract tagline from description (first sentence) or use a default
  const tagline = dbPackage.description?.split('.')[0] || 'Your transformation journey'
  
  // Parse features from JSONB
  const features = Array.isArray(dbPackage.features) 
    ? dbPackage.features 
    : (dbPackage.features as unknown as string[]) || []

  return {
    id: dbPackage.id,
    name: dbPackage.title,
    price: Number(dbPackage.price),
    paymentPlan: metadata.paymentPlan,
    tagline,
    description: dbPackage.description || '',
    features: features as string[],
    color: metadata.color,
    icon: metadata.icon,
    stanstoreUrl: metadata.stanstoreUrl,
    isFree: dbPackage.price === 0
  }
}

/**
 * Fetch all active packages from Supabase
 */
export async function getPackages(): Promise<Package[]> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching packages:', error)
      return getFallbackPackages()
    }

    if (!data || data.length === 0) {
      console.warn('No packages found in database, using fallback')
      return getFallbackPackages()
    }

    const transformed = data
      .map(transformPackage)
      .filter((pkg): pkg is Package => pkg !== null)

    return transformed.length > 0 ? transformed : getFallbackPackages()
  } catch (error) {
    console.error('Error in getPackages:', error)
    return getFallbackPackages()
  }
}

/**
 * Get featured package (Golden Pass)
 */
export async function getFeaturedPackage(): Promise<Package | null> {
  try {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .eq('is_featured', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    if (error || !data) {
      console.error('Error fetching featured package:', error)
      const fallback = getFallbackPackages()
      return fallback.find(pkg => pkg.isFree) || fallback[0] || null
    }

    return transformPackage(data)
  } catch (error) {
    console.error('Error in getFeaturedPackage:', error)
    const fallback = getFallbackPackages()
    return fallback.find(pkg => pkg.isFree) || fallback[0] || null
  }
}

/**
 * Fallback packages if Supabase is unavailable
 */
function getFallbackPackages(): Package[] {
  return [
    {
      id: 'golden-pass',
      name: 'Golden Pass',
      price: 0,
      tagline: 'Your first step into The Wealth Shift',
      description: 'Step through the golden door and begin your Wealth Shift journey. With your free Golden Pass, you\'ll receive two powerful mini-workbooks, sample affirmation and lingo decks, exclusive worksheets, and one month of access to The Shift Club.',
      features: [
        '2-Day Mindset Reset Mini-Workbook',
        '2-Day Bonus Mini-Workbook (Debt, Investing, or Freedom)',
        'Mini Affirmation & Financial Lingo Deck PDFs',
        '1 Bonus Worksheet (Find Your Investor Type or Plan Your Retirement)',
        '1-Month Access to The Shift Club WhatsApp Community',
        'Financial Literacy Test Access'
      ],
      color: 'from-yellow-600/20 to-yellow-800/20',
      icon: '🚪',
      stanstoreUrl: '#',
      isFree: true
    },
    {
      id: 'guided-shift',
      name: 'The Guided Shift',
      price: 199,
      paymentPlan: '3 payments of $66',
      tagline: 'Begin your transformation with guided support',
      description: 'Perfect for those starting their wealth journey. Get access to essential workbooks and resources to build a strong financial foundation.',
      features: [
        'All Golden Pass Benefits',
        'Core Wealth Shift Workbooks (3 months)',
        'Weekly Guided Prompts',
        'Access to Exclusive Resources',
        'Progress Tracking Dashboard',
        'Email Support'
      ],
      color: 'from-emerald-600/20 to-emerald-800/20',
      icon: '🌱',
      stanstoreUrl: '#'
    },
    {
      id: 'empowered-shift',
      name: 'The Empowered Shift',
      price: 479,
      paymentPlan: '3 payments of $160',
      tagline: 'Connect, grow, and transform together',
      description: 'For those ready to deepen their journey with community support. Includes everything in The Guided Shift plus exclusive community access.',
      features: [
        'All Guided Shift Benefits',
        '6-Month Wealth Shifter Pod (WhatsApp Group)',
        'Weekly Accountability Check-ins',
        'Monthly Live Q&A Calls',
        'Celebration Threads & Milestones',
        'Graduate to The Shifters Community',
        'Priority Email Support'
      ],
      color: 'from-blue-600/20 to-blue-800/20',
      icon: '💎',
      stanstoreUrl: '#'
    },
    {
      id: 'full-experience',
      name: 'The Full Experience',
      price: 997,
      paymentPlan: '3 payments of $332',
      tagline: 'The complete wealth transformation journey',
      description: 'The ultimate transformation package. Everything you need to shift your financial story, mindset, and future.',
      features: [
        'All Empowered Shift Benefits',
        'Extended Workbook Access (12 months)',
        'Advanced Wealth Building Modules',
        'Guest Speaker Sessions',
        'Real Estate & Investment Training',
        'Legacy Building Workshops',
        'VIP Support & Coaching Sessions',
        'Lifetime Access to The Shifters Community'
      ],
      color: 'from-purple-600/20 to-purple-800/20',
      icon: '👑',
      stanstoreUrl: '#'
    },
    {
      id: 'business-builder',
      name: 'The Business Builder',
      price: 1299,
      paymentPlan: '3 payments of $433',
      tagline: 'ChatGPT Edition - Build your empire with AI',
      description: 'For the ambitious entrepreneur. Combines all Full Experience benefits with exclusive AI-powered business building tools and strategies.',
      features: [
        'All Full Experience Benefits',
        'ChatGPT Business Building Masterclass',
        'AI-Powered Marketing Strategies',
        'Automated Systems & Workflows',
        'Advanced Business Templates',
        'One-on-One Strategy Sessions',
        'Exclusive Business Builder Community',
        'Priority VIP Support'
      ],
      color: 'from-indigo-600/20 to-indigo-800/20',
      icon: '🚀',
      stanstoreUrl: '#'
    }
  ]
}

