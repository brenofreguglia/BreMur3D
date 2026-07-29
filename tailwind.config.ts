import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0c",
          50: "#f6f6f7",
          100: "#e8e8ea",
          200: "#c8c8cd",
          300: "#a1a1a8",
          400: "#71717a",
          500: "#4c4c54",
          600: "#333338",
          700: "#232327",
          800: "#18181b",
          900: "#101012",
          950: "#0a0a0c",
        },
        accent: {
          DEFAULT: "#2563eb",
          50: "#eff4ff",
          100: "#dbe6fe",
          200: "#bfd4fe",
          300: "#93b7fd",
          400: "#5f93fa",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          800: "#1e3a8a",
          900: "#1e3466",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        xs: "2px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        marquee: "marquee 24s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
