// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
});

config.resolver.unstable_enablePackageExports = true
config.resolver.unstable_enableSymlinks = true
config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native']

module.exports = config;
