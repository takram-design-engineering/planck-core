// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { AssertionError } from '../..'

const { expect } = chai

describe('AssertionError', () => {
  it('supports instanceof', () => {
    expect(new AssertionError()).instanceof(AssertionError)
  })
})
