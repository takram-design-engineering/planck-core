// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default class Semaphore {
  constructor (capacity = 1) {
    const number = +capacity
    if (Number.isNaN(number) || number < 1) {
      throw new Error(`Invalid number of capacity: ${capacity}`)
    }
    this.capacity = +capacity
    this.available = +capacity
    this.queue = []
  }

  async wait (callback) {
    let resolveTask
    let rejectTask
    let shift
    const promises = [
      new Promise((resolve, reject) => {
        resolveTask = resolve
        rejectTask = reject
      }),
      new Promise((resolve, reject) => {
        shift = resolve
      }).then(() => {
        const result = callback(resolveTask, rejectTask)
        if (result instanceof Promise) {
          return result.then(resolveTask).catch(rejectTask)
        }
        return result
      })
    ]
    if (this.available === 0) {
      this.queue.push(shift)
    } else {
      --this.available
      shift()
    }
    let result
    try {
      [result] = await Promise.all(promises)
    } catch (error) {
      this.signal()
      throw error
    }
    this.signal()
    return result
  }

  signal () {
    if (this.queue.length === 0) {
      ++this.available
    } else {
      this.queue.shift()()
    }
  }
}
