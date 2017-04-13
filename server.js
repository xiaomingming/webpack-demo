//hot replace
const webpack = require('webpack');
// console.log(process.env.NODE_ENV);
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
const webpackConfig = require('./webpack.dev.js');
// const DashboardPlugin = require('webpack-dashboard/plugin'); //编译dashboard
const express = require('express');
let bs = require('browser-sync').create();
let opn = require('opn');
const app = express();
const webpackDevMiddleware = require('webpack-dev-middleware');
const webapckHotMiddleware = require('webpack-hot-middleware');
const port = '9000';

const compiler = webpack(webpackConfig);
// compiler.apply(new DashboardPlugin({
//  port: port
// }));
// handle fallback for HTML5 history API
// app.use(require('connect-history-api-fallback')());
const devMiddleware = webpackDevMiddleware(compiler, {
  hot: true,
  stats: {
    colors: true,
    chunks: false
  },
  noInfo: false, //打印打包信息
  publicPath: webpackConfig.output.publicPath
});

const hotMiddleware = webapckHotMiddleware(compiler, {
  log: console.log
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
});
app.use(devMiddleware);
app.use(hotMiddleware);
let uri = 'http://localhost:' + port
module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  opn(uri); //一个插件，用于自动打开浏览器
  console.log('Listening at ' + uri + '\n')
})