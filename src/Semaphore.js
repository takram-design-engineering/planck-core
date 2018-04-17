// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from './Namespace'

export const internal = Namespace('Semaphore')

class Task {
  constructor (semaphore, callback) {
    const promises = [
      new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      }),
      new Promise(resolve => {
        this.permit = resolve
      }).then(() => {
        callback(this.resolve, this.reject)
      })
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
  constructor (capacity) {
    const scope = internal(this)
    scope.capacity = capacity
    scope.available = capacity
    scope.queue = []
  }

  wait (callback) {
    const scope = internal(this)
    const task = new Task(this, callback)
    if (scope.available === 0) {
      scope.queue.push(task)
    } else {
      --scope.available
      task.permit()
    }
    return task.promise
  }

  signal () {
    const scope = internal(this)
    if (scope.queue.length === 0) {
      ++scope.available
    } else {
      scope.queue.shift().permit()
    }
  }

  get capacity () {
    return internal(this).capacity
  }

  get available () {
    return internal(this).available
  }
}
