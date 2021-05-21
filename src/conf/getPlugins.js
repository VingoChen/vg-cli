import { HotModuleReplacementPlugin, DefinePlugin } from 'webpack';
import ErrorOverlayPlugin from 'error-overlay-webpack-plugin';
import WebpackBar from 'webpackbar';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import paths from './paths';
import getEnvConf from './env';

/**
 * @param {boolean} isProd 是否是生产环境
 */
const getPlugins = (isProd) => {
  const devPlugins = [
    new HotModuleReplacementPlugin(),
    new ErrorOverlayPlugin(),
    new WebpackBar({
      name: 'RUNNING',
      color: '#52c41a',
    }),
  ];

  const prodPlugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    }),
    new WebpackBar({
      name: 'BUNDLING',
      color: '#722ed1',
    }),
  ];

  const defaultPlugins = [
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      cache: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          context: paths.appPublic,
          from: '*',
          to: paths.appBuild,
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: paths.appTsConfig,
      },
    }),
    new DefinePlugin({
      'process.env': getEnvConf(),
    }),
    ...(isProd ? prodPlugins : devPlugins),
  ];

  return defaultPlugins;
};

module.exports = getPlugins;
