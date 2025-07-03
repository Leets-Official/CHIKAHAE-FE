/** @type {import('tailwindcss').Config} */

import tokens from './src/tokens/design-tokens.json' assert { type: 'json' };

export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: tokens.colors,
            fontSize: tokens.fontSizes,
        },
    },
    plugins: [],
}