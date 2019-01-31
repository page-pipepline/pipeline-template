/*
 * @Desc: 收集组件库中组件的描述信息、默认配置数据和配置约束
 * @Author: CntChen
 * @Date: 2018-03-23
 */

const fs = require('fs');
const path = require('path');

const configDir = path.join(__dirname, '../', 'server', 'config');
const dirExist = fs.existsSync(configDir);
if (!dirExist) {
  fs.mkdirSync(configDir);
}

const componentsDir = path.join(__dirname, '../', 'src', 'components');
const componentsPath = fs.readdirSync(componentsDir);

const componentsInfoObj = {};
componentsPath.forEach((componentPath) => {
  const componentInfoPath = path.join(componentsDir, componentPath, 'package.json');
  const componentInfoStr = fs.readFileSync(componentInfoPath, 'utf-8');
  const componentInfoObj = JSON.parse(componentInfoStr);
  componentsInfoObj[componentPath] = componentInfoObj;
});
const libraryComponentsInfoJson = JSON.stringify(componentsInfoObj, null, 2);
const libraryComponentsInfoDist = path.join(configDir, 'components-info.json');
fs.writeFileSync(libraryComponentsInfoDist, libraryComponentsInfoJson);

const defaultDataObj = {};
componentsPath.forEach((componentPath) => {
  const componentDefaultDataPath = path.join(componentsDir, componentPath, 'config', 'data.json');
  const componentDefaultDataStr = fs.readFileSync(componentDefaultDataPath, 'utf-8');
  const componentDefaultDataObj = JSON.parse(componentDefaultDataStr);
  defaultDataObj[componentPath] = componentDefaultDataObj;
});
const dataListJson = JSON.stringify(defaultDataObj, null, 2);
const dataDist = path.join(configDir, 'components-default-data.json');
fs.writeFileSync(dataDist, dataListJson);

const schemaObj = {};
componentsPath.forEach((componentPath) => {
  const componentSchemaPath = path.join(componentsDir, componentPath, 'config', 'schema.js');
  const componentSchemaObj = require(componentSchemaPath);
  schemaObj[componentPath] = componentSchemaObj;
});
const schemaListJson = JSON.stringify(schemaObj, null, 2);
const schemaDist = path.join(configDir, 'components-schema.json');
fs.writeFileSync(schemaDist, schemaListJson);
