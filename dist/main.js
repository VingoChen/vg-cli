"use strict";

var _commander = _interopRequireDefault(require("commander"));

var _create = _interopRequireDefault(require("./create"));

var _dev = _interopRequireDefault(require("./dev"));

var _build = _interopRequireDefault(require("./build"));

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

  },
  // 项目启动
  dev: {
    description: '本地启动项目',
    usages: ['ezv dev'],
    options: [{
      flags: '-p --port <port>',
      description: '端口',
      defaultValue: 9000
    }, {
      flags: '-h --host <host>',
      description: 'host',
      defaultValue: '0.0.0.0'
    }, {
      flags: '-m --mode <mode>',
      description: '环境',
      defaultValue: 'dev'
    }, {
      flags: '-r --report <report>',
      description: '打包分析',
      defaultValue: '0'
    }],
    alias: 'd'
  },
  // 项目打包
  build: {
    description: '项目打包',
    usages: ['ezv build'],
    options: [{
      flags: '-r --report <report>',
      description: '打包分析',
      defaultValue: '0'
    }, {
      flags: '-m --mode <mode>',
      description: '环境',
      defaultValue: 'dev'
    }],
    alias: 'b'
  }
};
Object.keys(actionMap).forEach(action => {
  if (actionMap[action].options) {
    Object.keys(actionMap[action].options).forEach(option => {
      let obj = actionMap[action].options[option];

      _commander.default.option(obj.flags, obj.description, obj.defaultValue);
    });
  }

  _commander.default.command(action).description(actionMap[action].description).alias(actionMap[action].alias).action(() => {
    const {
      mode,
      port,
      host,
      report
    } = _commander.default;

    switch (action) {
      case 'create':
        (0, _create.default)(...process.argv.slice(3));
        break;

      case 'dev':
        (0, _dev.default)(mode, port, host);
        break;

      case 'build':
        (0, _build.default)(mode, report);
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