// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import nullify from '@shotamatsuda/rollup-plugin-nullify'

const globals = {
  'chai': 'chai',
  'mocha': 'mocha',
  'nock': 'nock',
  'sinon': 'sinon'
}

export default {
  input: './test/index.js',
  plugins: [
    nullify(['path']),
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
    ...Object.keys(globals),
    'source-map-support/register'
  ],
  output: {
    globals,
    intro: 'var BUNDLER = "rollup";',
    format: 'iife',
    file: './dist/test/rollup.js',
    sourcemap: true
  }
}
