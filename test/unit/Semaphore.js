// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Semaphore } from '../..'

const { expect } = chai

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
})
