// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-disable no-unused-expressions */

import 'source-map-support/register'

import chai from 'chai'

import {
  isNode,
  globalScope,
  External,
  importOptional,
  importRequired,
  importNode,
  importBrowser
} from '../..'

const { expect } = chai

globalScope.d3 = {}

describe('External', () => {
  describe('#required', () => {
    it('returns module', () => {
      expect(External.required('chai')).equal(chai)
      expect(importRequired('chai')).equal(chai)
    })

    it('supports global name', () => {
      expect(() => {
        External.required({ 'd3-dsv': 'd3' })
      }).not.throws(Error)
      expect(() => {
        importRequired({ 'd3-dsv': 'd3' })
      }).not.throws(Error)
    })

    it('throws error if cannot resolve module', () => {
      expect(() => {
        External.required('non-existent')
      }).throws(Error)
      expect(() => {
        importRequired('non-existent')
      }).throws(Error)
    })
  })

  describe('#optional', () => {
    it('returns module', () => {
      expect(External.optional('chai')).equal(chai)
      expect(importOptional('chai')).equal(chai)
    })

    it('returns empty object if cannot resolve module', () => {
      expect(External.optional('non-existent')).deep.equal({})
      expect(importOptional('non-existent')).deep.equal({})
    })
  })

  describe('#browser', () => {
    it('returns module', () => {
      expect(External.browser('chai')).equal(chai)
      expect(importBrowser('chai')).equal(chai)
    })

    it('throws error if cannot resolve module on node', () => {
      if (!isNode) {
        expect(() => {
          External.browser('non-existent')
        }).throws(Error)
        expect(() => {
          importBrowser('non-existent')
        }).throws(Error)
      } else {
        expect(() => {
          External.browser('non-existent')
        }).not.throws(Error)
        expect(() => {
          importBrowser('non-existent')
        }).not.throws(Error)
      }
    })

    it('returns empty object on environments other than node', () => {
      if (isNode) {
        expect(External.browser('non-existent')).deep.equal({})
        expect(importBrowser('non-existent')).deep.equal({})
      }
    })
  })

  describe('#node', () => {
    it('returns module', () => {
      expect(External.node('chai')).equal(chai)
      expect(importNode('chai')).equal(chai)
    })

    it('throws error if cannot resolve module on node', () => {
      if (isNode) {
        expect(() => {
          External.node('non-existent')
        }).throws(Error)
        expect(() => {
          importNode('non-existent')
        }).throws(Error)
      } else {
        expect(() => {
          External.node('non-existent')
        }).not.throws(Error)
        expect(() => {
          importNode('non-existent')
        }).not.throws(Error)
      }
    })

    it('returns empty object on environments other than node', () => {
      if (!isNode) {
        expect(External.node('non-existent')).deep.equal({})
        expect(importNode('non-existent')).deep.equal({})
      }
    })
  })
})
