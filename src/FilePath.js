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

import browserPath from 'path-browserify'

import Environment from './Environment'
import External from './External'

const nodePath = External.node('path')

export function currentScriptPath() {
  switch (Environment.type) {
    case 'browser': {
      // eslint-disable-next-line no-underscore-dangle
      const currentScript = document.currentScript || document._currentScript
      return (currentScript && currentScript.src) || undefined
    }
    case 'worker':
      // eslint-disable-next-line no-restricted-globals
      return self.location.href
    case 'node':
      return __filename
    default:
      break
  }
  return undefined
}

let resolve
let normalize
let join
let relative
let dirname
let basename
let extname
let delimiter
let separator

if (Environment.type === 'node') {
  ({
    resolve,
    normalize,
    join,
    relative,
    dirname,
    basename,
    extname,
    delimiter,
    sep: separator,
  } = nodePath)
} else {
  resolve = function resolve(...paths) {
    return browserPath.resolve('/', ...paths)
  }
  ({
    normalize,
    join,
    relative,
    dirname,
    basename,
    extname,
    delimiter,
    sep: separator,
  } = browserPath)
}

export {
  resolve,
  normalize,
  join,
  relative,
  dirname,
  basename,
  extname,
  delimiter,
  separator,
}

export default {
  resolve,
  normalize,
  join,
  relative,
  dirname,
  basename,
  extname,
  delimiter,
  separator,

  self: initialScriptPath,

  get current() {
    return currentScriptPath()
  },
}
