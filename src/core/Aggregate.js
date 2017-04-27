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

import AggregateFunction from '../core/AggregateFunction'
import Namespace from '../core/Namespace'

export const internal = Namespace('Aggregate')

export default class Aggregate {
  // This constructor provides for inheritance only
  constructor(targets = []) {
    const scope = internal(this)
    scope.targets = targets
  }

  set(target, property, value, receiver) {
    const scope = internal(this)
    scope.targets.forEach(target => {
      Reflect.set(target, property, value)
    })
    return Reflect.set(target, property, value, receiver)
  }

  get(target, property, receiver) {
    const scope = internal(this)
    const aggregative = scope.targets.every(target => {
      return typeof Reflect.get(target, property) === 'function'
    })
    if (aggregative) {
      return AggregateFunction.new(scope.targets.map(target => {
        return Reflect.get(target, property).bind(target)
      }))
    }
    return Reflect.get(scope.targets[0], property, receiver)
  }

  getPrototypeOf(target) {
    return this.constructor.prototype
  }

  static new(...args) {
    const instance = new this(...args)
    return new Proxy({}, instance)
  }
}
