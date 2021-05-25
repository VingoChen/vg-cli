import path from 'path';

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

const SERVER_HOST = 'localhost';
const SERVER_PORT = 9000;

const IMAGE_INLINE_SIZE_LIMIT = 4 * 1024;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  IMAGE_INLINE_SIZE_LIMIT,
};
