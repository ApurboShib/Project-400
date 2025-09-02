/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        foreground: '#1e293b',
        border: '#e5e7eb',
        muted: '#f1f5f9',
        primary: '#2563eb',
      },
    },
  },
  plugins: [],
};
