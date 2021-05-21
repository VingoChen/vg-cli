import webpack from 'webpack';
import getGeneratorWebpackConf from './conf/getGeneratorWebpackConf';

const build = () => {
  const webpackBuildConf = getGeneratorWebpackConf('production');
  webpack(webpackBuildConf);
};

module.exports = build;
