"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _downloadGitRepo = _interopRequireDefault(require("download-git-repo"));

var _ora = _interopRequireDefault(require("ora"));

var _detectPortAlt = _interopRequireDefault(require("detect-port-alt"));

var _isRoot = _interopRequireDefault(require("is-root"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const util = require('util');

const exec = util.promisify(require('child_process').exec); // 文件是否存在

const notExistFold = async name => {
  return new Promise(resolve => {
    if (_fs.default.existsSync(name)) {
      console.log(_logSymbols.default.error, _chalk.default.red('文件夹名已被占用，请更换名字重新创建'));
    } else {
      resolve();
    }
  });
}; // 询问用户


const promptList = [{
  type: 'input',
  name: 'description',
  message: 'Please enter the project description: '
}, {
  type: 'input',
  name: 'author',
  message: 'Please enter the author name: '
}];

const prompt = () => {
  return new Promise(resolve => {
    _inquirer.default.prompt(promptList).then(answer => {
      resolve(answer);
    });
  });
}; // 项目模板远程下载


const downloadTemplate = async (ProjectName, api) => {
  return new Promise((resolve, reject) => {
    (0, _downloadGitRepo.default)(api, ProjectName, {
      clone: true
    }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}; // 更新json配置文件


const updateJsonFile = (fileName, obj) => {
  return new Promise(resolve => {
    if (_fs.default.existsSync(fileName)) {
      const data = _fs.default.readFileSync(fileName).toString();

      let json = JSON.parse(data);
      Object.keys(obj).forEach(key => {
        json[key] = obj[key];
      });

      _fs.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');

      resolve();
    }
  });
}; // 命令行命令执行


const loadCmd = (cmd, text = '') => {
  let loading = (0, _ora.default)();
  loading.start(`excute ${text} ....`);
  return exec(cmd).then(() => {
    loading.succeed(`${text} success`);
  });
}; // 端口选择


async function choosePort(port, host) {
  const isInteractive = process.stdout.isTTY;
  const resPort = await (0, _detectPortAlt.default)(port, host);

  if (resPort === port) {
    return resPort;
  }

  const message = process.platform !== 'win32' && port < 1024 && !(0, _isRoot.default)() ? 'Admin permissions are required to run a server on a port below 1024.' : `Something is already running on port ${port}.`;

  if (isInteractive) {
    console.log(_chalk.default.yellow(message));
    return resPort;
  }

  console.log(_chalk.default.red(message));
  return null;
}

module.exports = {
  notExistFold,
  prompt,
  downloadTemplate,
  updateJsonFile,
  loadCmd,
  choosePort
};