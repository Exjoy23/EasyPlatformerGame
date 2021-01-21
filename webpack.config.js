'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  plugins: [
    // new HtmlWebpackPlugin({ template: './src/index.html' }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' },
        { from: 'src/css', to: 'css' },
        { from: 'src/index.html', to: '' }
      ]
    }),
  ],
  devtool: 'source-map',
  devServer: {
    overlay: true,
    open: true
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development'
};
