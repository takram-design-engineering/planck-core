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
    class T {}
    const instance = LazyInstance(T)
    expect(instance.shared).equal(instance.shared)
    expect(instance.shared).not.equal(new T())
  })

  it('creates shared instance with arguments', () => {
    class T {
      constructor(...args) {
        this.args = args
      }
    }
    const args = [1, 'a']
    const instance = LazyInstance(T, ...args)
    expect(instance.shared).equal(instance.shared)
    expect(instance.shared).not.equal(new T())
    expect(instance.shared.args).deep.equal(args)
  })

  it('prefer new function over new operator', () => {
    const T = {
      new() {
        return {}
      },
    }
    const newStub = sinon.spy(T, 'new')
    const instance = LazyInstance(T)
    expect(instance.shared).equal(instance.shared)
    expect(newStub).calledOnce
    expect(instance.shared).not.equal(T.new())
  })

  it('prefer new function over new operator with arguments', () => {
    const T = {
      new(...args) {
        return { args }
      },
    }
    const args = [1, 'a']
    const newStub = sinon.spy(T, 'new')
    const instance = LazyInstance(T, ...args)
    expect(instance.shared).equal(instance.shared)
    expect(newStub).calledOnce
    expect(instance.shared).not.equal(T.new())
    expect(instance.shared.args).deep.equal(args)
  })
})
