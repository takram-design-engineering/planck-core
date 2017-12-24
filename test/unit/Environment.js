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
import detectNode from 'detect-node'

import { Environment } from '../..'

const { expect } = chai

// eslint-disable-next-line func-names
describe('Environment', function () {
  this.timeout(30000)

  describe('#isBrowser', () => {
    it('is true when running on a browser', done => {
      if (detectNode) {
        expect(Environment.isBrowser).equal(false)
        done()
      } else {
        expect(Environment.isBrowser).equal(true)
        const worker = new Worker('/test/unit/data/worker')
        worker.addEventListener('message', event => {
          expect(event.data.isBrowser).equal(false)
          done()
        }, false)
        worker.postMessage('')
      }
    })
  })

  describe('#isWorker', () => {
    it('is true when running on a worker', done => {
      if (detectNode) {
        expect(Environment.isWorker).equal(false)
        done()
      } else {
        expect(Environment.isWorker).equal(false)
        const worker = new Worker('/test/unit/data/worker')
        worker.addEventListener('message', event => {
          expect(event.data.isWorker).equal(true)
          done()
        }, false)
        worker.postMessage('')
      }
    })
  })

  describe('#isNode', () => {
    it('is true when running on node', done => {
      if (detectNode) {
        expect(Environment.isNode).equal(true)
        done()
      } else {
        expect(Environment.isNode).equal(false)
        const worker = new Worker('/test/unit/data/worker')
        worker.addEventListener('message', event => {
          expect(event.data.isNode).equal(false)
          done()
        }, false)
        worker.postMessage('')
      }
    })
  })
})
