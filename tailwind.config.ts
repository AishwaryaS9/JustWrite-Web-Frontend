import { color } from "framer-motion";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primaryColor: "#7C4EE4",
        primaryColorLight: "#977edd",
        primaryColorDark: "#8071a3",
        lavenderPurple:"#a590e2",
        dimGray:"#666666"
      },
    },
  },
  plugins: [],
} satisfies Config;
