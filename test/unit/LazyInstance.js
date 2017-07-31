//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import chai from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'

import { LazyInstance } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('LazyInstance', () => {
  it('creates shared instance', () => {
    class T {
      a() { return 'a' }
      get b() { return 'b' }
    }
    const instance = LazyInstance(T)
    expect(instance.a()).equal('a')
    expect(instance.b).equal('b')
  })

  it('creates shared instance with arguments', () => {
    class T {
      constructor(...args) {
        this.args = args
      }
      a() { return 'a' }
      get b() { return 'b' }
    }
    const args = [1, 'a']
    const instance = LazyInstance(T, ...args)
    expect(instance.a()).equal('a')
    expect(instance.b).equal('b')
    expect(instance.args).deep.equal(args)
  })

  it('prefer new function over new operator', () => {
    class T {
      a() { return 'a' }
      get b() { return 'b' }
    }
    const factory = {
      new() {
        return new T()
      },
    }
    const newStub = sinon.spy(factory, 'new')
    const instance = LazyInstance(factory)
    expect(newStub).not.called
    expect(instance.a()).equal('a')
    expect(instance.b).equal('b')
    expect(newStub).calledOnce
  })

  it('prefer new function over new operator with arguments', () => {
    class T {
      constructor(...args) {
        this.args = args
      }
      a() { return 'a' }
      get b() { return 'b' }
    }
    const factory = {
      new(...args) {
        return new T(...args)
      },
    }
    const args = [1, 'a']
    const newStub = sinon.spy(factory, 'new')
    const instance = LazyInstance(factory, ...args)
    expect(newStub).not.called
    expect(instance.a()).equal('a')
    expect(instance.b).equal('b')
    expect(instance.args).deep.equal(args)
    expect(newStub).calledOnce
  })
})
