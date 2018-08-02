// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

import pkg from './package.json'

export default {
  input: './src/index.js',
  external: [
    'fs',
    'path',
    'request',
    'util'
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({
      presets: [
        ['env', { modules: false }],
        'stage-3',
        'stage-2'
      ],
      plugins: [
        'external-helpers',
        ...(
          process.env.NODE_ENV === 'test'
            ? [['istanbul', { include: ['src/**/*.js'] }]]
            : []
        )
      ],
      babelrc: false
    })
  ],
  output: [
    {
      format: 'cjs',
      exports: 'named',
      file: pkg.main,
      sourcemap: true
    },
    {
      format: 'es',
      file: pkg.module,
      sourcemap: true
    }
  ]
}
