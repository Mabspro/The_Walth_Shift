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
