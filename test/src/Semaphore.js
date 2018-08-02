// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Semaphore } from '../..'

const { expect } = chai
chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('Semaphore', () => {
  it('throws error if invalid number of capacity is given', () => {
    expect(() => {
      new Semaphore(null)
    }).throws(Error)
  })

  it('resolves if a task finishes', () => {
    const semaphore = new Semaphore(10)
    return expect(semaphore.wait(resolve => {
      resolve('a')
    })).fulfilled.then(result => {
      expect(result).equal('a')
    })
  })

  it('rejects if a task throws error', () => {
    const semaphore = new Semaphore(10)
    const error = new Error()
    return expect(semaphore.wait(() => {
      throw error
    })).rejected.then(result => {
      expect(result).equal(error)
    })
  })

  it('supports async function as a task', () => {
    const semaphore = new Semaphore(10)
    const error = new Error()
    return Promise.all([
      expect(semaphore.wait(async () => {})).fulfilled,
      expect(semaphore.wait(async () => {
        throw error
      })).rejected.then(result => {
        expect(result).equal(error)
      })
    ])
  })

  it('allows calling resolve multiple times', () => {
    const semaphore = new Semaphore(10)
    return Promise.all([
      expect(semaphore.wait((resolve, reject) => {
        resolve(1)
        resolve(2)
      })).fulfilled.then(result => {
        expect(result).equal(1)
      }),
      expect(semaphore.wait(async (resolve, reject) => {
        resolve(1)
        return 2
      })).fulfilled.then(result => {
        expect(result).equal(1)
      })
    ])
  })

  it('allows calling reject multiple times', () => {
    const semaphore = new Semaphore(10)
    return Promise.all([
      expect(semaphore.wait((resolve, reject) => {
        reject(1)
        reject(2)
      })).rejected.then(result => {
        expect(result).equal(1)
      }),
      expect(semaphore.wait(async (resolve, reject) => {
        reject(1)
        return 2
      })).rejected.then(result => {
        expect(result).equal(1)
      })
    ])
  })

  it('runs all the tasks', () => {
    const semaphore = new Semaphore(10)
    const spies = []
    const tasks = Array(1000).fill().map(() => {
      const spy = sinon.spy(resolve => {
        resolve()
      })
      spies.push(spy)
      return semaphore.wait(spy)
    })
    return expect(Promise.all(tasks)).fulfilled.then(() => {
      expect(spies.length).equal(1000)
      spies.forEach(spy => {
        expect(spy).calledOnce
      })
    })
  })

  it('runs tasks below or equal its capacity', () => {
    const capacity = 10
    const semaphore = new Semaphore(capacity)
    let count = 0
    const spies = []
    const tasks = [
      ...Array(50).fill().map(() => {
        const spy = sinon.spy(resolve => {
          ++count
          expect(count).most(capacity)
          setTimeout(() => {
            --count
            expect(count).most(capacity)
            resolve()
          }, 10)
        })
        spies.push(spy)
        return semaphore.wait(spy)
      }),
      ...Array(50).fill().map(() => {
        const spy = sinon.spy(resolve => {
          ++count
          expect(count).most(capacity)
          const promise = new Promise(resolve => setTimeout(resolve, 10))
          promise.then(() => {
            --count
            expect(count).most(capacity)
          })
          return promise
        })
        spies.push(spy)
        return semaphore.wait(spy)
      })
    ]
    return expect(Promise.all(tasks)).fulfilled.then(() => {
      expect(spies.length).equal(100)
      spies.forEach(spy => {
        expect(spy).calledOnce
      })
    })
  })
})
