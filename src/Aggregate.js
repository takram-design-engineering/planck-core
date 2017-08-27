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

import AggregateFunction from './AggregateFunction'
import Namespace from './Namespace'

export const internal = Namespace('Aggregate')

export default class Aggregate {
  // This constructor provides for inheritance only
  constructor(namespace, ...targets) {
    if (namespace !== internal) {
      throw new Error()
    }
    const scope = internal(this)
    scope.targets = targets
  }

  set(target, property, value, receiver) {
    const scope = internal(this)
    const targets = scope.targets
    for (let i = 0; i < targets.length; ++i) {
      targets[i][property] = value
    }
    // eslint-disable-next-line no-param-reassign
    target[property] = value
    return true
  }

  get(target, property, receiver) {
    const scope = internal(this)
    const targets = scope.targets
    for (let i = 0; i < targets.length; ++i) {
      if (typeof target[property] !== 'function') {
        return scope.targets[0][property]
      }
    }
    const args = []
    for (let i = 0; i < targets.length; ++i) {
      const target = targets[i]
      args.push(target[property].bind(target))
    }
    return AggregateFunction.new(...args)
  }

  static new(...args) {
    const instance = new this(internal, ...args)
    return new Proxy({}, instance)
  }
}
