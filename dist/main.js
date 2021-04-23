"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _create = _interopRequireDefault(require("./create"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 项目创建

/**
 * 命令列表
 */
const actionMap = {
  // 项目创建
  create: {
    description: '创建一个新的项目',
    // 描述
    usages: ['ezv create ProjectName'],
    alias: 'c' // 命令简称

  }
}; // 添加create,init,dev命令

Object.keys(actionMap).forEach(action => {
  // if (actionMap[action].options) {
  // 	Object.keys(actionMap[action].options).forEach(option => {
  // 		let obj = actionMap[action].options[option];
  // 		program.option(obj.flags, obj.description, obj.defaultValue);
  // 	});
  // }
  _commander.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    switch (action) {
      case 'create':
        (0, _create.default)(...process.argv.slice(3));
        break;

      default:
        break;
    }
  });
}); // 项目版本

_commander.default.version(require('../package.json').version, '-v --version').parse(process.argv);
/**
 * 命令后不带参数的时候，输出帮助信息
 */


if (!process.argv.slice(2).length) {
  _commander.default.outputHelp();
}