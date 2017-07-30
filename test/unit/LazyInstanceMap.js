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

import { LazyInstanceMap } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('LazyInstanceMap', () => {
  it('creates shared instances', () => {
    class T {}
    const instances = LazyInstanceMap(T)
    expect(instances.has('a')).false
    expect(instances.for('a')).equal(instances.for('a'))
    expect(instances.for('a')).not.equal(new T())
    expect(instances.has('a')).true
    expect(instances.has('b')).false
    expect(instances.for('b')).equal(instances.for('b'))
    expect(instances.for('b')).not.equal(new T())
    expect(instances.has('b')).true
    expect(instances.for('a')).not.equal(instances.for('b'))
  })

  it('creates shared instance with arguments', () => {
    class T {
      constructor(...args) {
        this.args = args
      }
    }
    const args = [1, 'a']
    const instances = LazyInstanceMap(T, ...args)
    expect(instances.has('a')).false
    expect(instances.for('a')).equal(instances.for('a'))
    expect(instances.for('a')).not.equal(new T())
    expect(instances.has('a')).true
    expect(instances.has('b')).false
    expect(instances.for('b')).equal(instances.for('b'))
    expect(instances.for('b')).not.equal(new T())
    expect(instances.has('b')).true
    expect(instances.for('a')).not.equal(instances.for('b'))
    expect(instances.for('a').args).deep.equal(args)
    expect(instances.for('b').args).deep.equal(args)
  })

  it('prefer new function over new operator', () => {
    const T = {
      new() {
        return {}
      },
    }
    const newStub = sinon.spy(T, 'new')
    const instances = LazyInstanceMap(T)
    expect(instances.for('a')).equal(instances.for('a'))
    expect(newStub).calledOnce
    expect(instances.for('a')).not.equal(T.new())
  })

  it('prefer new function over new operator with arguments', () => {
    const T = {
      new(...args) {
        return { args }
      },
    }
    const args = [1, 'a']
    const newStub = sinon.spy(T, 'new')
    const instances = LazyInstanceMap(T, ...args)
    expect(instances.for('a')).equal(instances.for('a'))
    expect(newStub).calledOnce
    expect(instances.for('a')).not.equal(T.new())
    expect(instances.for('a').args).deep.equal(args)
  })
})
