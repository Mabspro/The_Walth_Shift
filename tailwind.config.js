/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-green': '#0F3D20',
        'deep-sage': '#2C4024',
        'sage': '#4A6741',
        'cream': '#F5F1E8',
        'earthy-gold': '#D4A76A',
        'vibrant-orange': '#E55812',
        'soft-sage': '#E6F1E9',
        'muted-sage': '#DDEAD9',
        'subheading': '#B6D1C1',
        'soft-gold': '#F6D07C',
        'warm-gold': '#F4AE53',
        'earth-tone': '#C6AF6F',
        // Portal Beige Theme
        'portal-beige': '#F5EFE7',
        'portal-beige-light': '#FAF7F2',
        'portal-beige-card': '#EEEBE5',
        'portal-text-primary': '#1A2418',
        'portal-text-secondary': '#3D4A3B',
        'portal-text-muted': '#6B7668',
        'portal-border': '#D4C9BD',
        'portal-accent-subtle': '#E8DDD0',
      },
      backgroundColor: {
        'background': '#0F3D20',
        'foreground': '#F5F1E8',
      },
      textColor: {
        'background': '#0F3D20',
        'foreground': '#F5F1E8',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(135deg, #0F3D20 0%, #4A6741 100%)',
      },
    },
  },
  plugins: [],
}
