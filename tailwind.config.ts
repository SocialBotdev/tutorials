import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class", "dark"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        coral: {
          1: "#fef7f0",
          2: "#fde8d7",
          3: "#ffb588",
          4: "#ffa771",
          5: "#ff914d", // Main brand color
          6: "#f4803d",
          7: "#b56737",
          8: "#8b4513",
          9: "#6b3d20",
        },
        neutralbg: {
          1: "#ffffff",
          3: "#f6f6f6",
          5: "#ddddde",
          11: "#37363d",
        },
        accent: {
          300: "#fff4e6", // Coral-tinted neutral
          500: "#ffe4cc", // Coral-tinted neutral
          700: "#cc7a3d", // Coral-tinted brown
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "serif-display": ["DM Serif Display", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      fontSize: {
        "h1-mobile": ["45px", { lineHeight: "1.1" }],
        "h1-desktop": ["65px", { lineHeight: "1.1" }],
        "h2-mobile": ["35px", { lineHeight: "1.2" }],
        "h2-desktop": ["55px", { lineHeight: "1.2" }],
        "h3-mobile": ["25px", { lineHeight: "1.3" }],
        "h3-desktop": ["45px", { lineHeight: "1.3" }],
        "h4-mobile": ["18px", { lineHeight: "1.4" }],
        "h4-desktop": ["35px", { lineHeight: "1.4" }],
        "body-mobile": ["16px", { lineHeight: "1.6" }],
        "body-desktop": ["26px", { lineHeight: "1.6" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
