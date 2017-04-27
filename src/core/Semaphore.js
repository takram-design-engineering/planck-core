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

import Namespace from '../core/Namespace'

export const internal = Namespace('Semaphore')

class Task {
  constructor(semaphore, callback) {
    const promises = [
      new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      }),
      new Promise(resolve => {
        this.let = resolve
      }).then(() => {
        callback(this.resolve, this.reject)
      }),
    ]
    this.promise = Promise.all(promises)
      .then(values => {
        semaphore.signal()
        return values[0]
      }, reason => {
        semaphore.signal()
        return Promise.reject(reason)
      })
  }
}

export default class Semaphore {
  constructor(capacity) {
    const scope = internal(this)
    scope.capacity = capacity
    scope.available = capacity
    scope.queue = []
  }

  wait(callback) {
    const scope = internal(this)
    const task = new Task(this, callback)
    if (scope.available === 0) {
      scope.queue.push(task)
    } else {
      --scope.available
      task.let()
    }
    return task.promise
  }

  signal() {
    const scope = internal(this)
    if (scope.queue.length === 0) {
      ++scope.available
    } else {
      scope.queue.shift().let()
    }
  }

  // Properties

  get capacity() {
    const scope = internal(this)
    return scope.capacity
  }

  get available() {
    const scope = internal(this)
    return scope.available
  }
}
