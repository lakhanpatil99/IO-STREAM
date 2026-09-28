import type { Config } from "tailwindcss";

/**
 * Kick To Tech 2.0 design tokens.
 * All brand values live here (and mirror the CSS variables in globals.css)
 * so there are no scattered magic values across the codebase.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        // Deep technology-inspired palette (evolved from the legacy #001A24 / cyan).
        ink: {
          DEFAULT: "#00131b",
          900: "#00131b",
          800: "#00212e",
          700: "#003040",
        },
        primary: {
          DEFAULT: "#0a2a3a",
          foreground: "#eaf7fb",
        },
        accent: {
          DEFAULT: "#22e3d6", // teal/cyan
          soft: "#5ff0e6",
          foreground: "#00131b",
        },
        electric: "#3b82f6",
        surface: {
          DEFAULT: "rgba(255,255,255,0.04)",
          strong: "rgba(255,255,255,0.07)",
        },
        line: "rgba(255,255,255,0.10)",
        muted: "#8aa6b1",
        // Admin console semantic tokens (see .ktt-admin in globals.css).
        // Light/dark values come from CSS variables so utilities auto-adapt.
        adm: {
          bg: "rgb(var(--adm-bg) / <alpha-value>)",
          surface: "rgb(var(--adm-surface) / <alpha-value>)",
          surface2: "rgb(var(--adm-surface2) / <alpha-value>)",
          border: "rgb(var(--adm-border) / <alpha-value>)",
          fg: "rgb(var(--adm-fg) / <alpha-value>)",
          muted: "rgb(var(--adm-muted) / <alpha-value>)",
          accent: "rgb(var(--adm-accent) / <alpha-value>)",
          "accent-fg": "rgb(var(--adm-accent-fg) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(34,227,214,0.45)",
        "glow-lg": "0 0 80px -12px rgba(34,227,214,0.5)",
        card: "0 20px 60px -25px rgba(0,0,0,0.6)",
        lift: "0 30px 80px -30px rgba(0,0,0,0.75)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s var(--ease-premium) both",
        marquee: "marquee 40s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
