import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IMAGE_INLINE_SIZE_LIMIT } from './constans';

/**
 * @param {boolean} isProd 是否是生产环境
 */
const getLoaders = (isProd) => {
  const getCssLoaders = (importLoaders) => {
    return [
      isProd ? MiniCssExtractPlugin.loader : 'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: false,
          sourceMap: !isProd,
          importLoaders,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              require('postcss-flexbugs-fixes'),
              isProd && [
                'postcss-preset-env',
                {
                  autoprefixer: {
                    grid: true,
                    flexbox: 'no-2009',
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
      loader: 'babel-loader',
      options: { cacheDirectory: true },
      exclude: /node_modules/,
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: IMAGE_INLINE_SIZE_LIMIT,
        },
      },
    },
    {
      test: /\.(ttf|woff|woff2|eot|otf)$/,
      type: 'asset/resource',
    },
    {
      test: /\.css/,
      use: getCssLoaders(1),
    },
    {
      test: /\.scss$/,
      use: [
        ...getCssLoaders(2),
        {
          loader: 'sass-loader',
          options: {
            sourceMap: !isProd,
          },
        },
      ],
    },
  ];
  return defaultLoaders;
};
module.exports = getLoaders;
