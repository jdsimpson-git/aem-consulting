/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a192f", // Deep Navy
          800: "#112240",
        },
        gold: {
          400: "#d4af37", // Classic Gold
          500: "#c5a028",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6", // Soft Gray
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"], // Elegant font for headings
      },
    },
  },
  plugins: [],
};
