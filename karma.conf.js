// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const pkg = require('./package.json')
const webpack = require('./webpack.config.test.js')

module.exports = function (config) {
  config.set({
    basePath: './',
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha'),
      require('karma-sourcemap-loader'),
      require('karma-spec-reporter'),
      require('karma-webpack')
    ],
    frameworks: ['mocha'],
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
    reporters: ['spec', 'coverage-istanbul'],
    proxies: {
      '/test/data/': '/base/test/data/',
      '/node_modules/': '/base/node_modules/',
      '/dist/': '/base/dist/'
    },
    coverageIstanbulReporter: {
      reports: ['text', 'text-summary', 'lcov'],
      dir: 'coverage/browser',
      combineBrowserReports: true
    },
    webpack,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    autoWatch: false,
    concurrency: Infinity
  })
}
