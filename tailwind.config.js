module.exports = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
      extend: {
        animation: {
          fadeIn: 'fadeIn 0.3s ease-out',
          slideIn: 'slideIn 0.3s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          slideIn: {
            '0%': { transform: 'translateY(-10%)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  };
  