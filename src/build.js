import Webpack from 'webpack';
import getGeneratorWebpackConf from './conf/getGeneratorWebpackConf';
import BundleAnalyzerPlugin from 'webpack-bundle-analyzer';
import { ANALYZER_HOST, ANALYZER_PORT } from './conf/constans';
import logger from './conf/logger';

const build = (mode = 'dev', report) => {
  const webpackBuildConf = getGeneratorWebpackConf('production', mode);
  if (report === '1') {
    webpackBuildConf.plugins.push(
      new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: ANALYZER_HOST,
        analyzerPort: ANALYZER_PORT,
      }),
    );
  }

  Webpack(webpackBuildConf, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

module.exports = build;
