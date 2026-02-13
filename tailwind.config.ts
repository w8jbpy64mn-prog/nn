import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        emeraldDeep: '#0f3d2e',
        matte: '#111111',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(52,211,153,0.3), 0 18px 60px rgba(5,150,105,0.3)',
      },
    },
  },
  plugins: [],
} satisfies Config;
