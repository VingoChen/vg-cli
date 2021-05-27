import fs from "fs";
import path from "path";
/**
 * 判断根目录是否存在config/vg.conifg.js 文件
 */
const existConfigFile = mode => {
	const appDirectory = fs.realpathSync(process.cwd());
	const defaultVgConfFile = path.resolve(appDirectory, "config/vg.config.js");
	const vgConfFile = path.resolve(appDirectory, `config/vg.${mode}.config.js`);

	if (fs.existsSync(defaultVgConfFile)) {
		let configFile = {};
		if (fs.existsSync(vgConfFile)) {
			configFile = require(vgConfFile);
		} else {
			configFile = require(defaultVgConfFile);
		}
		return configFile;
	}

	return false;
};

module.exports = existConfigFile;
