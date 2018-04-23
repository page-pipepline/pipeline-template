require('./check-versions')();
const config = require('../config');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.dev.conf');

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port;
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const compiler = webpack(webpackConfig);

const uri = `http://localhost:${port}${config.dev.assetsPublicPath}#/`;

let _resolve;
const readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

const server = new webpackDevServer(compiler, {
  publicPath: config.dev.assetsPublicPath,
  disableHostCheck: true,
  hot: true,
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
});

console.log('> Starting dev server...');
server.listen(port, '0.0.0.0', () => {
  console.log(`> Listening at ${uri}\n`);
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri);
  }
  _resolve();
});

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  }
};

