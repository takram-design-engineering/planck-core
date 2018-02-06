// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'
import detectNode from 'detect-node'

import { Environment } from '../..'

const { expect } = chai

// eslint-disable-next-line func-names
describe('Environment', function () {
  this.timeout(30000)

  describe('#type', () => {
    it('returns environment name', done => {
      if (detectNode) {
        expect(Environment.type).equal('node')
        done()
      } else {
        expect(Environment.type).equal('browser')
        const worker = new Worker('/test/unit/data/worker')
        worker.addEventListener('message', event => {
          expect(event.data).equal('worker')
          done()
        }, false)
        worker.postMessage('')
      }
    })
  })
})
