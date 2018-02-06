// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { External, Global, FilePath } from '../..'

const path = External.node('path')

const { expect } = chai

describe('FilePath', () => {
  describe('sep', () => {
    it('works', () => {
      if (Global.isNode) {
        expect(FilePath.sep).equal(path.sep)
      } else {
        expect(FilePath.sep).equal('/')
      }
    })
  })

  describe('delimiter', () => {
    it('works', () => {
      if (Global.isNode) {
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
      if (Global.isNode) {
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
