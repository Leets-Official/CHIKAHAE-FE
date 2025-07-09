/** @type {import('tailwindcss').Config} */
import tailwindTokens from './src/styles/tokens.tailwind.json' assert { type: 'json' };

export default {

    },
    plugins: [
        require('tailwind-scrollbar-hide'),
    ],
}
