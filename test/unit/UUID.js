// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { UUID } from '../..'

const { expect } = chai

describe('UUID', () => {
  it('generates universally unique identifier', () => {
    expect(UUID()).a('string')
    const lengths = [8, 4, 4, 4, 12]
    UUID().split('-').forEach((group, index) => {
      expect(group.length).equal(lengths[index])
      expect(/^[0-9a-z]+$/.test(group)).true
    })
    expect(UUID()).not.equal(UUID())
  })
})
