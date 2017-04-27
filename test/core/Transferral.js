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

import { Transferral } from '../..'

const chai = require('chai')

const expect = chai.expect

describe('Transferral', () => {
  describe('#encode', () => {
    it('returns buffer', () => {
      expect(Transferral.encode({})).instanceof(ArrayBuffer)
    })
  })

  describe('#decode', () => {
    it('returns object', () => {
      const encoded = Transferral.encode({})
      expect(typeof Transferral.decode(encoded)).equal('object')
    })
  })

  describe('#pack', () => {
    it('returns string', () => {
      expect(typeof Transferral.pack(new ArrayBuffer())).equal('string')
    })
  })

  describe('#unpack', () => {
    it('returns array buffer', () => {
      const packed = Transferral.pack(new ArrayBuffer())
      expect(Transferral.unpack(packed)).instanceof(ArrayBuffer)
    })
  })

  it('performs consistent encode/decode', () => {
    const object = { values: [1, 2, 3] }
    const encoded = Transferral.encode(object)
    const decoded = Transferral.decode(encoded)
    expect(Object.values(decoded).length).equal(1)
    expect(decoded.values.length).equal(3)
    decoded.values.forEach((value, index) => {
      expect(value).equal(object.values[index])
    })
  })

  it('performs consistent pack/unpack', () => {
    const array = new Float32Array([0, Math.PI, Math.E])
    const packed = Transferral.pack(array.buffer)
    const unpacked = new Float32Array(Transferral.unpack(packed))
    expect(unpacked.length).equal(3)
    unpacked.forEach((value, index) => {
      expect(value).equal(array[index])
    })
  })
})
