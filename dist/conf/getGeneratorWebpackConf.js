"use strict";

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _cssMinimizerWebpackPlugin = _interopRequireDefault(require("css-minimizer-webpack-plugin"));

var _webpack = require("webpack");

var _webpackBundleAnalyzer = _interopRequireDefault(require("webpack-bundle-analyzer"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _paths = _interopRequireDefault(require("./paths"));

var _getLoaders = _interopRequireDefault(require("./getLoaders"));

var _getPlugins = _interopRequireDefault(require("./getPlugins"));

var _existConfigFile = _interopRequireDefault(require("./existConfigFile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string} env webpack环境 development | production
 */
const getGeneratorWebpackConf = (env, mode, report) => {
  if (!env) {
    return {};
  }

  const isProd = env === 'production';
  const defaultPlugins = (0, _getPlugins.default)(isProd);
  const defaultLoaders = (0, _getLoaders.default)(isProd); // 处理根目录config配置

  const existConfig = (0, _existConfigFile.default)(mode);
  let config = {};

  if (existConfig) {
    const {
      define = {},
      proxy = {},
      alias = {},
      analyze,
      configureWebpack
    } = existConfig; // define

    const defineStringified = {};
    Object.keys(define).forEach(key => {
      defineStringified[key] = JSON.stringify(define[key]);
    }); // alias

    const appDirectory = _fs.default.realpathSync(process.cwd());

    Object.keys(alias).forEach(key => {
      alias[key] = _path.default.resolve(appDirectory, alias[key]);
    }); // analyze

    if (analyze && report === '1') {
      defaultPlugins.push(new _webpackBundleAnalyzer.default.BundleAnalyzerPlugin(analyze));
    }

    config = {
      proxy,
      defineStringified,
      alias,
      analyze,
      configureWebpack
    };
  }

  defaultPlugins.push(new _webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      ...config.defineStringified
    }
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
        '@': _paths.default.appSrc,
        ...config.alias
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
  };

  if (!isProd) {
    webpackConf.devServer = {
      stats: 'errors-only',
      clientLogLevel: 'silent',
      compress: true,
      open: true,
      hot: true,
      noInfo: true,
      historyApiFallback: true,
      proxy: config.proxy
    };
  }

  return (0, _webpackMerge.default)(config.configureWebpack, webpackConf);
};

module.exports = getGeneratorWebpackConf;