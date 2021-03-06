// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env worker */

import { csvParse, tsvParse } from 'd3-dsv'
import fs from 'fs'
import request from 'request'

import { isNode } from './Global'
import Namespace from './Namespace'
import URL from './URL'

export const internal = Namespace('Request')

function browserRequest (url, options) {
  let resolve
  let reject
  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => {
    [resolve, reject] = args
  })
  const parsed = new URL(url, true)
  if (options.query) {
    parsed.set('query', Object.assign({}, parsed.query, options.query))
  }
  const request = new XMLHttpRequest()
  request.open('get', parsed.toString(), true)
  if (options.headers) {
    const names = Object.keys(options.headers)
    for (let i = 0; i < names.length; ++i) {
      const name = names[i]
      request.setRequestHeader(name, options.headers[name])
    }
  }
  request.responseType = options.type
  request.addEventListener('loadend', event => {
    if (request.status < 200 || request.status >= 300) {
      reject(request.status)
      return
    }
    if (request.response == null && options.type === 'json') {
      reject(new Error('Could not parse JSON'))
      return
    }
    resolve(request.response)
  }, false)
  request.send()
  promise.abort = () => {
    request.abort()
  }
  return promise
}

function nodeRequest (url, options) {
  let resolve
  let reject
  // eslint-disable-next-line promise/param-names
  const promise = new Promise((...args) => {
    [resolve, reject] = args
  })
  if (options.local) {
    fs.readFile(url, options.encoding, (error, response) => {
      if (error) {
        reject(error)
        return
      }
      resolve(response)
    })
    promise.abort = () => {} // TODO: Support abortion
  } else {
    const stream = request({
      url,
      headers: options.headers || {},
      qs: options.query || {},
      encoding: options.encoding
    }, (error, response) => {
      if (error) {
        reject(error)
        return
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(response.statusCode)
      }
      resolve(response.body)
    })
    stream.on('abort', () => {
      reject(0)
    })
    promise.abort = () => {
      stream.abort()
    }
  }
  return promise
}

function performRequest (url, options) {
  if (isNode) {
    const request = nodeRequest(url, options)
    if (options.type === 'json') {
      const promise = request.then(response => {
        if (typeof response !== 'string') {
          throw new Error('Response is unexpectedly not a string')
        }
        return JSON.parse(response)
      })
      promise.abort = () => {
        request.abort()
      }
      return promise
    }
    if (options.type === 'arraybuffer') {
      const promise = request.then(response => {
        if (!(response instanceof Buffer)) {
          throw new Error('Response is unexpectedly not a buffer')
        }
        const buffer = new ArrayBuffer(response.length)
        const view = new Uint8Array(buffer)
        for (let i = 0; i < response.length; ++i) {
          view[i] = response[i]
        }
        return buffer
      })
      promise.abort = () => {
        request.abort()
      }
      return promise
    }
    return request
  }
  return browserRequest(url, options)
}

function parseArguments (...args) {
  let [url, options] = args
  if (typeof url !== 'string') {
    options = url
    ;({ url } = options)
  }
  if (typeof url !== 'string') {
    throw new Error('The first argument or options.url must be a string')
  }
  options = Object.assign({}, {
    type: 'text',
    local: false,
    encoding: 'utf-8'
  }, options)
  return [url, options]
}

export function requestText (...args) {
  const [url, options] = parseArguments(...args)
  options.type = 'text'
  return performRequest(url, options)
}

export function requestJSON (...args) {
  const [url, options] = parseArguments(...args)
  options.type = 'json'
  return performRequest(url, options)
}

export function requestBuffer (...args) {
  const [url, options] = parseArguments(...args)
  options.type = 'arraybuffer'
  options.encoding = null
  return performRequest(url, options)
}

export function requestCSV (...args) {
  const [url, options] = parseArguments(...args)
  const request = this.text(url, options)
  const promise = request.then(response => {
    return csvParse(response, options.row)
  })
  promise.abort = () => {
    request.abort()
  }
  return promise
}

export function requestTSV (...args) {
  const [url, options] = parseArguments(...args)
  const request = this.text(url, options)
  const promise = request.then(response => {
    return tsvParse(response, options.row)
  })
  promise.abort = () => {
    request.abort()
  }
  return promise
}

Object.assign(performRequest, {
  text: requestText,
  json: requestJSON,
  buffer: requestBuffer,
  csv: requestCSV,
  tsv: requestTSV
})

export default performRequest
