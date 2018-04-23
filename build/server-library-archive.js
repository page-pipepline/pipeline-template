/*
 * 打包需要提交的组件库
 * @Author: CntChen
 * @Date: 2018-03-24
 */

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const archiver = require('archiver');

const libraryName = 'pipeline-library.zip';

const outputPath = path.join(__dirname, '..', libraryName);
const output = fs.createWriteStream(outputPath);

const archive = archiver('zip', {
  zlib: {
    level: 9
  }
});

output.on('close', () => {
  console.log(`  ${archive.pointer()} total bytes`);
  console.log(chalk.cyan(`  Archiver finalized: ${libraryName}.\n`));
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

const directoryList = [
  'build',
  'config',
  'server',
  'src'
];
const fileList = [
  '.babelrc',
  '.editorconfig',
  '.eslintignore',
  '.eslintrc.js',
  '.postcssrc.js',
  'package.json',
  'README.md',
];

directoryList.forEach((dirPath) => {
  archive.directory(path.join(__dirname, '..', dirPath), dirPath);
});
fileList.forEach((filePath) => {
  archive.file(path.join(__dirname, '..', filePath), { name: filePath });
});

archive.finalize();
