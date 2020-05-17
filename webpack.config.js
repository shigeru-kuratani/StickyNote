const webpack = require("webpack");
const path = require('path');

const config = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'out'),
    filename: 'index.js'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.resolve(__dirname, 'node_modules'),
      loader: 'babel-loader',
      query:{
        presets: ['react', 'es2015'],
      }
    }]
  },
  mode: 'development'
};

module.exports = config;
