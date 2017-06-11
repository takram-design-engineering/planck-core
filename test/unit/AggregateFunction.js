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

import { AggregateFunction } from '../..'

const expect = chai.expect
chai.use(sinonChai)

describe('AggregateFunction', () => {
  it('throws an error when new operator is used', () => {
    expect(() => {
      // eslint-disable-next-line no-new
      new AggregateFunction()
    }).throw(Error)
  })

  it('propagates call to all the targets', () => {
    const targets = [
      sinon.stub().returns('a'),
      sinon.stub().returns('b'),
      sinon.stub().returns('c'),
    ]
    const aggregate = AggregateFunction.new(...targets)
    const result = aggregate()
    targets.forEach(target => expect(target).calledOnce)
    expect(result[0]).equal('a')
    expect(result[1]).equal('b')
    expect(result[2]).equal('c')
  })
})
