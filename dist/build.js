"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = () => {
  const webpackBuildConf = (0, _getGeneratorWebpackConf.default)('production');
  (0, _webpack.default)(webpackBuildConf);
};

module.exports = build;