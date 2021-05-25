import Webpack from 'webpack';
import getGeneratorWebpackConf from './conf/getGeneratorWebpackConf';
import logger from './conf/logger';

const build = async (mode = 'dev', report) => {
  const webpackBuildConf = getGeneratorWebpackConf('production', mode, report);

  Webpack(webpackBuildConf, (err) => {
    if (err) {
      logger.error(err);
    }
  });
};

module.exports = build;
