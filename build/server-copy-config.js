/*
 * @Desc: 将页面组件列表和页面全局配置复制到服务端目录
 * @Author: CntChen
 * @Date: 2019-01-20
 */

const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '../', 'server', 'config');
const dirExist = fs.existsSync(configDir);
if (!dirExist) {
  fs.mkdirSync(configDir);
}

const sourceDir = path.join(__dirname, '../', 'src', 'config');
const files = fs.readdirSync(sourceDir);
files.forEach((file) => {
  fs.copyFileSync(path.join(sourceDir, file), path.join(configDir, file));
});
