/** @type {import('tailwindcss').Config} */

const grey0 = '#202225';
const grey1 = '#404a57';
const duckBlue2 = '#055f72';

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')({strategy: 'class'})],
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      error: '#b91c1c',
      transparent: 'transparent',
      current: 'currentColor',
      warning: '#FFF1DD',
      apricot: {
        1: '#985549',
        2: '#fe8e7a',
        3: '#ffab9d',
        4: '#ffcdc4',
        5: '#f9eaea',
        6: '#faf5f5',
      },
      green: {
        1: duckBlue2,
        2: '#067185',
        3: '#4d9ba9',
        4: '#99c6ce',
        5: '#e5f0f2',
        6: '#f5f9fa',
      },
      'duck-blue': {
        1: '#045162',
        2: duckBlue2,
        3: '#067185',
        4: '#428796',
        5: '#4d9ba9',
        6: '#99c6ce',
        7: '#b8d4d9',
        8: '#d1e4e7',
        9: '#e5f0f2',
        10: '#f5f9fa',
      },
    },
    extend: {
      fontFamily: {
        xylomylo: ['Xylomylo', 'sans-serif'],
      },
      width: {
        128: '32rem',
      },
      colors: {
        grey: {
          0: grey0,
          1: grey1,
          2: '#505d6d',
          3: '#607184',
          4: '#6e7f95',
          5: '#8492a5',
          6: '#9aa6b7',
          7: '#b7c0cc',
          8: '#d2d9e1',
          9: '#edeff4',
          10: '#f5f6fa',
        },
      },
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1440px',
      },
      zIndex: {
        1: 1,
        2: 2,
        3: 3,
      },
      typography: {
        DEFAULT: {
          css: {
            color: grey0,
            a: {
              color: duckBlue2,
            },
            h1: {
              marginBottom: (20 / 36).toFixed(7) + 'em',
              color: grey1,
            },
            h2: {
              marginBottom: (16 / 24).toFixed(7) + 'em',
              color: grey1,
            },
            h3: {
              color: grey1,
            },
            h4: {
              color: grey1,
            },
            h5: {
              color: grey1,
            },
            maxWidth: '100%',
          },
        },
      },
      keyframes: {
        tabIndicator: {
          from: {transform: 'scaleX(0)'},
          to: {transform: 'scaleX(1)'},
        },
      },
      animation: {
        tabIndication: 'tabIndicator 0.3s ease-out',
      },
    },
  },
};
