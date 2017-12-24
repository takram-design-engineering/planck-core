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

import { importNode } from './External'
import { isBrowser, isWorker, isNode } from './Environment'

const nodePath = importNode('path')

function currentScriptPath() {
  if (isBrowser) {
    // eslint-disable-next-line no-underscore-dangle
    const currentScript = document.currentScript || document._currentScript
    return (currentScript && currentScript.src) || undefined
  }
  if (isWorker) {
    // eslint-disable-next-line no-restricted-globals
    return self.location.href
  }
  if (isNode) {
    return __filename
  }
  return undefined
}

const initialScriptPath = currentScriptPath()

let aliases
if (isNode) {
  aliases = {
    resolve: nodePath.resolve,
    normalize: nodePath.normalize,
    join: nodePath.join,
    relative: nodePath.relative,
    dirname: nodePath.dirname,
    basename: nodePath.basename,
    extname: nodePath.extname,
    separator: nodePath.sep,
    delimiter: nodePath.delimiter,
  }
} else {
  aliases = {
    resolve(...paths) {
      return browserPath.resolve('/', ...paths)
    },
    normalize: browserPath.normalize,
    join: browserPath.join,
    relative: browserPath.relative,
    dirname: browserPath.dirname,
    basename: browserPath.basename,
    extname: browserPath.extname,
    separator: browserPath.sep,
    delimiter: browserPath.delimiter,
  }
}

export default {
  self: initialScriptPath,

  get current() {
    return currentScriptPath()
  },

  // Object rest spread must be placed at the last because this will be
  // transpiled to Object.assign with the above and aliases. Othewise current()
  // will become a static variable, not a getter function.
  ...aliases,
}
