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

const environmentType = (() => {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === window')()) {
      return 'browser'
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === self')()) {
      return 'worker'
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === global')()) {
      return 'node'
    }
  } catch (error) {}
  return undefined
})()

let environmentSelf
switch (environmentType) {
  case 'browser':
    environmentSelf = window
    break
  case 'worker':
    // eslint-disable-next-line no-restricted-globals
    environmentSelf = self
    break
  case 'node':
    environmentSelf = global
    break
  default:
    break
}

export default {
  type: environmentType,
  self: environmentSelf,
}
