import { SERVER_HOST, SERVER_PORT } from './constans';

module.exports = {
  host: SERVER_HOST,
  port: SERVER_PORT,
  stats: 'errors-only',
  clientLogLevel: 'silent',
  compress: true,
  open: true,
  hot: true,
  noInfo: true,
  historyApiFallback: true,
};
