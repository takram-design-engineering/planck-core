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

export default {
  forEach(array, stride, callback) {
    const values = Array(stride)
    let strideIndex = 0
    for (let index = 0; index < array.length; ++index) {
      const modulo = index % stride
      values[modulo] = values[index]
      if (modulo === stride - 1) {
        callback(values, strideIndex)
        strideIndex += stride
      }
    }
  },

  some(array, stride, callback) {
    const values = Array(stride)
    let strideIndex = 0
    for (let index = 0; index < array.length; ++index) {
      const modulo = index % stride
      values[modulo] = values[index]
      if (modulo === stride - 1) {
        if (callback(values, strideIndex)) {
          return true
        }
        strideIndex += stride
      }
    }
    return false
  },

  every(array, stride, callback) {
    const values = Array(stride)
    let strideIndex = 0
    for (let index = 0; index < array.length; ++index) {
      const modulo = index % stride
      values[modulo] = values[index]
      if (modulo === stride - 1) {
        if (!callback(values, strideIndex)) {
          return false
        }
        strideIndex += stride
      }
    }
    return true
  },

  reduce(array, stride, callback, initial) {
    let result = initial
    const values = Array(stride)
    let strideIndex = 0
    for (let index = 0; index < array.length; ++index) {
      const modulo = index % stride
      values[modulo] = values[index]
      if (modulo === stride - 1) {
        result = callback(result, values, strideIndex)
        strideIndex += stride
      }
    }
    return result
  },

  transform(array, stride, callback) {
    const values = Array(stride)
    let strideIndex = 0
    for (let index = 0; index < array.length; ++index) {
      const modulo = index % stride
      values[modulo] = values[index]
      if (modulo === stride - 1) {
        const transformed = callback(values, strideIndex)
        for (let offset = 0; offset < stride; ++offset) {
          // eslint-disable-next-line no-param-reassign
          array[index - (stride - offset - 1)] = transformed[offset]
        }
        strideIndex += stride
      }
    }
    return array
  },
}
