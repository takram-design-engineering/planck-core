// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'

import { Hash } from '../..'

const { expect } = chai

describe('Hash', () => {
  it('generates stable hashes for objects', () => {
    const hash1 = Hash({ a: 'a', b: [1, 2, { a: 'a', b: 'b' }] })
    const hash2 = Hash({ b: [1, 2, { b: 'b', a: 'a' }], a: 'a' })
    const hash3 = Hash({ a: 'a', b: [{ a: 'a', b: 'b' }, 1, 2] })
    expect(hash1).equal(hash2)
    expect(hash1).not.equal(hash3)
  })
})
