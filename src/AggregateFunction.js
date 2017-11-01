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

export const internal = Namespace('AggregateFunction')

export default class AggregateFunction {
  // This constructor provides for inheritance only
  constructor(namespace, ...targets) {
    if (namespace !== internal) {
      throw new Error()
    }
    const scope = internal(this)
    scope.targets = targets
  }

  apply(target, bound, args) {
    const scope = internal(this)
    const { targets } = scope
    const result = []
    for (let i = 0; i < targets.length; ++i) {
      result.push(targets[i].apply(bound, args))
    }
    return result
  }

  static new(...args) {
    const instance = new this(internal, ...args)
    return new Proxy(() => {}, instance)
  }
}
