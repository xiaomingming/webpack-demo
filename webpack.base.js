const webpack = require('webpack');
const path = require('path');
const importOnce = require('node-sass-import-once');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ASSETS = path.join(__dirname, './src');
const config = function(options) {
	return {
		entry: {
			index: './src/js/app/index.js'
		},
		module: {
			noParse: /jquery/,
			rules: [{
				test: /\.css$/,
				include: [path.join(__dirname, ASSETS + '/css')],
				exclude: [], //string |string[]
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ['css-loader', {
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('autoprefixer')
								];
							}
						}
					}]
				})
			}, {
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', {
						loader: 'postcss-loader',
						options: {
							plugins: function() {
								return [
									require('autoprefixer')
								];
							}
						}
					}, {
						loader: 'sass-loader',
						options: {
							importer: importOnce,
							importOnce: {
								index: false,
								css: false,
								bower: false
							}
						}
					}]
				})
			}, {
				test: /\.(png|gif)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10240,
						name: "[name].[ext]?[hash:6]"
					}
				}

			}, {
				test: /\.(woff|svg|eot|ttf)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 100000
					}
				}

			}, {
				test: /\.jpg$/,
				use: {
					loader: 'file-loader',
					options: {
						name: "[name].[ext]" //加上[path]会改变图片打包的路径，比较恶心
					}
				}
			}, {
				test: /\.html$/,
				use: 'html-loader'
			}, {
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						minified: true,
						presets: 'es2015',
						ignore: /(node_modules|bower_components)/ //这样会忽略掉将对应目录下的js文件进行转换
					}
				}
			}]
		},
		resolve: {
			modules: [
				"node_modules",
				ASSETS + '/js'
			],
			alias: {
				"Style": ASSETS + '/css',
				"Js": ASSETS + '/js',
				"Libs": ASSETS + '/js/libs',
				"jquery": ASSETS + '/js/libs/jquery.js'
			}
		},
		context: __dirname,
		plugins: [new ExtractTextPlugin({
				filename: "[name].css"
			}), //不用显式导入模块，就可以自动导入
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery' //1.8.2版本的jquery导入时有问题，应当是不支持cmd格式导致的问题
			}),
			new HtmlWebpackPlugin({
				title: 'my web App',
				filename: 'index.html',
				template: './src/index.html',
				inject: 'body',
				chunks: ['index']
			})
		]
	}
};
module.exports = config;