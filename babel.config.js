/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  "module:react-native-dotenv",
  "@babel/plugin-transform-class-static-block",
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
]

/** @type {import('@babel/core').TransformOptions} */
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {},
    },
    plugins,
  };
};