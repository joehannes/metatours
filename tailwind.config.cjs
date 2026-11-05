/**
 * Tour Cana RD VIP — clean, light, modern design system.
 *
 * A premium travel brand aesthetic: airy white space, soft charcoal ink,
 * crisp uniform radii, and subtle diffused shadows. Accent colors (lagoon,
 * sky, mango) are vibrant but used sparingly as highlights.
 *
 * The nine colour families every branch defines are all here, under the same
 * names, so the shared admin and planner code keeps resolving. Only their
 * values are this site's own.
 */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft charcoal ink — readable, not heavy.
        ink: {
          DEFAULT: '#2D3748',
          soft: '#4A5568',
          light: '#A0AEC0',
        },
        // Clean whites and near-whites for an airy feel.
        paper: {
          DEFAULT: '#FFFFFF',
          warm: '#FAFAFA',
          deep: '#F7FAFC',
          card: '#FFFFFF',
        },
        // Warm gold accent — used sparingly.
        mango: {
          light: '#FEFCBF',
          DEFAULT: '#ECC94B',
          dark: '#D69E2E',
        },
        // Coral accent for CTAs and highlights.
        hibiscus: {
          light: '#FED7D7',
          DEFAULT: '#FC8181',
          dark: '#E53E3E',
        },
        // Caribbean turquoise — the primary brand accent.
        lagoon: {
          light: '#B2F5EA',
          DEFAULT: '#38B2AC',
          dark: '#2C7A7B',
        },
        sky: {
          light: '#BEE3F8',
          DEFAULT: '#4299E1',
          dark: '#2B6CB0',
        },
        // Fresh greens for trust signals and nature cues.
        jungle: {
          light: '#C6F6D5',
          DEFAULT: '#48BB78',
          dark: '#276749',
        },
        // Warm sunset orange for secondary accents.
        sunset: {
          light: '#FEEBC8',
          DEFAULT: '#ED8936',
          dark: '#C05621',
        },
        // Soft purple for occasional highlights.
        grape: {
          light: '#E9D8FD',
          DEFAULT: '#9F7AEA',
          dark: '#6B46C1',
        },
        // Roles the admin panel is written against.
        coral: {
          deep: '#E53E3E',
        },
        sea: {
          deep: '#2C7A7B',
        },
        // Deep navy for footer and high-contrast sections.
        abyss: {
          DEFAULT: '#1A202C',
          light: '#2D3748',
        },

        tropicalGreen: '#48BB78',
        tropicalBlue: '#4299E1',
        sandyBeige: '#FAFAFA',
        sunsetOrange: '#ED8936',
        oceanWave: '#38B2AC',
      },
      // Clean, subtle borders — thin hairlines in soft gray.
      borderColor: {
        ink: {
          DEFAULT: 'rgb(45 55 72 / 0.12)',
          soft: 'rgb(45 55 72 / 0.18)',
          light: 'rgb(45 55 72 / 0.08)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        accent: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'sun-rays': 'radial-gradient(circle at 50% 50%, rgba(236,201,75,0.25) 0%, transparent 60%)',
        'sky-wash': 'linear-gradient(180deg, #EBF8FF 0%, #F7FAFC 100%)',
        'sunset-wash': 'linear-gradient(180deg, #FEEBC8 0%, #FBD38D 55%, #ED8936 100%)',
        'lagoon-wash': 'linear-gradient(180deg, #E6FFFA 0%, #B2F5EA 60%, #38B2AC 100%)',
        'jungle-wash': 'linear-gradient(180deg, #F0FFF4 0%, #C6F6D5 60%, #48BB78 100%)',
        'paper-wash': 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
        'abyss-wash': 'linear-gradient(180deg, #2D3748 0%, #1A202C 100%)',
      },
      boxShadow: {
        // Subtle, diffused shadows — no heavy drops.
        'ink-sm': '0 1px 3px 0 rgb(45 55 72 / 0.08), 0 1px 2px 0 rgb(45 55 72 / 0.04)',
        'ink': '0 4px 6px -1px rgb(45 55 72 / 0.08), 0 2px 4px -1px rgb(45 55 72 / 0.04)',
        'ink-lg': '0 10px 15px -3px rgb(45 55 72 / 0.08), 0 4px 6px -2px rgb(45 55 72 / 0.04)',
        'ink-xl': '0 20px 25px -5px rgb(45 55 72 / 0.08), 0 10px 10px -5px rgb(45 55 72 / 0.03)',
        'mango': '0 4px 14px -3px rgb(214 158 46 / 0.25)',
        'lagoon': '0 4px 14px -3px rgb(56 178 172 / 0.25)',
        'hibiscus': '0 4px 14px -3px rgb(229 62 62 / 0.2)',
        'lift': '0 10px 20px -5px rgb(45 55 72 / 0.1)',
        'glow': '0 0 0 3px rgb(178 245 234 / 0.4)',
      },
      borderRadius: {
        // Clean, uniform radii — no organic pebble shapes.
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '32px',
        'blob': '16px',
        'leaf': '12px',
        'pebble': '12px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 7s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
        'bob': 'bob 4.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'drift': 'drift 60s linear infinite',
        'flutter': 'flutter 0.18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0) rotate(-1deg)' },
          '50%': { transform: 'translateY(-6px) rotate(1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        drift: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        flutter: {
          from: { transform: 'scaleY(1)' },
          to: { transform: 'scaleY(0.35)' },
        },
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}