//
//  The MIT License
//
//  Copyright (C) 2017-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

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
