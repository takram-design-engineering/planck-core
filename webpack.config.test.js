// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  externals: {
    'chai': 'chai',
    'mocha': 'mocha',
    'nock': 'null',
    'sinon': 'sinon'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env',
                'stage-3',
                'stage-2'
              ]
            }
          }
        ]
      }
    ]
  }
}
