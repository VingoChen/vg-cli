import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getGeneratorWebpackConf from './conf/getGeneratorWebpackConf';
import { SERVER_HOST, SERVER_PORT } from './conf/constans';
import logger from './conf/logger';
import { choosePort } from './util';

const dev = (mode = 'dev', port = SERVER_PORT, host = SERVER_HOST, report) => {
  const webpackDevConf = getGeneratorWebpackConf('development', mode, report);
  const devServerConf = webpackDevConf.devServer;

  const compiler = Webpack(webpackDevConf);

  const server = new WebpackDevServer(compiler, devServerConf);

  choosePort(port, host)
    .then((resPort) => {
      if (resPort !== null) {
        server.listen(resPort, host, (err) => {
          if (err) {
            return logger.error(err.message);
          }
          return logger.start(resPort, host);
        });
      }
    })
    .catch((error) => {
      console.log(chalk.red(error.message));
    });
};

module.exports = dev;
