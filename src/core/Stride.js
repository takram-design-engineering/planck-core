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

export default class Stride {
  static transform(array, stride, callback) {
    const values = []
    array.forEach((value, index) => {
      const modulo = index % stride
      values[modulo] = value
      if (modulo === stride - 1) {
        const transformed = callback(...values, Math.floor(index / stride))
        for (let offset = 0; offset < stride; ++offset) {
          array[index - (stride - offset - 1)] = transformed[offset]
        }
      }
    })
    return array
  }

  static forEach(array, stride, callback) {
    const values = []
    array.forEach((value, index) => {
      const modulo = index % stride
      values[modulo] = value
      if (modulo === stride - 1) {
        callback(...values, Math.floor(index / stride))
      }
    })
  }

  static some(array, stride, callback) {
    const values = []
    return array.some((value, index) => {
      const modulo = index % stride
      values[modulo] = value
      if (modulo === stride - 1) {
        return callback(...values, Math.floor(index / stride))
      }
      return false
    })
  }

  static every(array, stride, callback) {
    const values = []
    return array.every((value, index) => {
      const modulo = index % stride
      values[modulo] = value
      if (modulo === stride - 1) {
        return callback(...values, Math.floor(index / stride))
      }
      return true
    })
  }

  static reduce(array, stride, callback, initial) {
    const values = []
    return array.reduce((result, value, index) => {
      const modulo = index % stride
      values[modulo] = value
      if (modulo === stride - 1) {
        return callback(result, ...values, Math.floor(index / stride))
      }
      return result
    }, initial)
  }
}
