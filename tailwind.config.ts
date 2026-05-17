import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        "neon-cyan": "0 0 42px rgba(34, 211, 238, 0.25)",
        "neon-violet": "0 0 48px rgba(168, 85, 247, 0.25)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Arial",
          "sans-serif"
        ]
      },
      keyframes: {
        pulseLine: {
          "0%, 100%": { opacity: "0.35", transform: "scaleX(0.75)" },
          "50%": { opacity: "1", transform: "scaleX(1)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        pulseLine: "pulseLine 3s ease-in-out infinite",
        orbit: "orbit 18s linear infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.8s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
