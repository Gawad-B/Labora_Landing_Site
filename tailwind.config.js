/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // IBM Plex per the design handoff. `arabic` is required: without it the
        // wordmark falls back to a system Naskh face and the lockup looks wrong.
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        arabic: ['"IBM Plex Sans Arabic"', '"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
