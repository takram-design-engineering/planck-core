// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { AggregateFunction } from '../..'

const { expect } = chai
chai.use(sinonChai)

describe('AggregateFunction', () => {
  it('throws an error when new operator is used', () => {
    expect(() => {
      return new AggregateFunction()
    }).throw(Error)
  })

  it('propagates call to all the targets', () => {
    const targets = [
      sinon.stub().returns('a'),
      sinon.stub().returns('b'),
      sinon.stub().returns('c')
    ]
    const aggregate = AggregateFunction.new(...targets)
    const result = aggregate()
    targets.forEach(target => expect(target).calledOnce)
    expect(result[0]).equal('a')
    expect(result[1]).equal('b')
    expect(result[2]).equal('c')
  })
})
