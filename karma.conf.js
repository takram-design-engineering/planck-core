// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const pkg = require('./package.json')
const webpack = require('./webpack.config.test.js')

module.exports = function (config) {
  config.set({
    basePath: './',
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/mocha/mocha.js',
      'node_modules/chai/chai.js',
      'node_modules/sinon/pkg/sinon.js',
      'test/src/**/*.js',
      { pattern: 'test/data/**/*', included: false },
      { pattern: pkg.browser[pkg.main], included: false }
    ],
    preprocessors: {
      'test/src/**/*.js': ['webpack', 'sourcemap']
    },
    frameworks: ['mocha'],
    reporters: ['spec', 'coverage'],
    proxies: {
      '/test/data/': '/base/test/data/',
      '/node_modules/': '/base/node_modules/',
      '/dist/': '/base/dist/'
    },
    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'text-summary' }
      ]
    },
    webpack,
    browsers: ['ChromeHeadless'],
    concurrency: Infinity
  })
}
