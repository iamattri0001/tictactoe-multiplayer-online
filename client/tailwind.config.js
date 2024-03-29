/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: {
          50: "rgb(237, 231, 253)",
          100: "rgb(219, 208, 251)",
          200: "rgb(182, 160, 248)",
          300: "rgb(146, 113, 244)",
          400: "rgb(109, 65, 241)",
          500: "rgb(73, 18, 237)",
          600: "rgb(58, 14, 190)",
          700: "rgb(44, 11, 142)",
          800: "rgb(29, 7, 95)",
          900: "rgb(15, 4, 47)",
          950: "rgb(7, 2, 24)",
        },
        background: {
          50: "rgb(235, 232, 252)",
          100: "rgb(216, 209, 250)",
          200: "rgb(177, 163, 245)",
          300: "rgb(138, 117, 240)",
          400: "rgb(99, 71, 235)",
          500: "rgb(59, 25, 230)",
          600: "rgb(48, 20, 184)",
          700: "rgb(36, 15, 138)",
          800: "rgb(24, 10, 92)",
          900: "rgb(12, 5, 46)",
          950: "rgb(6, 3, 23)",
        },
        primary: {
          50: "rgb(237, 232, 253)",
          100: "rgb(218, 208, 251)",
          200: "rgb(181, 162, 246)",
          300: "rgb(145, 115, 242)",
          400: "rgb(108, 68, 238)",
          500: "rgb(71, 22, 233)",
          600: "rgb(57, 17, 187)",
          700: "rgb(43, 13, 140)",
          800: "rgb(28, 9, 93)",
          900: "rgb(14, 4, 47)",
          950: "rgb(7, 2, 23)",
        },
        secondary: {
          50: "rgb(252, 232, 253)",
          100: "rgb(249, 208, 251)",
          200: "rgb(244, 162, 246)",
          300: "rgb(238, 115, 242)",
          400: "rgb(232, 68, 238)",
          500: "rgb(226, 22, 233)",
          600: "rgb(181, 17, 187)",
          700: "rgb(136, 13, 140)",
          800: "rgb(91, 9, 93)",
          900: "rgb(45, 4, 47)",
          950: "rgb(23, 2, 23)",
        },
        accent: {
          50: "rgb(253, 232, 246)",
          100: "rgb(251, 208, 237)",
          200: "rgb(246, 162, 220)",
          300: "rgb(242, 115, 202)",
          400: "rgb(238, 68, 184)",
          500: "rgb(233, 22, 166)",
          600: "rgb(187, 17, 133)",
          700: "rgb(140, 13, 100)",
          800: "rgb(93, 9, 67)",
          900: "rgb(47, 4, 33)",
          950: "rgb(23, 2, 17)",
        },
      },
    },
  },
  plugins: [],
};
