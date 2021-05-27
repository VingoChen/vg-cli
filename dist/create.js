"use strict";

var _logSymbols = _interopRequireDefault(require("log-symbols"));

var _chalk = _interopRequireDefault(require("chalk"));

var _ora = _interopRequireDefault(require("ora"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const API = "direct:https://github.com/VingoChen/react-template";

const create = async ProjectName => {
  // 项目名不能为空
  if (ProjectName === undefined) {
    console.log(_logSymbols.default.error, _chalk.default.red("创建项目的时候，请输入项目名"));
  } else {
    // 如果文件名不存在则继续执行,否则退出
    (0, _util.notExistFold)(ProjectName).then(() => {
      // 用户询问交互
      (0, _util.prompt)().then(answer => {
        const loading = (0, _ora.default)("template loading...");
        loading.start("template downloading...");
        (0, _util.downloadTemplate)(ProjectName, API).then(() => {
          loading.succeed("template load success"); // 下载完成后,根据用户输入更新配置文件

          const fileName = `${ProjectName}/package.json`;
          answer.name = ProjectName;
          (0, _util.updateJsonFile)(fileName, answer).then(async () => {
            console.log(_logSymbols.default.success, "package.json update success");
            await (0, _util.loadCmd)(`cd ${ProjectName} && npm install`, "download dependencies");
            console.log("\r");
            console.log(_chalk.default.green(`cd ${ProjectName} && npm run start to run`));
          });
        }, () => {
          loading.fail("template load faild");
        });
      });
    });
  }
};

module.exports = create;