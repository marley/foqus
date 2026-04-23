import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F15A22',
          coral: '#ff8e63',
          teal: {
            DEFAULT: '#2f6f64',
            dark: '#004238',
            light: '#4f7e73',
            darkest: '#0a3d36',
          },
          parchment: '#FAF7F2',
          linen: '#EDE7DC',
        },
        dark: {
          bg: '#111a18',
          card: '#1a2622',
          text: '#e8e0d5',
          muted: '#4f7e73',
        },
      },
      fontFamily: {
        mono: ['"Noto Sans Mono"', 'ui-monospace', 'monospace'],
        sans: ['Sora', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
} satisfies Config
