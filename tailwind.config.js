/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        deepblue: '#44318D',
      }
    },
  },
  plugins: [require("daisyui",'@tailwindcss/forms')],
  daisyui: {
    themes: ["light", "dark"],
  },
}