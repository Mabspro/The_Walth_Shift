/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'rich-green': '#052e26',
        'background': '#052e26',
        'foreground': '#f5f5f5',
        'accent': '#d4a850',
        'highlight': '#e6c17a',
        'cream': '#f5f5f0',
      },
      backgroundImage: {
        'gradient-bg': 'linear-gradient(to bottom, #0f3f2f, #052e26)',
      },
    },
  },
  plugins: [],
}
