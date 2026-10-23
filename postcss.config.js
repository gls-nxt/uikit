const config = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['lib/tokens/breakpoints.css'],
    },
    'postcss-custom-media': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      features: {
        'custom-media-queries': true,
        'custom-properties': false,
        'has-pseudo-class': true,
        'nesting-rules': true,
      },
      stage: 3,
    },
  },
};

export default config;
