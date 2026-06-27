import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07110f",
        graphite: "#12211f",
        mint: "#47f5b4",
        signal: "#7bdff2",
        amber: "#f8d16c",
        coral: "#ff7b6e"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 40px rgba(71, 245, 180, 0.22)"
      }
    }
  },
  plugins: []
};

export default config;
