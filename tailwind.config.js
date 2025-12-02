/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: "#0a192f", // Deep Navy (Text & Contrast)
          800: "#112240",
        },
        gold: {
          400: "#EAB308", // Vibrant Gold
          500: "#CA8A04",
        },
        teal: {
          400: "#2DD4BF", // Vibrant Teal
          500: "#14B8A6",
          600: "#0D9488", // Deep Teal
        },
        cream: {
          50: "#FDFBF7", // Warm Light Background
          100: "#F5F5F4",
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
