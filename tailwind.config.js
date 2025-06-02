/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'af-blue': '#3B4371',
        'af-orange': '#FFA500',
        'af-bg': '#F7F8FA',
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'af': '0 4px 24px 0 rgba(59,67,113,0.08)',
      },
    },
  },
  plugins: [],
};