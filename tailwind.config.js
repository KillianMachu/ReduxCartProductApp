/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      fontFamily: {
        content: ["Poppins", "sans-serif"],
      },
      colors: {
        lightGrayBackground: "#f2f2f2",
        lightGray: "#F5F5F5",
        softGreen: "#E5F6DF",
      },
    },
  },
  plugins: [],
}

