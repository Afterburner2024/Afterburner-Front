/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Stack colors - Frontend Frameworks & Libraries
    "bg-blue-500",
    "text-white",
    "bg-green-500",
    "bg-red-600",
    "bg-orange-500",
    "bg-orange-600",
    "bg-blue-600",
    "bg-purple-500",
    "bg-teal-500",
    "bg-blue-400",
    "bg-indigo-500",

    // Frontend Languages & Core
    "bg-yellow-400",
    "text-black",
    "bg-purple-600",
    "bg-pink-500",
    "bg-blue-700",
    "bg-green-600",

    // CSS Frameworks & Tools
    "bg-cyan-500",
    "bg-purple-700",
    "bg-teal-400",
    "bg-pink-400",

    // Meta Frameworks
    "bg-black",
    "bg-gray-700",
    "bg-brown-500",

    // Backend Languages
    "bg-green-700",
    "bg-red-500",
    "bg-cyan-600",
    "bg-red-700",
    "bg-blue-800",
    "bg-gray-800",

    // Backend Frameworks
    "bg-gray-600",
    "bg-gray-500",
    "bg-green-800",
    "bg-teal-600",
    "bg-cyan-500",

    // Databases
    "bg-blue-800",
    "bg-red-600",
    "bg-blue-600",
    "bg-orange-600",

    // Cloud & BaaS
    "bg-yellow-600",
    "bg-orange-400",
    "bg-teal-500",

    // Mobile Development
    "bg-gray-600",

    // DevOps & Infrastructure
    "bg-yellow-600",

    // AI/ML & Data Science
    "bg-red-600",
    "bg-orange-600",
    "bg-yellow-500",
    "bg-green-700",

    // Game Development
    "bg-gray-800",

    // Blockchain & Web3
    "bg-brown-600",

    // Testing
    "bg-green-600",

    // Tools & Platforms
    "bg-orange-600",
    "bg-blue-500",

    // Design & UI/UX
    "bg-pink-500",

    // CMS & E-commerce
    "bg-blue-700",

    // Real-time & Communication
    "bg-pink-500",

    // State Management
    "bg-brown-600",
    "bg-teal-600",

    // Monitoring & Analytics
    "bg-purple-700",
    "bg-blue-700",

    // Others
    "bg-yellow-500",

    // Status colors
    "bg-blue-500",
    "bg-red-600",
    "bg-gray-500",
    "text-blue-600",
    "text-red-600",
    "text-gray-600",

    // Type badges
    "bg-blue-100",
    "dark:bg-blue-900/30",
    "text-blue-600",
    "dark:text-blue-400",
    "bg-green-100",
    "dark:bg-green-900/30",
    "text-green-600",
    "dark:text-green-400",
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
