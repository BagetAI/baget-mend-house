import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#C0573E", // Terracotta
          secondary: "#333333", // Charcoal
          accent: "#D4A373", // Brass
          neutral: "#F9F7F2", // Parchment
        },
      },
      fontFamily: {
        header: ["var(--font-lora)"],
        body: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
