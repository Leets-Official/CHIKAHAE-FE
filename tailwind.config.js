/** @type {import('tailwindcss').Config} */
import tailwindTokens from './src/styles/tokens.tailwind.json' assert { type: 'json' };

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...tailwindTokens,
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
