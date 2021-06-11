"use strict";

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Get the working directory of the file executed by node
const appDirectory = _fs.default.realpathSync(process.cwd());
/**
 * Resolve absolute path from relative path
 * @param {string} relativePath relative path
 */


function resolveApp(relativePath) {
  return _path.default.resolve(appDirectory, relativePath);
} // Default module extension


const moduleFileExtensions = ["ts", "tsx", "js", "jsx"];
/**
 * Resolve module path
 * @param {function} resolveFn resolve function
 * @param {string} filePath
 * file path
 */

function resolveModule(resolveFn, filePath) {
  const extension = moduleFileExtensions.find(ex => _fs.default.existsSync(resolveFn(`${filePath}.${ex}`)));

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.ts`); // default is .ts
}

module.exports = {
  appBuild: resolveApp("build"),
  appPublic: resolveApp("public"),
  appIndex: resolveModule(resolveApp, "src/index"),
  // Package entry path
  appHtml: resolveApp("public/index.html"),
  appNodeModules: resolveApp("node_modules"),
  // node_modules path
  appSrc: resolveApp("src"),
  appProxySetup: resolveModule(resolveApp, "src/setProxy"),
  appPackageJson: resolveApp("package.json"),
  appTsConfig: resolveApp("tsconfig.json"),
  moduleFileExtensions
};