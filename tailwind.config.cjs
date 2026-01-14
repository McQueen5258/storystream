/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#475569",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
