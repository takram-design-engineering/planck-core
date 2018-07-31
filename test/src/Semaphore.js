// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

import { Semaphore } from '../..'

const { expect } = chai
chai.use(chaiAsPromised)

describe('Semaphore', () => {
  it('runs tasks below or equal its capacity', () => {
    const semaphore = new Semaphore(10)
    let count = 0
    const callback = (resolve, reject) => {
      ++count
      expect(count).most(10)
      setTimeout(() => {
        --count
        expect(count).most(10)
        resolve()
      }, 10)
    }
    for (let i = 0; i < 1000; ++i) {
      semaphore.wait(callback)
    }
  })

  it('rejects if callback function throws error', () => {
    const semaphore = new Semaphore(10)
    const error = new Error()
    return expect(semaphore.wait(() => { throw error }))
      .rejected.then(result => {
        expect(result).equal(error)
      })
  })
})
