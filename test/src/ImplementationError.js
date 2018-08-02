// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'

import { ImplementationError } from '../..'

const { expect } = chai

describe('ImplementationError', () => {
  it('supports instanceof', () => {
    expect(new ImplementationError()).instanceof(ImplementationError)
  })

  it('is instanceof Error', () => {
    expect(new ImplementationError()).instanceof(Error)
  })
})
