const utils = require('./utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: false, // 会导致动态加载的样式带有sourcemap，先去掉
    extract: isProduction
  })
};
