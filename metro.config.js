const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ignore .d.ts runtime requirements
config.resolver.assetExts.push('d.ts');

module.exports = config;