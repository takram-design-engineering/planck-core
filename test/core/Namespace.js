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

const chai = require('chai')
const sinon = require('sinon')

const { Namespace } = require('../..')

const expect = chai.expect
chai.use(require('sinon-chai'))

describe('Namespace', () => {
  it('works', () => {
    const namespace = Namespace()
    const object = {}
    const scope = namespace(object)
    expect(scope.a).undefined
    scope.a = 'a'
    expect(scope.a).equal('a')
  })

  it('accepts init and is called once', () => {
    const init = sinon.stub().returns({
      a: 'a',
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
