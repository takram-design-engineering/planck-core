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
    reporters: ['spec', 'coverage'],
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'text' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ]
    },
    webpack,
    sauceLabs: {
      testName: pkg.name,
      build: `${pkg.version} (${Date.now()})`,
      recordScreenshots: false
    },
    customLaunchers,
    browsers: Object.keys(customLaunchers),
    singleRun: true,

    // SauceLabs provides a limited amount of browsers at once
    concurrency: 5,

    // Increase timeout values 3 times longer than the standard values
    captureTimeout: 180000,
    browserNoActivityTimeout: 30000,
    browserDisconnectTimeout: 6000,
    processKillTimeout: 6000
  })
}
