"use strict";

var _webpack = require("webpack");

var _errorOverlayWebpackPlugin = _interopRequireDefault(require("error-overlay-webpack-plugin"));

var _webpackbar = _interopRequireDefault(require("webpackbar"));

var _cleanWebpackPlugin = require("clean-webpack-plugin");

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _copyWebpackPlugin = _interopRequireDefault(require("copy-webpack-plugin"));

var _forkTsCheckerWebpackPlugin = _interopRequireDefault(require("fork-ts-checker-webpack-plugin"));

var _paths = _interopRequireDefault(require("./paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {boolean} isProd 是否是生产环境
 */
const getPlugins = isProd => {
  const devPlugins = [new _webpack.HotModuleReplacementPlugin(), new _errorOverlayWebpackPlugin.default(), new _webpackbar.default({
    name: "RUNNING",
    color: "#52c41a"
  })];
  const prodPlugins = [new _cleanWebpackPlugin.CleanWebpackPlugin(), new _miniCssExtractPlugin.default({
    filename: "css/[name].[contenthash:8].css",
    chunkFilename: "css/[name].[contenthash:8].chunk.css"
  }), new _webpackbar.default({
    name: "BUNDLING",
    color: "#722ed1"
  })];
  const defaultPlugins = [new _htmlWebpackPlugin.default({
    template: _paths.default.appHtml,
    cache: true
  }), new _copyWebpackPlugin.default({
    patterns: [{
      context: _paths.default.appPublic,
      from: "*",
      to: _paths.default.appBuild,
      toType: "dir",
      globOptions: {
        dot: true,
        gitignore: true,
        ignore: ["**/index.html"]
      }
    }]
  }), new _forkTsCheckerWebpackPlugin.default({
    typescript: {
      configFile: _paths.default.appTsConfig
    }
  }), ...(isProd ? prodPlugins : devPlugins)];
  return defaultPlugins;
};

module.exports = getPlugins;