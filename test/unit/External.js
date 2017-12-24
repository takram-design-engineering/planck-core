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

import { Environment, External } from '../..'

const { expect } = chai

Environment.scope.d3 = {}

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
      if (!Environment.isNode) {
        expect(() => {
          External.browser('non-existent')
        }).throws(Error)
      }
    })

    it('returns empty object on environment other than node', () => {
      if (Environment.isNode) {
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
      if (Environment.isNode) {
        expect(() => {
          External.node('non-existent')
        }).throws(Error)
      }
    })

    it('returns empty object on environment other than node', () => {
      if (!Environment.isNode) {
        expect(External.node('non-existent')).deep.equal({})
        const { named } = External.node('non-existent')
        expect(named).undefined
      }
    })
  })
})
