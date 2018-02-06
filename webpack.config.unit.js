// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const path = require('path')
const webpack = require('webpack')

const pkg = require('./package.json')

module.exports = {
  entry: [
    path.resolve(__dirname, 'test', 'unit.js'),
  ],
  output: {
    filename: 'webpack.js',
    path: path.resolve(__dirname, 'dist', 'test', 'unit'),
  },
  devtool: 'source-map',
  externals: {
    'source-map-support/register': 'null',
    'd3-dsv': 'd3',
    'chai': 'chai',
    'mocha': 'mocha',
    'nock': 'nock',
    'sinon': 'sinon',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'es2015',
                'es2016',
                'es2017',
                'stage-3',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.browser': JSON.stringify(true),
      'BUNDLER': JSON.stringify('webpack'),
    }),
  ],
}
