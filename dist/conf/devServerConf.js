"use strict";

var _constans = require("./constans");

module.exports = {
  host: _constans.SERVER_HOST,
  port: _constans.SERVER_PORT,
  stats: 'errors-only',
  clientLogLevel: 'silent',
  compress: true,
  open: true,
  hot: true,
  noInfo: true,
  historyApiFallback: true
};