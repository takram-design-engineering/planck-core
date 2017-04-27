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

import base64 from 'base64-arraybuffer'

import Environment from '../core/Environment'

if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  const encoding = require('text-encoding')
  if (Environment.global.TextEncoder === undefined) {
    Environment.global.TextEncoder = encoding.TextEncoder
  }
  if (Environment.global.TextDecoder === undefined) {
    Environment.global.TextDecoder = encoding.TextDecoder
  }
}

export default class Transferral {
  static encode(object) {
    if (typeof TextEncoder !== 'function') {
      throw new Error('TextEncoder is missing')
    }
    const encoder = new TextEncoder()
    const text = JSON.stringify(object)
    const array = encoder.encode(text)
    return array.buffer
  }

  static decode(buffer) {
    if (typeof TextDecoder !== 'function') {
      throw new Error('TextDecoder is missing')
    }
    const decoder = new TextDecoder()
    const view = new DataView(buffer)
    const text = decoder.decode(view)
    return JSON.parse(text)
  }

  static pack(buffer) {
    return base64.encode(buffer)
  }

  static unpack(string) {
    return base64.decode(string)
  }

  static packBufferGeometry(geometry) {
    Object.values(geometry.data.attributes).forEach(attribute => {
      const constructor = Environment.global[attribute.type]
      const buffer = new constructor(attribute.array).buffer
      attribute.array = this.pack(buffer)
    })
  }

  static unpackBufferGeometry(geometry) {
    Object.values(geometry.data.attributes).forEach(attribute => {
      const constructor = Environment.global[attribute.type]
      const buffer = this.unpack(attribute.array)
      attribute.array = Array.from(new constructor(buffer))
    })
  }
}
