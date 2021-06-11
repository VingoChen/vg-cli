"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

var _logger = _interopRequireDefault(require("./conf/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = async (mode = "dev", report) => {
  const webpackBuildConf = (0, _getGeneratorWebpackConf.default)("production", mode, report);
  (0, _webpack.default)(webpackBuildConf, err => {
    if (err) {
      _logger.default.error(err);
    }
  });
};

module.exports = build;