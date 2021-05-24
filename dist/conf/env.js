"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getEnvConf = mode => {
  const appDirectory = _fs.default.realpathSync(process.cwd());

  const defaultEzvConfFile = _path.default.resolve(appDirectory, 'config/ezv.config.js');

  const EzvConfFile = _path.default.resolve(appDirectory, `config/ezv.${mode}.config.js`);

  let envStringified = {};

  if (_fs.default.existsSync(defaultEzvConfFile)) {
    let envData = {};

    if (_fs.default.existsSync(EzvConfFile)) {
      envData = require(EzvConfFile).env;
    } else {
      envData = require(defaultEzvConfFile).env;
    }

    envData['NODE_ENV'] = process.env.NODE_ENV || 'development';
    Object.keys(envData).forEach(key => {
      envStringified[key] = JSON.stringify(envData[key]);
    });
  }

  return envStringified;
};

module.exports = getEnvConf;