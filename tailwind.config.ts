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

      /* ========================================
         COLORS
      ======================================== */
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

        brand: {
          linen: "var(--brand-linen)",
          cream: "var(--brand-cream)",
          coffee: "var(--brand-coffee)",

          terracotta: "var(--brand-terracotta)",
          "terracotta-dark": "var(--brand-terracotta-dark)",
          orange: "var(--brand-orange)",
          gold: "var(--brand-gold)",

          olive: "var(--brand-olive)",
          forest: "var(--brand-forest)",
          teal: "var(--brand-teal)",

          vichy: "var(--brand-vichy)",
        },

        /* ========================================
           THEMES (CLAVE DEL SISTEMA)
        ======================================== */
        theme: {
          light: {
            bg: "var(--theme-light-bg)",
            surface: "var(--theme-light-surface)",
            text: "var(--theme-light-text)",
            muted: "var(--theme-light-muted)",
          },
          dark: {
            bg: "var(--theme-dark-bg)",
            surface: "var(--theme-dark-surface)",
            text: "var(--theme-dark-text)",
            muted: "var(--theme-dark-muted)",
          },
          green: {
            bg: "var(--theme-green-bg)",
            surface: "var(--theme-green-surface)",
            text: "var(--theme-green-text)",
            muted: "var(--theme-green-muted)",
          },
          warm: {
            bg: "var(--theme-warm-bg)",
            surface: "var(--theme-warm-surface)",
            text: "var(--theme-warm-text)",
            muted: "var(--theme-warm-muted)",
          },
        },
      },

      /* ========================================
         TYPOGRAPHY
      ======================================== */
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-outfit)", "sans-serif"],
        brand: ["var(--font-vianor)", "serif"],
        disp: ["var(--font-shrikhand)", "var(--font-playfair)", "serif"],
      },

      /* ========================================
         SHADOWS (editorial feel)
      ======================================== */
      boxShadow: {
        soft: "0 10px 30px rgba(60, 42, 33, 0.06)",
        editorial: "0 20px 60px rgba(60, 42, 33, 0.12)",
        deep: "0 30px 80px rgba(60, 42, 33, 0.18)",
      },

      borderRadius: {
        editorial: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;