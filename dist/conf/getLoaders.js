"use strict";

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _constans = require("./constans");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {boolean} isProd 是否是生产环境
 */
const getLoaders = isProd => {
  const getCssLoaders = importLoaders => {
    return [isProd ? _miniCssExtractPlugin.default.loader : 'style-loader', {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: !isProd,
        importLoaders
      }
    }, {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [require('postcss-flexbugs-fixes'), isProd && ['postcss-preset-env', {
            autoprefixer: {
              grid: true,
              flexbox: 'no-2009'
            },
            stage: 3
          }]].filter(Boolean)
        }
      }
    }];
  };

  const defaultLoaders = [{
    test: /\.(tsx?|js)$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    },
    exclude: /node_modules/
  }, {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: _constans.IMAGE_INLINE_SIZE_LIMIT
      }
    }
  }, {
    test: /\.(ttf|woff|woff2|eot|otf)$/,
    type: 'asset/resource'
  }, {
    test: /\.css/,
    use: getCssLoaders(1)
  }, {
    test: /\.scss$/,
    use: [...getCssLoaders(2), {
      loader: 'sass-loader',
      options: {
        sourceMap: !isProd
      }
    }]
  }];
  return defaultLoaders;
};

module.exports = getLoaders;