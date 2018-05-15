/*
 * 手动触发服务端渲染的 node 脚本
 * @Author: CntChen
 * @Date: 2018-03-23
 */

const fs = require('fs');
const path = require('path');

const renderMode = process.argv[2] || 'release';

const { createBundleRenderer } = require('vue-server-renderer');

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const baseConfig = require('./config/base-config.json');

const template = fs.readFileSync(path.join(__dirname, './dist/index-origin.html'), 'utf-8');
const initdata = fs.readFileSync(path.join(__dirname, './config/components.json'), 'utf-8');
const initdataScript = `<script type="text/javascript">
window.INIT_DATA = ${initdata.replace(/\n+$/, '')};
</script>`;

/*
 * 在服务端脚本渲染预览页面时, 插入到预览页面的脚本
 * 用于增强模板生成页面的交互功能
 * 采用 ES6 语法编写
 */
const previewInsertedScriptStr = fs.readFileSync(path.join(__dirname, './preview-inserted-script.js'), 'utf-8');
const previewInsertedScript = `<script type="text/javascript" defer>
${previewInsertedScriptStr.replace(/\n+$/, '')}
</script>`;

// 在 webpack.server.config.js 中
// 页面中的 <%= htmlWebpackPlugin.options.xxx %> 占位符, 替换为 <!--baseConfig-xxx-->
// htmlWebpackPlugin 生成的页面, 会在服务端渲染执行 Vue 的渲染, 所以不能使用 Vue 的模板语法
const insertBaseConfigToHtml = (htmlStr, config) => {
  const newHtmlStr = Object.keys(config).reduce((accumulator, key) => accumulator.replace(new RegExp(`<!--baseConfig\\-${key}-->`, 'g'), config[key]), htmlStr);
  return newHtmlStr;
};

const vueDivId = 'id="app"';

const renderer = createBundleRenderer(serverBundle, {
  clientManifest,
  template,
  basedir: path.join(__dirname, 'no-exist')
});

const context = {};
renderer.renderToString(context)
  .then((res) => {
    let html = insertBaseConfigToHtml(res, baseConfig);

    const scriptsString = context.renderScripts();
    html = html.replace(/(data-server-rendered="true")/, `${vueDivId} $1`);

    switch (renderMode) {
      case 'release':
        html = html.replace(scriptsString, `\n${initdataScript}\n${scriptsString}`);
        break;
      case 'preview':
        html = html.replace(scriptsString, `\n${initdataScript}\n${scriptsString}\n${previewInsertedScript}`);
        break;
      default:
        break;
    }

    fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html, 'utf-8');
  })
  .catch((e) => {
    console.error(e);
    throw e;
  });
