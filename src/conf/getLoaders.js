import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { IMAGE_INLINE_SIZE_LIMIT } from "./constans";

/**
 * @param {boolean} isProd 是否是生产环境
 */
const getLoaders = isProd => {
	const getCssLoaders = (importLoaders, isCssModule = true) => {
		return [
			isProd ? MiniCssExtractPlugin.loader : require.resolve("style-loader"),
			{
				loader: require.resolve("css-loader"),
				options: {
					modules: isCssModule
						? {
								mode: "local",
								localIdentName: "[name]__[local]--[hash:base64:5]",
						  }
						: false,
					sourceMap: !isProd,
					importLoaders,
				},
			},
			{
				loader: require.resolve("postcss-loader"),
				options: {
					postcssOptions: {
						plugins: [
							require("postcss-flexbugs-fixes"),
							isProd && [
								"postcss-preset-env",
								{
									autoprefixer: {
										grid: true,
										flexbox: "no-2009",
									},
									stage: 3,
								},
							],
						].filter(Boolean),
					},
				},
			},
		];
	};
	const defaultLoaders = [
		{
			test: /\.(tsx?|js)$/,
			loader: require.resolve("babel-loader"),
			options: { cacheDirectory: true },
			exclude: /node_modules/,
		},
		{
			test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/, /\.ico$/],
			type: "asset",
			parser: {
				dataUrlCondition: {
					maxSize: IMAGE_INLINE_SIZE_LIMIT,
				},
			},
		},
		{
			test: /\.(ttf|woff|woff2|eot|otf)$/,
			type: "asset/resource",
		},
		{
			test: /\.css/,
			exclude: /node_modules/,
			use: getCssLoaders(1),
		},
		{
			test: /\.css/,
			include: /node_modules/,
			use: getCssLoaders(1, false),
		},
		{
			test: /\.scss$/,
			include: /node_modules/,
			use: [
				...getCssLoaders(2, false),
				{
					loader: require.resolve("sass-loader"),
					options: {
						sourceMap: !isProd,
					},
				},
			],
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				...getCssLoaders(2),
				{
					loader: require.resolve("sass-loader"),
					options: {
						sourceMap: !isProd,
					},
				},
			],
		},
		{
			test: /\.less$/,
			include: /node_modules/,
			use: [
				...getCssLoaders(2, false),
				{
					loader: require.resolve("less-loader"),
					options: {
						sourceMap: !isProd,
						javascriptEnabled: true,
					},
				},
			],
		},
		{
			test: /\.less$/,
			exclude: /node_modules/,
			use: [
				...getCssLoaders(2),
				{
					loader: require.resolve("less-loader"),
					options: {
						sourceMap: !isProd,
						javascriptEnabled: true,
					},
				},
			],
		},
	];
	return defaultLoaders;
};
module.exports = getLoaders;
