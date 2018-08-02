// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import chai from 'chai'

import { Aggregate, isAggregate } from '../..'

const { expect } = chai

describe('Aggregate', () => {
  class T {
    get () {
      return this.value
    }

    set (value) {
      this.value = value
    }
  }

  it('returns an empty array when no targets are given', () => {
    const aggregate = Aggregate()
    expect(aggregate.value).deep.equal([])
  })

  it('returns an array of properties of targets', () => {
    const targets = [{}, {}, {}]
    const aggregate = Aggregate(...targets)
    expect(aggregate.value).deep.equal([undefined, undefined, undefined])
    targets.forEach((target, index) => {
      target.value = index
    })
    expect(aggregate.value).deep.equal([0, 1, 2])
  })

  it('applies assignments to all the targets', () => {
    const targets = [{}, {}, {}]
    const aggregate = Aggregate(...targets)
    aggregate.value = true
    expect(aggregate.value).deep.equal([true, true, true])
    targets.forEach(target => expect(target.value).equal(true))
    aggregate.value = 1
    expect(aggregate.value).deep.equal([1, 1, 1])
    targets.forEach(target => expect(target.value).equal(1))
  })

  it('collects return values of target functions', () => {
    const targets = [() => 0, () => 1, () => 2]
    const aggregate = Aggregate(...targets)
    expect(aggregate()).deep.equal([0, 1, 2])
  })

  it('applies function calls to all the targets', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate(...targets)
    aggregate.set('a')
    expect(aggregate.value).deep.equal(['a', 'a', 'a'])
    targets.forEach(target => expect(target.value).equal('a'))
  })

  it('collects return values of target methods', () => {
    const targets = [new T(), new T(), new T()]
    const aggregate = Aggregate(...targets)
    targets.forEach((target, index) => { target.value = index })
    expect(aggregate.get()).deep.equal([0, 1, 2])
  })

  describe('#isAggregate', () => {
    it('returns true for aggregates', () => {
      expect(isAggregate).equal(Aggregate.isAggregate)
      expect(isAggregate(Aggregate())).equal(true)
      expect(isAggregate({})).equal(false)
      expect(isAggregate(null)).equal(false)
      expect(isAggregate()).equal(false)
    })
  })
})
