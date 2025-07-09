/** @type {import('tailwindcss').Config} */
import tailwindTokens from './src/styles/tokens.tailwind.json' assert { type: 'json' };

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      ...tailwindTokens,
      fontFamily: {
        nanum: ['"NanumSquareRound"', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
