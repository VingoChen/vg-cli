"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _ip = _interopRequireDefault(require("ip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const divider = _chalk.default.gray('-----------------------------------');

const logger = {
  error: err => {
    console.error(_chalk.default.red(err));
  },
  start: (port, host) => {
    console.log(`Server started! ${_chalk.default.green('✓')}`);
    console.log(`
${_chalk.default.bold('App running at:')}
${divider}
- Local: ${_chalk.default.blue(`  http://${host}:${port}`)}
- Network: ${_chalk.default.blue(`http://${_ip.default.address()}:${port}`)}
${divider}
${_chalk.default.magenta(`Press ${_chalk.default.italic('Ctrl+c')} to stop`)}
    `);
  }
};
module.exports = logger;