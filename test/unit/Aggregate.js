// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Aggregate } from '../..'

const { expect } = chai

describe('Aggregate', () => {
  class T {
    set(other) {
      this.value = other
    }
  }

  it('throws an error when new operator is used', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new Aggregate()
    }).throw(Error)
  })

  it('returns undefined if no there’s no targets', () => {
    const aggregate = Aggregate.new()
    expect(aggregate.value).undefined
  })

  it('stores property', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate.new(...targets)
    aggregate.property = true
    expect(aggregate.property).equal(true)
  })

  it('returns the property of the first target', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate.new(...targets)
    targets.forEach((target, index) => {
      // eslint-disable-next-line no-param-reassign
      target.value = index
    })
    expect(aggregate.value).equal(0)
  })

  it('propagates property set to all the targets', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate.new(...targets)
    aggregate.value = true
    targets.forEach(target => expect(target.value).equal(true))
  })

  it('propagates function call to all the targets', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate.new(...targets)
    aggregate.set('a')
    targets.forEach(target => expect(target.value).equal('a'))
  })
})
