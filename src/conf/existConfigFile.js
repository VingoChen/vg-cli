import fs from "fs";
import path from "path";
/**
 * 判断根目录是否存在config/vg.conifg.js 文件
 */
const existConfigFile = mode => {
	const appDirectory = fs.realpathSync(process.cwd());
	const defaultVgConfFile = path.resolve(appDirectory, "config/vg.config.js");
	const vgConfFile = path.resolve(appDirectory, `config/vg.${mode}.config.js`);

	if (fs.existsSync(vgConfFile)) {
		return require(vgConfFile);
	}

	if (fs.existsSync(defaultVgConfFile)) {
		return require(defaultVgConfFile);
	}

	return false;
};

module.exports = existConfigFile;
