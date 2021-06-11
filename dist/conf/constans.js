"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PROJECT_PATH = _path.default.resolve(__dirname, "../");

const PROJECT_NAME = _path.default.parse(PROJECT_PATH).name;

const SERVER_HOST = "localhost";
const SERVER_PORT = 9000;
const IMAGE_INLINE_SIZE_LIMIT = 4 * 1024;
module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  IMAGE_INLINE_SIZE_LIMIT
};