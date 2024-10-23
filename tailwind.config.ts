import type { Config } from "tailwindcss";
import forms from '@tailwindcss/forms';
import aspectratio from '@tailwindcss/aspect-ratio';
import typography from '@tailwindcss/typography'


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)"
      }
    }
  },
  plugins: [
    forms,
    aspectratio,
    typography
  ],
};
export default config;
