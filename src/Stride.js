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

function isTypedArray(array) {
  return (
    array instanceof Int8Array ||
    array instanceof Uint8Array ||
    array instanceof Uint8ClampedArray ||
    array instanceof Int16Array ||
    array instanceof Uint16Array ||
    array instanceof Int32Array ||
    array instanceof Uint32Array ||
    array instanceof Float32Array ||
    array instanceof Float64Array
  )
}

function slice(array, start, end) {
  return array.slice(start, end)
}

function subarray(array, start, end) {
  return array.subarray(start, end)
}

export function forEach(array, stride, callback) {
  const func = isTypedArray(array) ? subarray : slice
  const end = array.length - (array.length % stride)
  for (let start = 0, index = 0; start < end; start += stride, ++index) {
    callback(func(array, start, start + stride), index)
  }
}

export function some(array, stride, callback) {
  const end = array.length - (array.length % stride)
  const func = isTypedArray(array) ? subarray : slice
  for (let start = 0, index = 0; start < end; start += stride, ++index) {
    if (callback(func(array, start, start + stride), index)) {
      return true
    }
  }
  return false
}

export function every(array, stride, callback) {
  const end = array.length - (array.length % stride)
  const func = isTypedArray(array) ? subarray : slice
  for (let start = 0, index = 0; start < end; start += stride, ++index) {
    if (!callback(func(array, start, start + stride), index)) {
      return false
    }
  }
  return true
}

export function reduce(array, stride, callback, initial) {
  let result = initial
  const end = array.length - (array.length % stride)
  const func = isTypedArray(array) ? subarray : slice
  for (let start = 0, index = 0; start < end; start += stride, ++index) {
    result = callback(result, func(array, start, start + stride), index)
  }
  return result
}

export function set(array, stride, item) {
  const end = array.length - (array.length % stride)
  if (isTypedArray(array)) {
    for (let start = 0; start < end; start += stride) {
      array.set(item, start)
    }
  } else {
    for (let start = 0; start < end; start += stride) {
      for (let offset = 0; offset < stride; ++offset) {
        // eslint-disable-next-line no-param-reassign
        array[start + offset] = item[offset]
      }
    }
  }
  return array
}

export function transform(array, stride, callback) {
  const end = array.length - (array.length % stride)
  if (isTypedArray(array)) {
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      const item = callback(array.slice(start, start + stride), index)
      array.set(item, start)
    }
  } else {
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      for (let offset = 0; offset < stride; ++offset) {
        const item = callback(array.slice(start, start + stride), index)
        // eslint-disable-next-line no-param-reassign
        array[start + offset] = item[offset]
      }
    }
  }
  return array
}

export default {
  forEach,
  some,
  every,
  reduce,
  set,
  Ztransform,
}
