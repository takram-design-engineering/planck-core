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

import { Environment, FilePath, URL } from '../..'

const expect = chai.expect
const current = FilePath.current

describe('FilePath', () => {
  describe('#self', () => {
    it('matches the original script url', () => {
      const url = new URL(FilePath.self)
      if (Environment.type !== 'node') {
        expect(url.pathname).equal('/dist/planck-core.js')
      }
    })
  })

  describe('#current', () => {
    it('matches the current script url', () => {
      const url = new URL(current)
      if (Environment.type !== 'node') {
        expect(url.pathname).equal('/dist/test/unit.js')
      }
    })
  })
})
