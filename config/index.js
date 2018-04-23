// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path');
const argv = require('yargs').argv;

// 引入页面的基础配置, 用于 htmlWebpackPlugin 生成页面时候替换成对应的内容
const baseConfig = require('../src/config/base-config.json');

const HWPPageBaseConfig = Object.keys(baseConfig).reduce((accumulator, key) => {
  accumulator[key] = baseConfig[key];
  return accumulator;
}, {});

const HWPPageBaseConfigForServer = Object.keys(baseConfig).reduce((accumulator, key) => {
  accumulator[key] = `<!--baseConfig-${key}-->`;
  return accumulator;
}, {});

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/pipeline/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist/pipeline'),
    assetsPublicPath: './',
    productionSourceMap: true,
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build -- --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: !!argv.report,
    HWPPageBaseConfig
  },
  dev: {
    env: require('./dev.env'),
    port: 3001,
    autoOpenBrowser: true,
    assetsPublicPath: '/pipeline/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    // 是否启用移动端调试工具vconsole
    // `npm start -- --debug`
    // Set to `true` or `false` to always turn it on or off
    vConsole: !!argv.debug,
    HWPPageBaseConfig
  },
  server: {
    HWPPageBaseConfigForServer,
  },
};
