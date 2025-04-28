module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // or '@babel/preset-env' for React
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blocklist: null,
      allowlist: null,
      safe: false,
      allowUndefined: true,
    }],
  ],
};