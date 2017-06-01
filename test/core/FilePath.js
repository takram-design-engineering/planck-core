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

import { Environment, FilePath } from '../..'

const expect = chai.expect

describe('FilePath', () => {
  it('returns an absolute path', () => {
    expect(FilePath.resolve('path')).equal('path')
  })

  it('joins components', () => {
    expect(FilePath.resolve('./a', './b')).equal('a/b')
    expect(FilePath.resolve('a', '', 'b')).equal('a/b')
    expect(FilePath.resolve('a', '/', 'b')).equal('a/b')
    expect(FilePath.resolve('a', 'b', '')).equal('a/b')
  })

  it('normalizes relative parts but no above root', () => {
    expect(FilePath.resolve('../a')).equal('a')
    expect(FilePath.resolve('a', '../b')).equal('a/b')
    expect(FilePath.resolve('../a/../b', '../c/d', '../e')).equal('b/c/e')
  })

  it('normalizes relative parts but no above root', () => {
    expect(FilePath.resolve('/')).equal('')
    expect(FilePath.resolve('/a')).equal('a')
    expect(FilePath.resolve('/a', '/b')).equal('b')
  })
})
