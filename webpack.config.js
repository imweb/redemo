const fs = require('fs');
const path = require('path');
const { WebPlugin } = require('web-webpack-plugin');

module.exports = {
  output: {
    publicPath: '',
    filename: '[name].js',
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // es tree-shaking
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
    // 这些库都是不依赖其它库的库 不需要解析他们可以加快编译速度
    noParse: /node_modules\/(moment)/,
    loaders: [
      {
        test: /\.js$/,
        // cacheDirectory 缓存babel编译结果加快重新编译速度
        loader: 'babel-loader?cacheDirectory',
        // 只命中src目录里的js文件，加快webpack搜索速度
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: 'file-loader',
      },
    ]
  },
  entry: {
    doc: './src/doc/index.js',
  },
  plugins: [
    new WebPlugin({
      template: './src/doc/template.html',
      filename: 'index.html'
    }),
  ],
  devtool: 'source-map',
};
