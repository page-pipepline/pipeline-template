# pipeline-template

> 页面可视化搭建框架的页面模板

## 用法

### 初始化

```bash
# 初始化项目(安装依赖包)
npm i
```

### 本地测试
```
npm start
```

### 生成模板
* 生成服务端渲染所需代码
```
$ npm run server
```
打包结果在`server`目录中。

* 生成组件库压缩包
```
$ npm run server
$ npm run library
```

打包结果为`pipeline-library.zip`, 提交组件库时, 提交该 zip 文件.

* 生成模板压缩包
```
$ npm run server
$ npm run template
```

打包结果为`pipeline-template.zip`, 提交模板时, 提交该 zip 文件.

### 个性化页面独立发布
拉取一个独立分支或一份独立源码, 然后

```
$ npm run build
```

打包结果在`dist`目录中。

## 服务端渲染脚本
路径 `server/node.js`

用于在 node 服务端渲染出带 DOM 元素的 `index.html`.

### 渲染发布版本 `默认`
```
$ node server/node.js release
```

### 渲染页面预览版本
> 嵌入了模板生成页面的调试脚本
```
$ node server/node.js preview
```

## TODO
* [x] 基础样式的引入方式
* [x] 模板打包为压缩包脚本
* [ ] 组件开发套件
* [ ] 组件抽离为 npm 包
* [ ] schema 和 data 的验证页面


## 前后端同构已知问题

### 页面基本配置的更新在本地 dev 模式下无法实时渲染
因为页面基本配置`base-config.json`, 是在获取 webpack 构建参数时候引入给 html-webpack-plugin 的,
属于 webpack-dev-tool 的一部分, 所以文件变化时, webpack-dev-tool 并不会重新引入该文件.

好在: 需要调试页面基本配置的场景比较少.

## EOF

