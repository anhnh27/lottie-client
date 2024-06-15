/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      label: "rgb(75, 85, 99)",
      primary: "#556bd6",
    },
    extends: {
      fontSize: {
        "3xl": "1.875rem",
        "4xl": "2.25rem",
      },
      borderWidth: {
        thin: "0.5px",
      },
      backgroundImage: {},
      dropShadow: {
        "3xl": "0 35px 35px #556bd650",
      },
      borderColor: {
        DEFAULT: "#dee2e6",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
