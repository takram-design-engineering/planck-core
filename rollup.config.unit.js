// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import path from 'path'

import config from './rollup.config'
import pkg from './package.json'

export default {
  input: './test/unit.js',
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
        'es2016',
        'es2017',
        'stage-3',
        'stage-2'
      ],
      plugins: [
        'external-helpers'
      ],
      babelrc: false
    })
  ],
  external: [
    path.resolve(pkg.browser),
    'chai',
    'mocha',
    'nock',
    'sinon',
    'source-map-support/register'
  ],
  output: {
    intro: 'var BUNDLER = "rollup";',
    globals: {
      [path.resolve(pkg.browser)]: config.output.name,
      'chai': 'chai',
      'mocha': 'mocha',
      'nock': 'nock',
      'sinon': 'sinon',
      'd3-dsv': 'd3'
    },
    format: 'iife',
    file: './dist/test/unit/rollup.js',
    sourcemap: true
  }
}
