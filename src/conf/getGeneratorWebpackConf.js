import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { DefinePlugin } from 'webpack';
import paths from './paths';
import getLoaders from './getLoaders';
import getPlugins from './getPlugins';
import getEnvConf from './env';

/**
 * @param {string} env webpack环境 development | production
 */
const getGeneratorWebpackConf = (env, mode) => {
  if (!env) {
    return {};
  }
  const isProd = env === 'production';
  const defaultPlugins = getPlugins(isProd);
  const defaultLoaders = getLoaders(isProd);

  defaultPlugins.push(
    new DefinePlugin({
      'process.env': getEnvConf(mode),
    }),
  );

  const webpackConf = {
    mode: env,
    devtool: isProd ? false : 'cheap-module-source-map',
    target: isProd ? 'browserslist' : 'web',
    entry: {
      app: paths.appIndex,
    },
    output: {
      filename: 'js/[name].[contenthash:8].js',
      path: paths.appBuild,
      assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
    },
    plugins: defaultPlugins,
    module: {
      rules: defaultLoaders,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        Src: paths.appSrc,
        Components: paths.appSrcComponents,
        Utils: paths.appSrcUtils,
      },
    },
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    optimization: {
      minimize: isProd,
      minimizer: isProd
        ? [
            new TerserPlugin({
              extractComments: false,
              terserOptions: {
                compress: { pure_funcs: ['console.log'] },
              },
            }),
            new CssMinimizerPlugin(),
          ]
        : [],
      splitChunks: {
        chunks: 'all',
        minSize: 0,
      },
    },
  };
  // if (!isProd) {
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
