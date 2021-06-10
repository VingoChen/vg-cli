import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import { DefinePlugin } from "webpack";
import BundleAnalyzerPlugin from "webpack-bundle-analyzer";
import merge from "webpack-merge";
import path from "path";
import fs from "fs";
import paths from "./paths";
import getLoaders from "./getLoaders";
import getPlugins from "./getPlugins";
import existConfigFile from "./existConfigFile";

/**
 * @param {string} env webpack环境 development | production
 */
const getGeneratorWebpackConf = (env, mode, report) => {
	if (!env) {
		return {};
	}
	const isProd = env === "production";
	const defaultPlugins = getPlugins(isProd);
	const defaultLoaders = getLoaders(isProd);

	// 处理根目录config配置
	const existConfig = existConfigFile(mode);
	let config = {};
	if (existConfig) {
		const {
			define = {},
			proxy = {},
			alias = {},
			analyze,
			configureWebpack = {},
		} = existConfig;

		// define
		const defineStringified = {};
		Object.keys(define).forEach(key => {
			defineStringified[key] = JSON.stringify(define[key]);
		});

		// alias
		const appDirectory = fs.realpathSync(process.cwd());
		Object.keys(alias).forEach(key => {
			alias[key] = path.resolve(appDirectory, alias[key]);
		});

		// analyze
		if (analyze && report === "1") {
			defaultPlugins.push(
				new BundleAnalyzerPlugin.BundleAnalyzerPlugin(analyze)
			);
		}

		config = {
			proxy,
			defineStringified,
			alias,
			analyze,
			configureWebpack,
		};
	}
	let define = {
		"process.env": {
			NODE_ENV: JSON.stringify(env),
		},
		...(config.defineStringified || {}),
	};
	defaultPlugins.push(new DefinePlugin(define));

	const webpackConf = {
		mode: env,
		devtool: isProd ? false : "cheap-module-source-map",
		target: isProd ? "browserslist" : "web",
		entry: {
			app: paths.appIndex,
		},
		output: {
			filename: "js/[name].[contenthash:8].js",
			path: paths.appBuild,
			assetModuleFilename: "images/[name].[contenthash:8].[ext]",
		},
		plugins: defaultPlugins,
		module: {
			rules: defaultLoaders,
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js", ".json"],
			alias: {
				"@": paths.appSrc,
				...config.alias,
			},
		},
		cache: {
			type: "filesystem",
			buildDependencies: {
				config: [__filename],
			},
		},
		optimization: {
			minimize: isProd,
			minimizer: isProd
				? [
						new TerserPlugin({
							extractComments: false,
							terserOptions: {
								compress: { pure_funcs: ["console.log"] },
							},
						}),
						new CssMinimizerPlugin(),
				  ]
				: [],
			splitChunks: {
				chunks: "all",
				minSize: 0,
			},
		},
	};
	if (!isProd) {
		webpackConf.devServer = {
			stats: "errors-only",
			clientLogLevel: "silent",
			compress: true,
			open: true,
			hot: true,
			noInfo: true,
			historyApiFallback: true,
			proxy: config.proxy || {},
		};
	}

	return merge(config.configureWebpack || {}, webpackConf);
};

module.exports = getGeneratorWebpackConf;
