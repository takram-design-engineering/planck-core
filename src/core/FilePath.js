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

import Environment from '../core/Environment'
import Namespace from '../core/Namespace'

let path
if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  path = require('path')
}

export const internal = Namespace('FilePath')

export default class FilePath {
  static get self() {
    switch (Environment.type) {
      case 'browser':
        return document.currentScript.src
      case 'worker':
        return self.location.href
      case 'node':
        return __filename
      default:
        break
    }
    throw new Error()
  }

  static resolve(arg, ...rest) {
    let separator
    let root
    if (Environment.type !== 'node') {
      separator = '/'
      root = `${this.self.split('/').slice(0, -2).join('/')}/`
    } else {
      separator = path.sep
      root = ''
    }
    let first = arg
    if (first.startsWith(root)) {
      first = first.substr(root.length)
    }
    const parts = [
      ...resolveRelativePath(first.split(separator)),
      ...resolveRelativePath(rest.reduce((parts, part) => {
        return [...parts, ...part.split(separator)]
      }, [])),
    ]
    return root + parts.join(separator)
  }
}

function resolveRelativePath(parts) {
  return parts.reduce((result, part) => {
    if (part.length === 0 || part === '.') {
      return result
    }
    if (part === '..') {
      result.pop()
      return result
    }
    return [...result, part]
  }, [])
}
