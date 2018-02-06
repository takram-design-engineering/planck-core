// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Environment, External } from '../..'

const { expect } = chai

Environment.self.d3 = {}

describe('External', () => {
  describe('#required', () => {
    it('returns module', () => {
      expect(External.required('chai')).equal(chai)
    })

    it('supports global name', () => {
      expect(() => {
        External.required({ 'd3-dsv': 'd3' })
      }).not.throws(Error)
    })

    it('throws error if cannot resolve module', () => {
      expect(() => {
        External.required('non-existent')
      }).throws(Error)
    })
  })

  describe('#optional', () => {
    it('returns module', () => {
      expect(External.optional('chai')).equal(chai)
    })

    it('returns empty object if cannot resolve module', () => {
      expect(External.optional('non-existent')).deep.equal({})
      const { named } = External.optional('non-existent')
      expect(named).undefined
    })
  })

  describe('#browser', () => {
    it('returns module', () => {
      expect(External.browser('chai')).equal(chai)
    })

    it('throws error if cannot resolve module on node', () => {
      if (Environment.type !== 'node') {
        expect(() => {
          External.browser('non-existent')
        }).throws(Error)
      }
    })

    it('returns empty object on environment other than node', () => {
      if (Environment.type === 'node') {
        expect(External.browser('non-existent')).deep.equal({})
        const { named } = External.browser('non-existent')
        expect(named).undefined
      }
    })
  })

  describe('#node', () => {
    it('returns module', () => {
      expect(External.node('chai')).equal(chai)
    })

    it('throws error if cannot resolve module on node', () => {
      if (Environment.type === 'node') {
        expect(() => {
          External.node('non-existent')
        }).throws(Error)
      }
    })

    it('returns empty object on environment other than node', () => {
      if (Environment.type !== 'node') {
        expect(External.node('non-existent')).deep.equal({})
        const { named } = External.node('non-existent')
        expect(named).undefined
      }
    })
  })
})
