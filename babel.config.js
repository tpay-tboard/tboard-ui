// eslint-disable-next-line
module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = [
    '@babel/plugin-transform-typescript',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
