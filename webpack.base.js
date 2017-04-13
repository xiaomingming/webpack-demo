const webpack = require('webpack');
const path = require('path');
const importOnce = require('node-sass-import-once');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ASSETS = path.join(__dirname, './src');
const config = function(options) {
	return {
		entry: {
			index: './src/js/app/index.js',
			common: ['./src/js/libs/jquery.js'] //入口抽取共用文件
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
				test: /\.(html|ejs)$/, //html-loader可以处理前景图路径
				use: 'html-loader'
			}, {
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						minified: true,
						presets: [
							['es2015', {
								modules: false
							}]
						],
						plugins: ['syntax-dynamic-import'],
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
		plugins: [
			new webpack.ProvidePlugin({
				$: 'jquery', //此处的jquery需要使用alias漏出的别名，$则代表暴露在代码中的变量
				jQuery: 'jquery'
			}),
			new webpack.optimize.CommonsChunkPlugin({
				names: ["common", "manifest"] // vendor libs + extracted manifest
					// minChunks: Infinity,
			}),
			new webpack.HashedModuleIdsPlugin(),
			new WebpackChunkHash(),
			new ChunkManifestPlugin({
				filename: "chunk-manifest.json",
				manifestVariable: "webpackManifest"
			}),

			new HtmlWebpackPlugin({
				title: 'my web App',
				filename: 'index.html',

				template: './src/index.ejs',
				inject: 'body',

				chunks: ['index', 'common', 'manifest']

			}),
			new InlineChunkManifestHtmlWebpackPlugin({
				filename: "chunk-manifest.json",
				manifestVariable: "webpackManifest"
			}),
		]
	}
};
module.exports = config;