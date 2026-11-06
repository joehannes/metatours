/**
 * Tour Cana RD VIP — polished Caribbean colour.
 *
 * Action-documentary photography graded like a jet-set film: ivory and sand
 * where the other cut was black, charcoal ink, amber for energy, a thin line
 * of champagne gold for the luxury, and WhatsApp green for the one thing every
 * page wants you to press. Anton for the shouting, Barlow for the reading.
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
        // Deep blue, sea glass and warm sand taken from the Tour Cana mark.
        ink: {
          DEFAULT: '#093B70',
          soft: '#46627C',
          light: '#7B94A9',
        },
        // Ivory, sand and the white of a card.
        paper: {
          DEFAULT: '#FBF8F0',
          warm: '#EFF8F5',
          deep: '#D7EBE4',
          card: '#FFFFFF',
        },
        // Amber: the energy colour. Buttons, ranks, the price.
        mango: {
          light: '#FFDFAA',
          DEFAULT: '#F6AB48',
          dark: '#BD6F16',
        },
        hibiscus: {
          light: '#FFB8AC',
          DEFAULT: '#E4553F',
          dark: '#B63B28',
        },
        // The logo's Caribbean blue.
        lagoon: {
          light: '#BCE9EE',
          DEFAULT: '#0875AA',
          dark: '#075486',
        },
        sky: {
          light: '#D3F2F5',
          DEFAULT: '#39A8D5',
          dark: '#1479A9',
        },
        // The logo's palm green; WhatsApp gets its own brighter one below.
        jungle: {
          light: '#BDE8D7',
          DEFAULT: '#158D72',
          dark: '#0D6954',
        },
        sunset: {
          light: '#FFD0BD',
          DEFAULT: '#EF7B4F',
          dark: '#C95B36',
        },
        grape: {
          light: '#D8CCF0',
          DEFAULT: '#7A5DC3',
          dark: '#56409A',
        },
        // Champagne gold: hairlines, small caps, the luxury.
        gold: {
          light: '#F5DFB1',
          DEFAULT: '#D7A54B',
          dark: '#A8711E',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark: '#128C4B',
        },
        // Roles the admin panel is written against.
        coral: {
          deep: '#B63B28',
        },
        sea: {
          deep: '#155B8F',
        },
        abyss: {
          DEFAULT: '#14161A',
          light: '#23272E',
        },

        tropicalGreen: '#158D72',
        tropicalBlue: '#39A8D5',
        sandyBeige: '#EFF8F5',
        sunsetOrange: '#EF7B4F',
        oceanWave: '#0875AA',
      },
      // `border-ink` is everywhere in the shared markup: here a fine hairline.
      borderColor: {
        ink: {
          DEFAULT: 'rgb(7 84 134 / 0.14)',
          soft: 'rgb(7 84 134 / 0.22)',
          light: 'rgb(7 84 134 / 0.08)',
        },
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        condensed: ['Sora', 'system-ui', 'sans-serif'],
        accent: ['"DM Serif Display"', 'Georgia', 'serif'],
        script: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'sun-rays': 'radial-gradient(circle at 70% 20%, rgba(246,171,72,0.32) 0%, transparent 60%)',
        'sky-wash': 'linear-gradient(180deg, #FFFFFF 0%, #FBF8F0 100%)',
        'sunset-wash': 'linear-gradient(135deg, #FFDFAA 0%, #F6AB48 55%, #EF7B4F 100%)',
        'lagoon-wash': 'linear-gradient(135deg, #BCE9EE 0%, #0875AA 100%)',
        'jungle-wash': 'linear-gradient(135deg, #BDE8D7 0%, #158D72 100%)',
        'paper-wash': 'linear-gradient(180deg, #FBF8F0 0%, #EFF8F5 100%)',
        'abyss-wash': 'linear-gradient(180deg, #075486 0%, #06305D 100%)',
      },
      boxShadow: {
        'ink-sm': '0 2px 8px -3px rgba(20, 22, 26, 0.18)',
        'ink': '0 12px 30px -14px rgba(20, 22, 26, 0.28)',
        'ink-lg': '0 24px 50px -22px rgba(20, 22, 26, 0.34)',
        'ink-xl': '0 36px 70px -28px rgba(20, 22, 26, 0.4)',
        'mango': '0 14px 30px -14px rgba(194, 120, 18, 0.55)',
        'lagoon': '0 14px 30px -14px rgba(21, 91, 143, 0.5)',
        'hibiscus': '0 14px 30px -14px rgba(182, 59, 40, 0.5)',
        'lift': '0 16px 34px -16px rgba(20, 22, 26, 0.4)',
        'glow': '0 0 0 4px rgba(242, 163, 58, 0.3)',
        'gold': '0 0 0 1px rgba(198, 161, 91, 0.45)',
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '18px',
        'xl': '24px',
        '2xl': '28px',
        '3xl': '34px',
        'blob': '18px',
        'leaf': '999px',
        'pebble': '14px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 7s ease-in-out infinite',
        'spin-slow': 'spin 40s linear infinite',
        'bob': 'bob 4.5s ease-in-out infinite',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'drift': 'drift 60s linear infinite',
        'flutter': 'flutter 0.18s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
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
