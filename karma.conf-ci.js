// The MIT License
// Copyright (C) 2017-Present Shota Matsuda

const pkg = require('./package.json')
const webpack = require('./webpack.config.test.js')

module.exports = function (config) {
  const customLaunchers = {
    'Windows Edge': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'microsoftedge',
      version: '13.10586'
    },
    'Windows Firefox': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'firefox',
      version: '29.0'
    },
    'Windows Chrome': {
      base: 'SauceLabs',
      platform: 'Windows 10',
      browserName: 'chrome',
      version: '49.0'
    },
    'Linux Firefox': {
      base: 'SauceLabs',
      platform: 'Linux',
      browserName: 'firefox',
      version: '29.0'
    },
    'Mac Safari': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'safari',
      version: '10.0'
    },
    'Mac Firefox': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'firefox',
      version: '29.0'
    },
    'Mac Chrome': {
      base: 'SauceLabs',
      platform: 'OS X 10.11',
      browserName: 'chrome',
      version: '49.0'
    }
  }

  config.set({
    basePath: './',
    plugins: [
      require('karma-coverage-istanbul-reporter'),
      require('karma-mocha'),
      require('karma-sauce-launcher'),
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
      { pattern: 'dist/*.js', included: false }
    ],
    preprocessors: {
      'test/src/**/*.js': ['webpack', 'sourcemap']
    },
    proxies: {
      '/test/data/': '/base/test/data/',
      '/node_modules/': '/base/node_modules/',
      '/dist/': '/base/dist/'
    },
    reporters: ['spec', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['text', 'text-summary', 'lcov'],
      dir: 'coverage/browser',
      combineBrowserReports: true
    },
    webpack,
    sauceLabs: {
      testName: pkg.name,
      build: `${pkg.version} (${Date.now()})`,
      public: 'public'
    },
    customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true,
    autoWatch: false,

    // SauceLabs provides a limited amount of browsers at once
    concurrency: 2,

    // Increase timeout values 5 times longer than the standard values
    captureTimeout: config.captureTimeout * 5,
    browserNoActivityTimeout: config.browserNoActivityTimeout * 5,
    browserDisconnectTimeout: config.browserDisconnectTimeout * 5,
    processKillTimeout: config.processKillTimeout * 5
  })
}
