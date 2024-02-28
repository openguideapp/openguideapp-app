// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  /** @type {import('expo/metro-config').MetroConfig} */
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    experimentalImportSupport: false,
    inlineRequires: true,
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
    unstable_enablePackageExports : true,
    unstable_enableSymlinks: true,
    unstable_conditionNames: ['browser', 'require', 'react-native']
  };

  // config.transformer.getTransformOptions = async () => ({
  //   transform: {
  //     experimentalImportSupport: false,
  //     inlineRequires: true,
  //     babelTransformerPath: require.resolve("react-native-svg-transformer")
  //   },
  // });

  // config.resolver.unstable_enablePackageExports = true
  // config.resolver.unstable_enableSymlinks = true
  // config.resolver.unstable_conditionNames = ['browser', 'require', 'react-native']
  return config;
})();


// module.exports = (async () => {
//   const {
//     resolver: { sourceExts, assetExts }
//   } = await getDefaultConfig();
//   return {
//     transformer: {
//       getTransformOptions: async () => ({
//         transform: {
//           experimentalImportSupport: false,
//           inlineRequires: true
//         }
//       }),
//       babelTransformerPath: require.resolve("react-native-svg-transformer")
//     },
//     resolver: {
//       assetExts: assetExts.filter(ext => ext !== "svg"),
//       sourceExts: [...sourceExts, "svg"],
//       unstable_enablePackageExports : true,
//       unstable_enableSymlinks: true,
//       unstable_conditionNames: ['browser', 'require', 'react-native']
//     }
//   };
// })();