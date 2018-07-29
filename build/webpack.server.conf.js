const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

const env = config.build.env;

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: ['./src/main-server.js'],
  },
  externals: {
    './config/components': {
      commonjs2: '../config/components.json',
      commonjs: '../config/components.json',
    },
    vue: 'vue',
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false, // 会导致动态加载的样式带有sourcemap，先去掉
      extract: true
    })
  },
  target: 'node',
  // devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '..', 'server', 'dist'),
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[id].[chunkhash:8].js',
    publicPath: './'
  },
  plugins: [
    new VueSSRServerPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // 这里关闭 http://cssnano.co/optimisations/reducetransforms/ 这个选项，因为会导致ios下切页动画闪烁
    // 注意，这里是cssnano 3.x.x的语法，以后升级到4+配置语法会变！
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        postcssReduceTransforms: {
          disable: true
        },
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      vueInstancePlaceholder: '<!--vue-ssr-outlet-->',
      filename: path.join(__dirname, '..', 'server', 'dist', 'index-origin.html'),
      template: 'src/index.html',
      inject: false,
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      ...config.server.HWPPageBaseConfigForServer,
    }),
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    new webpack.optimize.ModuleConcatenationPlugin(),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '..', 'src', 'config'),
        to: path.join(__dirname, '..', 'server', 'config'),
      }
    ]),
  ]
});

module.exports = webpackConfig;
