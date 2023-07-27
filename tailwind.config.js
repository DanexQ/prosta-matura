/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slide: {
          "0%,100%": { left: "-20%" },
          "50%": { left: "120%" },
        },
        popUp: {
          "0%": { transform: "scale(0%)" },
          "75%": { transform: "scale(110%)" },
          "100%": { transform: "scale(100%)" },
        },
        fadeInKF: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      },
      animation: {
        slideTag: "slide 1s ease-in infinite",
        slideContent: "slide 1.5s ease-in infinite",
        slideButton: "slide 1.25s ease-in infinite",
        popUpModal: "popUp 0.25s ease-out",
        fadeIn: "fadeInKF 0.25s ease-in",
      },
    },
  },
  plugins: [],
};
