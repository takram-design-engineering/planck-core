// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { Namespace } from '../..'

const { expect } = chai
chai.use(sinonChai)

describe('Namespace', () => {
  it('stores value', () => {
    const namespace = Namespace()
    const object = {}
    const scope = namespace(object)
    expect(scope.a).undefined
    scope.a = 'a'
    expect(scope.a).equal('a')
  })

  it('accepts init function and is called once', () => {
    const init = sinon.stub().returns({
      a: 'a'
    })
    const namespace = Namespace()
    const object = {}
    namespace(object, init)
    namespace(object, init)
    expect(init).calledOnce
    const scope = namespace(object)
    scope.a = 'a'
    expect(scope.a).equal('a')
  })
})
