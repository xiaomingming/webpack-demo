const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js');
const config = function(env) {
  return webpackMerge(commonConfig(), {
    output: {
      path: path.resolve(__dirname, './dist'),
      // pathinfo: true,
      publicPath: './', //设置静态资源的路径
      filename: '[name].[chunkhash].js', //name对应入口的key值,可以添加hash [hash]|[chunkhash]
      // chunkFilename: '[chunkhash:8].js',
      library: 'MyPlugin', //打包后的文件对外暴露的接口名称
      libraryTarget: 'umd', //打包格式
      // sourceMapFilename: '[hash].[id].map'
    },
    module: {
      rules: [{
        test: /\.(png|gif)$/,
        use: {
          loader: 'image-webpack-loader',
          options: {
            optipng: {
              optimizationLevel: 7
            },
            gifsicle: {
              interlaced: false
            },
            pngquant: {
              quality: "65-90",
              speed: 4
            }
          }
        }

      }, {
        test: /\.jpg$/,
        use: {
          loader: 'image-webpack-loader',
          options: {
            optipng: {
              optimizationLevel: 7
            },
            mozjpeg: {
              quality: 80
            }
          }

        }
      }]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        // beautify: false,
        // mangle: {
        //  screw_ie8: true,
        //  keep_fnames: true
        // },
        // compress: {
        //  screw_ie8: true
        // },
        // comments: false

      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('prod')
        }
      }),
      new ExtractTextPlugin({
        filename: "[name].css?[chunkhash:8]"
      }), //不用显式导入模块，就可以自动导入
    ],
    externals: {
      // jquery: '$' //key为alia别名，$为该组件暴露给window全局的定义
    },
    // 性能考量，提示
    performance: {
      hints: 'warning', //设置为error，文件体积超标，则编译不通过
      // maxAssetSize: 200000, //bytes，打包后的文件体积
      // maxEntrypointSize: 400000, //bytes,入口文件体积
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      }
    }
  })
};
module.exports = config;