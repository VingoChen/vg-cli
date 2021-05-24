"use strict";

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _cssMinimizerWebpackPlugin = _interopRequireDefault(require("css-minimizer-webpack-plugin"));

var _webpack = require("webpack");

var _paths = _interopRequireDefault(require("./paths"));

var _getLoaders = _interopRequireDefault(require("./getLoaders"));

var _getPlugins = _interopRequireDefault(require("./getPlugins"));

var _env = _interopRequireDefault(require("./env"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} env webpack环境 development | production
 */
const getGeneratorWebpackConf = (env, mode) => {
  if (!env) {
    return {};
  }

  const isProd = env === 'production';
  const defaultPlugins = (0, _getPlugins.default)(isProd);
  const defaultLoaders = (0, _getLoaders.default)(isProd);
  defaultPlugins.push(new _webpack.DefinePlugin({
    'process.env': (0, _env.default)(mode)
  }));
  const webpackConf = {
    mode: env,
    devtool: isProd ? false : 'cheap-module-source-map',
    target: isProd ? 'browserslist' : 'web',
    entry: {
      app: _paths.default.appIndex
    },
    output: {
      filename: 'js/[name].[contenthash:8].js',
      path: _paths.default.appBuild,
      assetModuleFilename: 'images/[name].[contenthash:8].[ext]'
    },
    plugins: defaultPlugins,
    module: {
      rules: defaultLoaders
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        Src: _paths.default.appSrc,
        Components: _paths.default.appSrcComponents,
        Utils: _paths.default.appSrcUtils
      }
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename]
      }
    },
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [new _terserWebpackPlugin.default({
        extractComments: false,
        terserOptions: {
          compress: {
            pure_funcs: ['console.log']
          }
        }
      }), new _cssMinimizerWebpackPlugin.default()] : [],
      splitChunks: {
        chunks: 'all',
        minSize: 0
      }
    }
  }; // if (!isProd) {
  //   webpackConf.devServer = {
  //     host: SERVER_HOST,
  //     port: SERVER_PORT,
  //     stats: 'errors-only',
  //     clientLogLevel: 'silent',
  //     compress: true,
  //     open: true,
  //     hot: true,
  //     noInfo: true,
  //     historyApiFallback: true,
  //   };
  // }

  return webpackConf;
};

module.exports = getGeneratorWebpackConf;