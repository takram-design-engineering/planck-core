// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'

import { Array } from '../..'

const { expect } = chai

describe('Array', () => {
  describe('#min', () => {
    it('finds minimum value', () => {
      const array = [3, 4, 1, 2]
      expect(Array.min(array)).equal(1)
    })

    it('finds minimum element', () => {
      const array = [
        { value: 3 },
        { value: 4 },
        { value: 1 },
        { value: 2 }
      ]
      expect(Array.min(array, ({ value }) => value)).equal(array[2])
    })

    it('returns undefined for empty arrays', () => {
      expect(Array.min([])).equal(undefined)
    })
  })

  describe('#max', () => {
    it('finds maximum value', () => {
      const array = [3, 4, 1, 2]
      expect(Array.max(array)).equal(4)
    })

    it('finds maximum element', () => {
      const array = [
        { value: 3 },
        { value: 4 },
        { value: 1 },
        { value: 2 }
      ]
      expect(Array.max(array, ({ value }) => value)).equal(array[1])
    })

    it('returns undefined for empty arrays', () => {
      expect(Array.max([])).equal(undefined)
    })
  })
})
