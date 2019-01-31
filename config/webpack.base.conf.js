const path = require('path');
const vueLoaderConfig = require('./vue-loader.conf');
const webpack = require('webpack');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const loaderIncDir = [resolve('src'), resolve('components'), resolve('test')];
const loaderExcludeDir = [];

module.exports = {
  entry: {
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      bcomp: resolve('src/base-components'),
      comp: resolve('src/components'),
      static: resolve('src/static'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: loaderIncDir,
        exclude: loaderExcludeDir,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: loaderIncDir,
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: loaderIncDir,
        exclude: loaderExcludeDir,
        options: {
          cacheDirectory: true,
        }
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
          fallback: 'file-loader',
          publicPath: '..',
        }
      },
      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          'svgo-loader'
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'imports-loader?this=>global!exports-loader?global.Promise!es6-promise/auto',
      fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
    }),
  ]
};
