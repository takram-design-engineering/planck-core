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

import Namespace from './Namespace'

export const internal = Namespace('Multiton')

export default class Multiton {
  constructor(key) {
    if (this.constructor.has(key)) {
      throw new Error(`Attempt to create multiple instances for key "${key}"`)
    }
    const scope = internal(this.constructor)
    scope.instances.set(key, this)
  }

  static has(key) {
    const scope = internal(this)
    if (scope.instances === undefined) {
      return false
    }
    const coercedKey = this.coerceKey(key)
    return scope.instances[coercedKey] !== undefined
  }

  static for(key, ...args) {
    const scope = internal(this)
    if (!scope.instances) {
      scope.instances = new Map()
    }
    const coercedKey = this.coerceKey(key)
    if (scope.instances.has(coercedKey)) {
      return scope.instances.get(coercedKey)
    }
    return this.new(coercedKey, ...args)
  }

  static new(key, ...args) {
    return new this(key, ...args)
  }

  static coerceKey(key) {
    return key
  }
}
