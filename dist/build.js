"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

var _webpackBundleAnalyzer = _interopRequireDefault(require("webpack-bundle-analyzer"));

var _constans = require("./conf/constans");

var _logger = _interopRequireDefault(require("./conf/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = (mode = 'dev', report) => {
  const webpackBuildConf = (0, _getGeneratorWebpackConf.default)('production', mode);

  if (report === '1') {
    webpackBuildConf.plugins.push(new _webpackBundleAnalyzer.default.BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: _constans.ANALYZER_HOST,
      analyzerPort: _constans.ANALYZER_PORT
    }));
  }

  (0, _webpack.default)(webpackBuildConf, err => {
    if (err) {
      _logger.default.error(err);
    }
  });
};

module.exports = build;