/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lavanda: {
          50: "#6B3878",
          100: "#6B3878",
          200: "#6B3878",
          300: "#6B3878",
          400: "#6B3878",
          500: "#6B3878",
          600: "#6B3878",
          700: "#6B3878",
          800: "#6B3878",
          900: "#6B3878",
        },
        crema: "#f4ece9",
        tinta: "#2d1b4e",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        script: ["'Great Vibes'", "'Cormorant Garamond'", "cursive"],
        sans: ["'Inter'", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        soft: "0 10px 40px -15px rgba(107, 56, 120, 0.25)",
      },
      backgroundImage: {
        // Fondo de la web. Para cambiar el color, toca solo este valor y `crema` de arriba.
        "watercolor": "linear-gradient(#f4ece9, #f4ece9)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        sparkle: "sparkle 2.5s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease-out both",
      },
    },
  },
  plugins: [],
};
