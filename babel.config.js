// eslint-disable-next-line no-undef
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // eslint-disable-next-line no-undef
      require.resolve('expo-router/babel'),
    ],
  };
};
