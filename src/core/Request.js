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

import Environment from '../core/Environment'
import Namespace from '../core/Namespace'
import URL from '../core/URL'

/* eslint-disable global-require */
let readFile
let request
if (Environment.type === 'node') {
  ({ readFile } = require('fs'))
  request = require('request')
}
/* eslint-enable global-require */

export const internal = Namespace('Request')

function browserRequest(url, options) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url, true)
    if (options.query) {
      parsed.set('query', Object.assign({}, parsed.query, options.query))
    }
    const request = new XMLHttpRequest()
    request.open('get', parsed.toString(), true)
    if (options.headers) {
      Object.entries(options.headers).forEach(header => {
        request.setRequestHeader(...header)
      })
    }
    request.responseType = options.type
    request.addEventListener('loadend', event => {
      if (request.status < 200 || request.status >= 300) {
        reject(request.status)
        return
      }
      if (request.response === null && options.type === 'json') {
        reject(new Error('Could not parse JSON'))
        return
      }
      resolve(request.response)
    }, false)
    request.send()
  })
}

function nodeRequest(url, options) {
  if (options.local) {
    return new Promise((resolve, reject) => {
      readFile(url, options.encoding, (error, response) => {
        if (error) {
          reject(error)
          return
        }
        resolve(response)
      })
    })
  }
  return new Promise((resolve, reject) => {
    request({
      url,
      headers: options.headers || {},
      qs: options.query || {},
      encoding: options.encoding,
    }, (error, response) => {
      if (error) {
        reject(error)
        return
      }
      if (request.statusCode < 200 || request.statusCode >= 300) {
        reject(response.statusCode)
      }
      resolve(response.body)
    })
  })
}

function performRequest(url, options) {
  if (Environment.type === 'node') {
    const promise = nodeRequest(url, options)
    if (options.type === 'json') {
      return promise.then(response => {
        if (typeof response !== 'string') {
          throw new Error('Response is unexpectedly not a string')
        }
        return JSON.parse(response)
      })
    }
    if (options.type === 'arraybuffer') {
      return promise.then(response => {
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
    }
    return promise
  }
  return browserRequest(url, options)
}

function parseArguments(...args) {
  let [url, options] = args
  if (typeof url !== 'string') {
    options = url
    url = options.url
  }
  if (typeof url !== 'string') {
    throw new Error('The first argument or options.url must be a string')
  }
  options = Object.assign({}, {
    type: 'text',
    local: false,
    encoding: 'utf-8',
  }, options)
  return [url, options]
}

export default class Request {
  static text(...args) {
    const [url, options] = parseArguments(...args)
    options.type = 'text'
    return performRequest(url, options)
  }

  static json(...args) {
    const [url, options] = parseArguments(...args)
    options.type = 'json'
    return performRequest(url, options)
  }

  static buffer(...args) {
    const [url, options] = parseArguments(...args)
    options.type = 'arraybuffer'
    options.encoding = null
    return performRequest(url, options)
  }

  static csv(...args) {
    const [url, options] = parseArguments(...args)
    return this.text(url, options).then(response => {
      return Environment.self.d3.csvParse(response, options.row)
    })
  }

  static tsv(...args) {
    const [url, options] = parseArguments(...args)
    return this.text(url, options).then(response => {
      return Environment.self.d3.tsvParse(response, options.row)
    })
  }
}
