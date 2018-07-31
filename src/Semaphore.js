// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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
      .then(([value]) => {
        semaphore.signal()
        return value
      })
      .catch(error => {
        semaphore.signal()
        return Promise.reject(error)
      })
  }
}

export default class Semaphore {
  constructor (capacity) {
    this.capacity = capacity
    this.available = capacity
    this.queue = []
  }

  wait (callback) {
    const task = new Task(this, callback)
    if (this.available === 0) {
      this.queue.push(task)
    } else {
      --this.available
      task.permit()
    }
    return task.promise
  }

  signal () {
    if (this.queue.length === 0) {
      ++this.available
    } else {
      this.queue.shift().permit()
    }
  }
}
