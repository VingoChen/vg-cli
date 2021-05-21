"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevServer = _interopRequireDefault(require("webpack-dev-server"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

var _devServerConf = _interopRequireDefault(require("./conf/devServerConf"));

var _constans = require("./conf/constans");

var _logger = _interopRequireDefault(require("./conf/logger"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dev = () => {
  const webpackDevConf = (0, _getGeneratorWebpackConf.default)('development');
  const compiler = (0, _webpack.default)(webpackDevConf);
  const server = new _webpackDevServer.default(compiler, _devServerConf.default);
  (0, _util.choosePort)(_constans.SERVER_PORT, _constans.SERVER_HOST).then(resPort => {
    if (resPort !== null) {
      server.listen(resPort, _constans.SERVER_HOST, err => {
        console.log(process.env);

        if (err) {
          return _logger.default.error(err.message);
        }

        return _logger.default.start(resPort, _constans.SERVER_HOST);
      });
    }
  }).catch(error => {
    console.log(chalk.red(error.message));
  });
};

module.exports = dev;