/*
 *
 * @Desc: 收集所有模块的配置数据约束， 生成配置约束 json
 * @Author: CntChen
 * @Date: 2018-03-23
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../', 'src', 'components');
const componentsPath = fs.readdirSync(componentsDir);

const schemaList = {};

componentsPath.forEach((componentPath) => {
  const schemaPath = path.join(componentsDir, componentPath, 'config', 'schema.js');
  const schemaObj = require(schemaPath);
  schemaList[componentPath] = schemaObj;
});

const schemaListJson = JSON.stringify(schemaList, null, 2);

const schemaDir = path.join(__dirname, '../', 'server', 'config');
fs.mkdirSync(schemaDir);

const schemaDist = path.join(__dirname, '../', 'server', 'config', 'template-schemas.json');
fs.writeFileSync(schemaDist, schemaListJson);
