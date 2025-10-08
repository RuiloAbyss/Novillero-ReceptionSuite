// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,astro,html,md}',
  ],
  theme: {
    extend: {
      colors: {
        "crema": "#fef6e4",
        "americano": "#4b2e05",
        "galleta": "#d5a679",
        "late": "#b47b48",
        "cafe": "#2a1e14",
      },
    },
  },
  plugins: [],
};