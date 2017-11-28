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

import * as d3 from 'd3-dsv'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import nock from 'nock'

import { Environment, Request } from '../..'

const { expect } = chai
chai.use(chaiAsPromised)

// eslint-disable-next-line func-names
describe('Request', function () {
  this.timeout(300000)

  let host = 'http://localhost'
  if (Environment.type !== 'node') {
    host = window.location.origin
  }

  describe('#text', () => {
    it('resolves a string when fulfilled', () => {
      const path = '/test/unit/data/text'
      const expected = 'response'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, expected)
      }
      return expect(Request.text(`${host}${path}`)).fulfilled
        .then(response => {
          expect(response).equal(expected)
        })
    })

    it('rejects with status code other than 200', () => {
      const path = '/test/unit/data/404'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(404)
      }
      return expect(Request.text(`${host}${path}`)).rejected
        .then(error => {
          expect(error).equal(404)
        })
    })

    it('rejects with 0 status code when aborted', () => {
      const path = '/test/unit/data/text'
      const expected = 'response'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, expected)
      }
      const request = Request.text(`${host}${path}`)
      request.abort()
      return expect(request).rejected.then(error => {
        expect(error).equal(0)
      })
    })
  })

  describe('#json', () => {
    it('resolves an object when fulfilled', () => {
      const path = '/test/unit/data/json'
      const expected = { a: 1, b: 'c' }
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, JSON.stringify(expected))
      }
      return expect(Request.json(`${host}${path}`)).fulfilled
        .then(response => {
          expect(response).deep.equal(expected)
        })
    })

    it('rejects with error when the response is malformed', () => {
      const path = '/test/unit/data/malformed'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, '!malformed')
      }
      return expect(Request.json(`${host}${path}`)).rejected
        .then(error => {
          expect(error).instanceof(Error)
        })
    })

    it('rejects with status code other than 200', () => {
      const path = '/test/unit/data/404'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(404)
      }
      return expect(Request.json(`${host}${path}`)).rejected
        .then(error => {
          expect(error).equal(404)
        })
    })

    it('rejects with 0 status code when aborted', () => {
      const path = '/test/unit/data/json'
      const expected = { a: 1, b: 'c' }
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, JSON.stringify(expected))
      }
      const request = Request.json(`${host}${path}`)
      request.abort()
      return expect(request).rejected.then(error => {
        expect(error).equal(0)
      })
    })
  })

  describe('#buffer', () => {
    it('resolves a buffer when fulfilled', () => {
      const path = '/test/unit/data/buffer'
      const expected = new Float32Array([1, 2, 3, 4]).buffer

      if (Environment.type === 'node') {
        const buffer = Buffer.alloc(expected.byteLength)
        const view = new Uint8Array(expected)
        for (let i = 0; i < buffer.length; ++i) {
          buffer[i] = view[i]
        }

        nock(host)
          .get(path)
          .reply(200, buffer)
      }
      return expect(Request.buffer(`${host}${path}`)).fulfilled
        .then(response => {
          expect(response).instanceof(ArrayBuffer)
          expect(response.byteLength).equal(expected.byteLength)
          const responseView = new Float32Array(response)
          const expectedView = new Float32Array(expected)
          for (let i = 0; i < responseView.length; ++i) {
            expect(responseView[i]).equal(expectedView[i])
          }
        })
    })

    it('rejects with status code other than 200', () => {
      const path = '/test/unit/data/404'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(404)
      }
      return expect(Request.buffer(`${host}${path}`)).rejected
        .then(error => {
          expect(error).equal(404)
        })
    })

    it('rejects with 0 status code when aborted', () => {
      const path = '/test/unit/data/buffer'
      const expected = new Float32Array([1, 2, 3, 4]).buffer

      if (Environment.type === 'node') {
        const buffer = Buffer.alloc(expected.byteLength)
        const view = new Uint8Array(expected)
        for (let i = 0; i < buffer.length; ++i) {
          buffer[i] = view[i]
        }

        nock(host)
          .get(path)
          .reply(200, buffer)
      }
      const request = Request.buffer(`${host}${path}`)
      request.abort()
      return expect(request).rejected.then(error => {
        expect(error).equal(0)
      })
    })
  })

  describe('#csv', () => {
    it('resolves a string when fulfilled', () => {
      const path = '/test/unit/data/csv'
      const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, d3.csvFormat(expected))
      }
      return expect(Request.csv(`${host}${path}`)).fulfilled
        .then(response => {
          delete response.columns
          expect(response).deep.equal(expected)
        })
    })

    it('rejects with status code other than 200', () => {
      const path = '/test/unit/data/404'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(404)
      }
      return expect(Request.csv(`${host}${path}`)).rejected
        .then(error => {
          expect(error).equal(404)
        })
    })

    it('rejects with 0 status code when aborted', () => {
      const path = '/test/unit/data/csv'
      const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, d3.csvFormat(expected))
      }
      const request = Request.csv(`${host}${path}`)
      request.abort()
      return expect(request).rejected.then(error => {
        expect(error).equal(0)
      })
    })
  })

  describe('#tsv', () => {
    it('resolves a string when fulfilled', () => {
      const path = '/test/unit/data/tsv'
      const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, d3.tsvFormat(expected))
      }
      return expect(Request.tsv(`${host}${path}`)).fulfilled
        .then(response => {
          delete response.columns
          expect(response).deep.equal(expected)
        })
    })

    it('rejects with status code other than 200', () => {
      const path = '/test/unit/data/404'
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(404)
      }
      return expect(Request.tsv(`${host}${path}`)).rejected
        .then(error => {
          expect(error).equal(404)
        })
    })

    it('rejects with 0 status code when aborted', () => {
      const path = '/test/unit/data/tsv'
      const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
      if (Environment.type === 'node') {
        nock(host)
          .get(path)
          .reply(200, d3.tsvFormat(expected))
      }
      const request = Request.tsv(`${host}${path}`)
      request.abort()
      return expect(request).rejected.then(error => {
        expect(error).equal(0)
      })
    })
  })
})
