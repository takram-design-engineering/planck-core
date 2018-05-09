// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'test/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist/test'),
    filename: 'webpack.js'
  },
  devtool: 'source-map',
  externals: {
    'chai': 'chai',
    'mocha': 'mocha',
    'nock': 'nock',
    'sinon': 'sinon',
    'source-map-support/register': 'null'
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
                'stage-2'
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'BUNDLER': JSON.stringify('webpack')
    })
  ]
}
