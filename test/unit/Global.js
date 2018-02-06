// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'
import detectNode from 'detect-node'

import { Global } from '../..'

const { expect } = chai

// eslint-disable-next-line func-names
describe('Global', function () {
  this.timeout(30000)

  describe('#isBrowser', () => {
    it('is true when running on a browser', done => {
      if (detectNode) {
        expect(Global.isBrowser).equal(false)
        done()
      } else {
        expect(Global.isBrowser).equal(true)
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
        expect(Global.isWorker).equal(false)
        done()
      } else {
        expect(Global.isWorker).equal(false)
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
        expect(Global.isNode).equal(true)
        done()
      } else {
        expect(Global.isNode).equal(false)
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
