/*
 * 检查所有模块的配置数据是否满足配置约束
 * @Author: CntChen
 * @Date: 2018-03-23
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Validator = require('./utils-schema-validator');

console.log(chalk.cyan('Check Schema:'));

const getValidatorErrors = (schema, data) => {
  Validator.init({
    options: {
      required_by_default: true,
      no_additional_properties: true,
    }
  }, schema);
  return Validator.validate(data);
};

const baseConfigPath = path.join(__dirname, '../', 'src', 'config', 'base-config.json');
const baseConfigSchemaPath = path.join(__dirname, '../', 'src', 'config', 'base-config-schema.json');
const baseConfigObj = require(baseConfigPath);
const baseConfigSchemaObj = require(baseConfigSchemaPath);

const baseConfigValidateErrors = getValidatorErrors(baseConfigSchemaObj, baseConfigObj);
if (baseConfigValidateErrors.length > 0) {
  console.error(chalk.red(`Component ${baseConfigPath} data fail to match schema.\n`,
    JSON.stringify(baseConfigValidateErrors, null, 2)));
  throw JSON.stringify(baseConfigValidateErrors);
}
console.log(chalk.cyan('  Base configuration schema check success.'));


const componentsDir = path.join(__dirname, '../', 'src', 'components');
const componentsPath = fs.readdirSync(componentsDir);

componentsPath.forEach((componentPath) => {
  const schemaPath = path.join(componentsDir, componentPath, 'config', 'schema.js');
  const schemaObj = require(schemaPath);
  const dataPath = path.join(componentsDir, componentPath, 'config', 'data.json');
  const dataObj = require(dataPath);

  const validateErrors = getValidatorErrors(schemaObj, dataObj);
  if (validateErrors.length > 0) {
    console.error(chalk.red(`Component ${componentPath} data fail to match schema.\n`,
      JSON.stringify(validateErrors, null, 2)));
    throw JSON.stringify(validateErrors);
  }
});

console.log(chalk.cyan('  Components schema check success.\n'));
