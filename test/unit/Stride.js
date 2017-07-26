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

import { Stride } from '../..'

const expect = chai.expect

describe('Stride', () => {
  describe('#forEach', () => {
    it('works with 2 stride of an array', () => {
      const array = [0, 'a', 1, 'b', 2, 'c']
      let i = 0
      Stride.forEach(array, 2, (values, index) => {
        const [a, b] = values
        expect(a).equal(array[i * 2 + 0])
        expect(b).equal(array[i * 2 + 1])
        expect(index).equal(i)
        ++i
      })
      expect(i).equal(3)
    })

    it('works with 3 stride of an array', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C']
      let i = 0
      Stride.forEach(array, 3, (values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
      })
      expect(i).equal(3)
    })

    it('skips residue of a stride', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C', 3]
      let i = 0
      Stride.forEach(array, 3, (values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
      })
      expect(i).equal(3)
    })
  })
})
