# webpack-demo

webpack基本使用，初始版本，尚未优化

# 使用
1. `npm install`
2. 进入开发模式：`npm start`
3. 进入打包模式：`npm run build`，可以通过`package.json`来决定使用哪种打包方式
4. 打包完成后检查模式：`npm run view`

# 注意
* webpack 生成的module依赖于`bable-loader`的配置
* `chunk-manifest-webpack-plugin` 官方最新版本v1.10-1.1.2有[bug](https://github.com/soundcloud/chunk-manifest-webpack-plugin/issues/47)，请勿更新，安装后先删除旧包，然后重新指定v1.0.0版本安装
```
npm i --save-dev chunk-manifest-webpack-plugin@1.0.0
```

