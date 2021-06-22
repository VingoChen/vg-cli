import Webpack from "webpack";
import getGeneratorWebpackConf from "./conf/getGeneratorWebpackConf";

const build = async (mode = "dev", report) => {
	const webpackBuildConf = getGeneratorWebpackConf("production", mode, report);

	Webpack(webpackBuildConf, (err, stats) => {
		if (err) {
			console.error(err.stack || err);
			if (err.details) {
				console.error(err.details);
			}
			return;
		}

		const info = stats.toJson();

		if (stats.hasErrors()) {
			console.error(info.errors);
		}

		if (stats.hasWarnings()) {
			console.warn(info.warnings);
		}
		console.log(
			stats.toString({
				colors: true,
			})
		);
	});
};

module.exports = build;
