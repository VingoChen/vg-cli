"use strict";

var _webpack = _interopRequireDefault(require("webpack"));

var _getGeneratorWebpackConf = _interopRequireDefault(require("./conf/getGeneratorWebpackConf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const build = async (mode = "dev", report) => {
  const webpackBuildConf = (0, _getGeneratorWebpackConf.default)("production", mode, report);
  (0, _webpack.default)(webpackBuildConf, (err, stats) => {
    if (err) {
      console.error(err.stack || err);

      if (err.details) {
        console.error(err.details);
      }

      return;
    }

    const info = stats.toJson();

    if (stats.hasErrors()) {
      console.error(info.errors);
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }

    console.log(stats.toString({
      colors: true
    }));
  });
};

module.exports = build;