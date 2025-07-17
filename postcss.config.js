// import tailwindcss from 'tailwindcss';
// import autoprefixer from 'autoprefixer';

// export default {
//   plugins: [tailwindcss(), autoprefixer()],
// };
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // ✅ Correct way in Tailwind v4+
    autoprefixer: {},
  },
};
