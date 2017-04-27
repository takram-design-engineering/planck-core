//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
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

/* eslint-disable no-console */

const buffer = require('vinyl-buffer')
const del = require('del')
const eslint = require('gulp-eslint')
const gulp = require('gulp')
const rename = require('gulp-rename')
const sequence = require('gulp-sequence')
const source = require('vinyl-source-stream')
const sourcemaps = require('gulp-sourcemaps')

// Javascript

const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const minifier = require('gulp-uglify/minifier')
const mocha = require('gulp-mocha')
const nodeResolve = require('rollup-plugin-node-resolve')
const rollup = require('rollup-stream')
const uglify = require('uglify-js')

// Build

gulp.task('build:main', () => {
  return rollup({
    entry: './src/main.js',
    format: 'umd',
    moduleName: 'Planck',
    sourceMap: true,
    plugins: [
      nodeResolve({ main: true, module: true, browser: true }),
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
      }),
    ],
  })
  .on('error', function error(error) {
    console.error(error.stack)
    this.emit('end')
  })
  .pipe(source('main.js', './src'))
  .pipe(buffer())
  .pipe(sourcemaps.init({ loadMaps: true }))
  .pipe(rename('planck-core.js'))
  .pipe(sourcemaps.write('.', {
    mapSources: source => {
      return `/src/${source}`
    },
  }))
  .pipe(gulp.dest('./build'))
})

gulp.task('build:module', () => {
  return rollup({
    entry: './src/main.js',
    format: 'es',
    plugins: [
      nodeResolve({ main: true, module: true, browser: true }),
      commonjs(),
      babel({
        presets: [
          'es2017',
          'stage-3',
        ],
        plugins: [
          'external-helpers',
        ],
      }),
    ],
  })
  .on('error', function error(error) {
    console.error(error.stack)
    this.emit('end')
  })
  .pipe(source('main.js', './src'))
  .pipe(buffer())
  .pipe(rename('planck-core.module.js'))
  .pipe(gulp.dest('./build'))
})

// Compress

gulp.task('compress:main', () => {
  return gulp.src([
    './build/planck-core.js',
  ])
  .pipe(minifier({
    mangle: false,
    compress: {
      unused: false,
      warnings: true,
    },
  }, uglify))
  .pipe(rename('planck-core.min.js'))
  .pipe(gulp.dest('./build'))
})

// Lint

gulp.task('lint', () => {
  return gulp.src([
    './gulpfile.js',
    './src/**/*.js',
    './test/**/*.js',
  ])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
})

// Test

gulp.task('test:build', () => {
  return rollup({
    entry: './test/test.js',
    format: 'cjs',
    plugins: [
      nodeResolve({ main: true, module: true }),
      commonjs(),
      babel({
        presets: [
          ['env', {
            targets: { node: 'current' },
            modules: false,
          }],
        ],
        plugins: [
          'external-helpers',
        ],
      }),
    ],
  })
  .on('error', function error(error) {
    console.error(error.stack)
    this.emit('end')
  })
  .pipe(source('test.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./build/test'))
})

gulp.task('test:start', () => {
  return gulp.src('./build/test/test.js', { read: false })
    .pipe(mocha({
      reporter: 'nyan',
    }))
    .on('error', function error(error) {
      this.emit('end')
    })
})

// Clean

gulp.task('clean', () => {
  return del('./build/*')
})

// Tasks

gulp.task('build', sequence(...[
  'clean',
  [
    'build:main',
    'build:module',
  ],
  'compress:main',
]))

gulp.task('test', sequence(...[
  'build:module',
  'test:build',
  'test:start',
]))
