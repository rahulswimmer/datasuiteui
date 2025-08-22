/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Shape Sans", "Arial", "sans-serif"],
      },
      colors: {
        skanska: {
          blue: "#143275",
          gray: "#ECECEC",
          green: "#3ECE7B",
        },
      },
    },
  },
  plugins: [],
};
