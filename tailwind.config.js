/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E67843",
      },
      screens: {
        "3xl": "2560px",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};
