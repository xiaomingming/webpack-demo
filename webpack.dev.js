const webpack = require('webpack');
const path = require('path');
const importOnce = require('node-sass-import-once');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.base.js')();
const hotReplaceScript = 'webpack-hot-middleware/client?reload=true';
// add hot reload
Object.keys(commonConfig.entry).forEach(function(name) {
	commonConfig.entry[name] = [hotReplaceScript].concat(commonConfig.entry[name]);
});

const config = webpackMerge(commonConfig, {
	output: {
		path: path.resolve(__dirname, './dist/'),
		// pathinfo: true,
		publicPath: '/', //设置静态资源的路径
		filename: '[name].js', //name对应入口的key值,可以添加hash [hash]|[chunkhash],chunkhash好像有乱码。。。
		// chunkFilename: '[chunkhash:8].js',
		// library: 'MyPlugin', //打包后的文件对外暴露的接口名称
		libraryTarget: 'umd', //打包格式
		// sourceMapFilename: '[hash].[id].map'
	},
	devtool: 'sourcemap',
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('dev')
			}
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.NamedModulesPlugin(),
	]
});
module.exports = config;