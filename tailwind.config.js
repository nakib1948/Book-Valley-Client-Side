/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        deepblue: '#44318D',
      }
    },
  },
  plugins: [require("daisyui",'@tailwindcss/forms'),require('flowbite/plugin')],
  daisyui: {
    themes: ["light", "dark"],
  },
}