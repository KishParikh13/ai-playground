/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
let colorsSafelist = ["bg-gray-600", "bg-yellow-600", "bg-purple-600", "bg-pink-600", "bg-magenta-600", "bg-red-600", "bg-orange-600", "bg-violet-600", "bg-blue-600", "bg-indigo-600", "bg-teal-600", "bg-green-600"]

// tailwind.config.js
module.exports = {
  safelist: colorsSafelist,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: [],
}