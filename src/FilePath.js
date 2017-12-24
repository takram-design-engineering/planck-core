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

export function currentFilePath() {
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

export const resolve = (() => {
  return isNode ? nodePath.resolve : function resolve(...args) {
    return browserPath.resolve('/', ...args)
  }
})()

export const normalize = (() => {
  return isNode ? nodePath.normalize : browserPath.normalize
})()

export const join = (() => {
  return isNode ? nodePath.join : browserPath.join
})()

export const relative = (() => {
  return isNode ? nodePath.relative : browserPath.relative
})()

export const dirname = (() => {
  return isNode ? nodePath.dirname : browserPath.dirname
})()

export const basename = (() => {
  return isNode ? nodePath.basename : browserPath.basename
})()

export const extname = (() => {
  return isNode ? nodePath.extname : browserPath.extname
})()

export const delimiter = (() => {
  return isNode ? nodePath.delimiter : browserPath.delimiter
})()

export const sep = (() => {
  return isNode ? nodePath.sep : browserPath.sep
})()

export default {
  resolve,
  normalize,
  join,
  relative,
  dirname,
  basename,
  extname,
  delimiter,
  sep,
}
