import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

// Base colors to create the theme
const baseColors = ["gray", "red", "yellow", "green", "blue", "indigo", "purple", "pink"];

// Theme generation helper
const generateThemeObject = (colors: any, invert = false) => {
  const theme: any = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(colors[color]).forEach(([key, shade]: any) => {
      const mappedKey = invert ? 1000 - parseInt(key) : key; // Invert logic
      theme[color][key] = colors[color][mappedKey];
    });
  });
  return theme;
};

const lightTheme = generateThemeObject(colors);
const darkTheme = generateThemeObject(colors, true);

const themes = {
  light: {
    ...lightTheme,
    white: "#ffffff",
  },
  dark: {
    ...darkTheme,
    white: colors.gray["950"],
    black: colors.gray["50"],
  },
};

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
      },
    },
  },
  plugins: [createThemes(themes)],
};

export default config;
