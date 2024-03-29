module.exports = {
  purge: [],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        DEFAULT: '#ffffff',
      },
      green: {
        light: '#6fcf97',
        DEFAULT: '#27AE60',
        dark: '#219653',
        darker: '#1e874b',
      },
      red: {
        light: '#FFEAEA',
        DEFAULT: '#EB5757',
        dark: '#C20D0D',
      },
      orange: {
        light: '#FFEBDA',
        DEFAULT: '#F66A0A',
        dark: '#A04100',
      },
      primary: {
        DEFAULT: '#24292E',
      },
      warning: {
        DEFAULT: '#D1711C',
      },
      blue: {
        DEFAULT: '#3D86A1',
        dark: '#2163A5'
      },
      gray: {
        DEFAULT: '#4C4C4D',
        dark: '#24292E',
      }
    },
    extend: {
      boxShadow: {
        default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
      },
      fontSize: {
        '2rem': '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    "./src/**/*.{js,jsx,,ts,tsx}",
  ],
}