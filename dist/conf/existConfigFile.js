"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 判断根目录是否存在config/vg.conifg.js 文件
 */
const existConfigFile = mode => {
  const appDirectory = _fs.default.realpathSync(process.cwd());

  const defaultVgConfFile = _path.default.resolve(appDirectory, "config/vg.config.js");

  const vgConfFile = _path.default.resolve(appDirectory, `config/vg.${mode}.config.js`);

  if (_fs.default.existsSync(defaultVgConfFile)) {
    let configFile = {};

    if (_fs.default.existsSync(vgConfFile)) {
      configFile = require(vgConfFile);
    } else {
      configFile = require(defaultVgConfFile);
    }

    return configFile;
  }

  return false;
};

module.exports = existConfigFile;