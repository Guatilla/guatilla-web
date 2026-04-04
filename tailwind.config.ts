import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "vintage-pattern": "url('/GUATILLA-01.png')",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          linen: "var(--brand-linen)",
          coffee: "var(--brand-coffee)",
          terracotta: "var(--brand-terracotta)",
          olive: "var(--brand-olive)",
          vichy: "var(--brand-vichy)",
          cream: "var(--brand-cream)",
        },
      },
      fontFamily: {
        heading: ["var(--font-vianor)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
