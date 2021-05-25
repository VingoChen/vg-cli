"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

var _constans = require("./conf/constans");

var _logger = _interopRequireDefault(require("./conf/logger"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dev = (mode = 'dev', port = _constans.SERVER_PORT, host = _constans.SERVER_HOST, report) => {
  const webpackDevConf = (0, _getGeneratorWebpackConf.default)('development', mode, report);
  const devServerConf = webpackDevConf.devServer;
  const compiler = (0, _webpack.default)(webpackDevConf);
  const server = new _webpackDevServer.default(compiler, devServerConf);
  (0, _util.choosePort)(port, host).then(resPort => {
    if (resPort !== null) {
      server.listen(resPort, host, err => {
        if (err) {
          return _logger.default.error(err.message);
        }

        return _logger.default.start(resPort, host);
      });
    }
  }).catch(error => {
    console.log(chalk.red(error.message));
  });
};

module.exports = dev;