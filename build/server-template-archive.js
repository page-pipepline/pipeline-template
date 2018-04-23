/*
 * 打包需要提交的模板
 * @Author: CntChen
 * @Date: 2018-03-24
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const archiver = require('archiver');

const templateName = 'pipeline-template.zip';

const outputPath = path.join(__dirname, '..', templateName);
const output = fs.createWriteStream(outputPath);

const archive = archiver('zip', {
  zlib: {
    level: 9
  }
});

output.on('close', () => {
  console.log(`  ${archive.pointer()} total bytes`);
  console.log(chalk.cyan(`  Archiver finalized: ${templateName}.\n`));
});
output.on('end', () => {
  console.log('Data has been drained');
});
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    // log warning
  } else {
    // throw error
    throw err;
  }
});
archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

const fileList = [
  'base-config.json',
  'components.json',
];

fileList.forEach((filePath) => {
  archive.file(path.join(__dirname, '..', 'server', 'config', filePath), { name: filePath });
});

archive.finalize();
