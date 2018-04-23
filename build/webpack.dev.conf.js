const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const VConsolePlugin = require('vconsole-webpack-plugin');

const port = process.env.PORT || config.dev.port;

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach((name) => {
  // baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
  baseWebpackConfig.entry[name].unshift(`webpack-dev-server/client?http://0.0.0.0:${port}/`, 'webpack/hot/only-dev-server');
});

module.exports = merge(baseWebpackConfig, {
  entry: {
    app: ['./src/main.js'],
    // info 存在加载顺序的问题，只能单独抽出来
    vendor: [
      'vue',
    ]
  },
  module: {
    // dev模式不使用Extract CSS，与热更新一起使用会报错
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap
    })
  },
  output: {
    path: config.build.assetsRoot,
    filename: 'js/[name].debug.js',
    chunkFilename: 'js/[id].debug.js',
    publicPath: config.dev.assetsPublicPath
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new VConsolePlugin({ enable: config.dev.vConsole }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      dnsPrefetch: config.dnsPrefetch,
      vueInstancePlaceholder: '<div id="app"></div>',
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      ...config.dev.HWPPageBaseConfig
    }),
    new FriendlyErrorsPlugin()
  ]
});
