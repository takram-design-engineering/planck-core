// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Array } from '../..'

const { expect } = chai

describe('Array', () => {
  describe('#min', () => {
    it('finds minimum element', () => {
      const array = [
        { value: 3 },
        { value: 4 },
        { value: 1 },
        { value: 2 },
      ]
      expect(Array.min(array, element => element.value)).equal(array[2])
    })
  })

  describe('#max', () => {
    it('finds maximum element', () => {
      const array = [
        { value: 3 },
        { value: 4 },
        { value: 1 },
        { value: 2 },
      ]
      expect(Array.max(array, element => element.value)).equal(array[1])
    })
  })
})
