"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 判断根目录是否存在config/ezv.conifg.js 文件
 */
const existConfigFile = mode => {
  const appDirectory = _fs.default.realpathSync(process.cwd());

  const defaultEzvConfFile = _path.default.resolve(appDirectory, 'config/ezv.config.js');

  const EzvConfFile = _path.default.resolve(appDirectory, `config/ezv.${mode}.config.js`);

  if (_fs.default.existsSync(defaultEzvConfFile)) {
    let configFile = {};

    if (_fs.default.existsSync(EzvConfFile)) {
      configFile = require(EzvConfFile);
    } else {
      configFile = require(defaultEzvConfFile);
    }

    return configFile;
  }

  return false;
};

module.exports = existConfigFile;