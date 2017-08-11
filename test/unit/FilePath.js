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

import 'source-map-support/register'

import chai from 'chai'

import { Environment, External, FilePath, URL } from '../..'

const path = External.node('path')

const expect = chai.expect
const current = FilePath.current

describe('FilePath', () => {
  describe('#self', () => {
    it('matches the original script url', () => {
      const url = new URL(FilePath.self)
      if (Environment.type !== 'node') {
        if (BUNDLER === 'rollup') {
          expect(url.pathname).equal('/dist/planck-core.js')
        }
        if (BUNDLER === 'webpack') {
          expect(url.pathname).equal('/dist/test/unit/webpack.js')
        }
      }
    })
  })

  describe('#current', () => {
    it('matches the current script url', () => {
      const url = new URL(current)
      if (Environment.type !== 'node') {
        expect(url.pathname).equal(`/dist/test/unit/${BUNDLER}.js`)
      }
    })
  })

  describe('separator', () => {
    it('works', () => {
      if (Environment.type === 'node') {
        expect(FilePath.separator).equal(path.sep)
      } else {
        expect(FilePath.separator).equal('/')
      }
    })
  })

  describe('delimiter', () => {
    it('works', () => {
      if (Environment.type === 'node') {
        expect(FilePath.delimiter).equal(path.delimiter)
      } else {
        expect(FilePath.delimiter).equal(':')
      }
    })
  })

  describe('resolve', () => {
    it('works', () => {
      expect(FilePath.resolve('/foo/bar', './baz'))
        .equal('/foo/bar/baz')
      expect(FilePath.resolve('/foo/bar', '/tmp/file/'))
        .equal('/tmp/file')
      if (Environment.type === 'node') {
        expect(FilePath.resolve('www', 'static/png/', '../gif/image.gif'))
          .equal(FilePath.join(process.cwd(), 'www/static/gif/image.gif'))
      } else {
        expect(FilePath.resolve('www', 'static/png/', '../gif/image.gif'))
          .equal('/www/static/gif/image.gif')
      }
    })
  })

  describe('normalize', () => {
    it('works', () => {
      expect(FilePath.normalize('/foo/bar//baz/asdf/quux/..'))
        .equal('/foo/bar/baz/asdf')
    })
  })

  describe('join', () => {
    it('works', () => {
      expect(FilePath.join('/foo', 'bar', 'baz/asdf', 'quux', '..'))
        .equal('/foo/bar/baz/asdf')
      expect(() => {
        FilePath.join('foo', {}, 'bar')
      }).throws(Error)
    })
  })

  describe('relative', () => {
    it('works', () => {
      expect(FilePath.relative(
        '/data/orandea/test/aaa',
        '/data/orandea/impl/bbb',
      )).equal('../../impl/bbb')
    })
  })

  describe('dirname', () => {
    it('works', () => {
      expect(FilePath.dirname('/foo/bar/baz/asdf/quux'))
        .equal('/foo/bar/baz/asdf')
    })
  })

  describe('basename', () => {
    it('works', () => {
      expect(FilePath.basename('/foo/bar/baz/asdf/quux.html'))
        .equal('quux.html')
      expect(FilePath.basename('/foo/bar/baz/asdf/quux.html', '.html'))
        .equal('quux')
    })
  })

  describe('extname', () => {
    it('works', () => {
      expect(FilePath.extname('index.html')).equal('.html')
      expect(FilePath.extname('index.coffee.md')).equal('.md')
      expect(FilePath.extname('index.')).equal('.')
      expect(FilePath.extname('index')).equal('')
      expect(FilePath.extname('.index')).equal('')
    })
  })
})
