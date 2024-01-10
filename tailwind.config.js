/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      courier: ["Courier New", "Courier", "monospace"],
    },
    extend: {
      colors: {
        "menu-red": "#ff6155",
        "menu-yellow": "#ffc62c",
        "menu-green": "#23ce42",
      },
    },
  },
  plugins: [],
};
