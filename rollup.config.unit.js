// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import path from 'path'

const pkg = require('./package.json')

export default {
  input: './test/unit.js',
  sourcemap: true,
  plugins: [
    nodeResolve({ browser: true }),
    commonjs(),
    babel({
      presets: [
        ['es2015', { modules: false }],
        'es2016',
        'es2017',
        'stage-3',
      ],
      plugins: [
        'external-helpers',
      ],
      babelrc: false,
    }),
  ],
  intro: 'var BUNDLER = "rollup";',
  external: [
    'source-map-support/register',
    'd3-dsv',
    path.resolve(pkg.browser),
    'chai',
    'mocha',
    'nock',
    'sinon',
  ],
  globals: {
    'd3-dsv': 'd3',
    [path.resolve(pkg.browser)]: 'Planck',
    'chai': 'chai',
    'mocha': 'mocha',
    'nock': 'nock',
    'sinon': 'sinon',
  },
  output: {
    format: 'iife',
    file: './dist/test/unit/rollup.js',
  },
}
