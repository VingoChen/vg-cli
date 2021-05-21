import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getGeneratorWebpackConf from './conf/getGeneratorWebpackConf';
import devServerConf from './conf/devServerConf';
import { SERVER_HOST, SERVER_PORT } from './conf/constans';
import logger from './conf/logger';
import { choosePort } from './util';

const dev = () => {
  const webpackDevConf = getGeneratorWebpackConf('development');

  const compiler = Webpack(webpackDevConf);

  const server = new WebpackDevServer(compiler, devServerConf);

  choosePort(SERVER_PORT, SERVER_HOST)
    .then((resPort) => {
      if (resPort !== null) {
        server.listen(resPort, SERVER_HOST, (err) => {
          console.log(process.env);
          if (err) {
            return logger.error(err.message);
          }
          return logger.start(resPort, SERVER_HOST);
        });
      }
    })
    .catch((error) => {
      console.log(chalk.red(error.message));
    });
};

module.exports = dev;
