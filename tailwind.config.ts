import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'basic-black': '#0F0C01',
        'basic-white': '#FEFCF0',
        'brand-base': '#F2CE0D',
        'brand-10': '#FCF5CF',
        'brand-30': '#F7E16E',
        'brand-70': '#917B08',
        'brand-90': '#302903',
        'gray-medium': '#676C6F',
        'gray-medium-light': '#BFC3C4',
        'gray-light': '#E9EBED',
        'gray-super-light': '#F4F5F6',
        'alert-success': '#3BCE89',
        'alert-warning': '#FF950A',
        'alert-danger': '#E90C1B',
        'alert-info': '#2092E9'
      },
      fontSize: {
        'h1': ['68px', { lineHeight: '120%', fontWeight: '500' }],
        'h1-bold': ['68px', { lineHeight: '120%', fontWeight: '700' }],
        'h2': ['58px', { lineHeight: '120%', fontWeight: '500' }],
        'h2-bold': ['58px', { lineHeight: '120%', fontWeight: '700' }],
        'h3': ['48px', { lineHeight: '120%', fontWeight: '500' }],
        'h3-bold': ['48px', { lineHeight: '120%', fontWeight: '700' }],
        'h4': ['40px', { lineHeight: '120%', fontWeight: '500' }],
        'h4-bold': ['40px', { lineHeight: '120%', fontWeight: '700' }],
        'h5': ['32px', { lineHeight: '120%', fontWeight: '500' }],
        'h5-bold': ['32px', { lineHeight: '120%', fontWeight: '700' }],
        'h6': ['28px', { lineHeight: '120%', fontWeight: '500' }],
        'h6-regular': ['28px', { lineHeight: '120%', fontWeight: '400' }],
        'h6-bold': ['28px', { lineHeight: '120%', fontWeight: '700' }],
        'h7': ['24px', { lineHeight: '120%', fontWeight: '500' }],
        'h7-regular': ['24px', { lineHeight: '120%', fontWeight: '400' }],
        'h7-bold': ['24px', { lineHeight: '120%', fontWeight: '700' }],
        'h8': ['18px', { lineHeight: '120%', fontWeight: '500' }],
        'h8-regular': ['18px', { lineHeight: '120%', fontWeight: '400' }],
        'h8-bold': ['18px', { lineHeight: '120%', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '120%', fontWeight: '500' }],
        'body-regular': ['16px', { lineHeight: '120%', fontWeight: '400' }],
        'body-bold': ['16px', { lineHeight: '120%', fontWeight: '700' }],
        'body-sm': ['14px', { lineHeight: '120%', fontWeight: '500' }],
        'body-sm-regular': ['14px', { lineHeight: '120%', fontWeight: '400' }],
        'body-sm-bold': ['14px', { lineHeight: '120%', fontWeight: '700' }],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
} satisfies Config;
