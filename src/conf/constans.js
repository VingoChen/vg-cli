import path from 'path';

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;

// Dev server host and port
const SERVER_HOST = 'localhost';
const SERVER_PORT = 9000;

// Whether to enable bundle package analysis
const SHOULD_OPEN_ANALYZER = false;
const ANALYZER_HOST = 'localhost';
const ANALYZER_PORT = '8888';

// Resource size limit
const IMAGE_INLINE_SIZE_LIMIT = 4 * 1024;

module.exports = {
  PROJECT_PATH,
  PROJECT_NAME,
  SERVER_HOST,
  SERVER_PORT,
  SHOULD_OPEN_ANALYZER,
  ANALYZER_HOST,
  ANALYZER_PORT,
  IMAGE_INLINE_SIZE_LIMIT,
};
