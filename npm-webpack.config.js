const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EndWebpackPlugin = require('end-webpack-plugin');
const ncp = require('ncp').ncp;

const outputPath = path.resolve(__dirname, 'npm/dist');
module.exports = {
  entry: {
    redemo: './src/index.js',
  },
  output: {
    path: outputPath,
    filename: '[name].js',
  },
  resolve: {
    // 加快搜索速度
    modules: [path.resolve(__dirname, 'node_modules')],
    // es tree-shaking
    mainFields: ['jsnext:main', 'browser', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // cacheDirectory 缓存babel编译结果加快重新编译速度
        loader: 'babel-loader?cacheDirectory',
        // 只命中src目录里的js文件，加快webpack搜索速度
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.scss$/,
        // 提取出css
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 压缩css
          use: ['css-loader?minimize', 'sass-loader']
        }),
        // 只命中src目录里的js文件，加快webpack搜索速度
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        // 提取出css
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 压缩css
          use: ['css-loader?minimize'],
        }),
      },
      {
        test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
        loader: 'file-loader',
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true,
    }),
    new EndWebpackPlugin(() => {
      ncp('./package.json', './npm/package.json')
    }),
  ],
  devtool: 'source-map',
};
