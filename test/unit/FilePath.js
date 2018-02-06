// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Environment, External, FilePath, URL } from '../..'

const path = External.node('path')

const { expect } = chai
const { current } = FilePath

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
