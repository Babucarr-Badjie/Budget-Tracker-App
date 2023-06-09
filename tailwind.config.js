/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: "Nunito Sans', sans-serif",
      },
      colors: {
        colorOne: "#0d9488",
        colorRed: "#FF0000",
      },
    },
  },
  plugins: [],
};
