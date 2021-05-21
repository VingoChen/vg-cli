import fs from 'fs';
import path from 'path';

const getEnvConf = () => {
  const NODE_ENV = process.env.NODE_ENV || 'development';
  const appDirectory = fs.realpathSync(process.cwd());
  const defaultEzvConfFile = path.resolve(
    appDirectory,
    'config/ezv.local.config.js',
  );
  const EzvConfFile = path.resolve(
    appDirectory,
    `config/ezv.${NODE_ENV}.config.js`,
  );

  let envStringified = {};

  if (fs.existsSync(defaultEzvConfFile)) {
    let envData = {};

    if (fs.existsSync(EzvConfFile)) {
      envData = require(EzvConfFile).env;
    } else {
      envData = require(defaultEzvConfFile).env;
    }

    envData['NODE_ENV'] = process.env.NODE_ENV || 'development';

    Object.keys(envData).forEach((key) => {
      envStringified[key] = JSON.stringify(envData[key]);
    });
  }

  return envStringified;
};

module.exports = getEnvConf;
