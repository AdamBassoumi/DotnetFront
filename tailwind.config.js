/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Include all HTML and TypeScript files in the src folder
  ],
  theme: {
    extend: {fontFamily: {
      sans: ['Telegraf', 'sans-serif'], // Add Telegraf as the primary sans font
    },},
  },
  plugins: [],
};
