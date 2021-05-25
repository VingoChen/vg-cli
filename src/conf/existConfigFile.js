import fs from 'fs';
import path from 'path';
/**
 * 判断根目录是否存在config/ezv.conifg.js 文件
 */
const existConfigFile = (mode) => {
  const appDirectory = fs.realpathSync(process.cwd());
  const defaultEzvConfFile = path.resolve(appDirectory, 'config/ezv.config.js');
  const EzvConfFile = path.resolve(
    appDirectory,
    `config/ezv.${mode}.config.js`,
  );

  if (fs.existsSync(defaultEzvConfFile)) {
    let configFile = {};
    if (fs.existsSync(EzvConfFile)) {
      configFile = require(EzvConfFile);
    } else {
      configFile = require(defaultEzvConfFile);
    }
    return configFile;
  }

  return false;
};

module.exports = existConfigFile;
