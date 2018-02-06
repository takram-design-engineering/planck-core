// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

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

export default {
  forEach(array, stride, callback) {
    const func = isTypedArray(array) ? subarray : slice
    const end = array.length - (array.length % stride)
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      callback(func(array, start, start + stride), index)
    }
  },

  some(array, stride, callback) {
    const end = array.length - (array.length % stride)
    const func = isTypedArray(array) ? subarray : slice
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      if (callback(func(array, start, start + stride), index)) {
        return true
      }
    }
    return false
  },

  every(array, stride, callback) {
    const end = array.length - (array.length % stride)
    const func = isTypedArray(array) ? subarray : slice
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      if (!callback(func(array, start, start + stride), index)) {
        return false
      }
    }
    return true
  },

  reduce(array, stride, callback, initial) {
    let result = initial
    const end = array.length - (array.length % stride)
    const func = isTypedArray(array) ? subarray : slice
    for (let start = 0, index = 0; start < end; start += stride, ++index) {
      result = callback(result, func(array, start, start + stride), index)
    }
    return result
  },

  set(array, stride, item) {
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
  },

  transform(array, stride, callback) {
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
  },
}
