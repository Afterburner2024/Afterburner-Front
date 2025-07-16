/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Stack colors - Frontend
    "bg-blue-500",
    "text-white",
    "bg-green-500",
    "bg-red-600",
    "bg-yellow-400",
    "text-black",
    "bg-blue-600",
    "bg-orange-500",
    "bg-blue-400",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-black",
    "bg-green-600",
    // Stack colors - Backend
    "bg-green-700",
    "bg-gray-600",
    "bg-green-800",
    "bg-teal-600",
    "bg-red-500",
    "bg-purple-600",
    "bg-purple-700",
    "bg-cyan-600",
    "bg-orange-600",
    // Stack colors - Database
    "bg-yellow-600",
    "bg-blue-800",
    "bg-red-600",
    // Stack colors - Mobile & DevOps
    "bg-blue-400",
    "bg-orange-400",
    "bg-blue-700",
    // Stack colors - AI/ML & Tools
    "bg-orange-500",
    "bg-gray-800",
    // Status colors
    "bg-blue-600",
    "dark:bg-blue-500",
    "bg-red-600",
    "dark:bg-red-500",
    "bg-gray-600",
    "dark:bg-gray-500",
    "bg-slate-600",
    "dark:bg-slate-500",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
