// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default {
  min(array, transform) {
    let result
    let min = Number.POSITIVE_INFINITY
    if (typeof transform !== 'function') {
      for (let index = 0; index < array.length; ++index) {
        const item = array[index]
        if (item < min) {
          result = item
          min = item
        }
      }
      return result
    }
    for (let index = 0; index < array.length; ++index) {
      const item = array[index]
      const transformed = transform(item, index)
      if (transformed < min) {
        result = item
        min = transformed
      }
    }
    return result
  },

  max(array, transform) {
    let result
    let max = Number.NEGATIVE_INFINITY
    if (typeof transform !== 'function') {
      for (let index = 0; index < array.length; ++index) {
        const item = array[index]
        if (item > max) {
          result = item
          max = item
        }
      }
      return result
    }
    for (let index = 0; index < array.length; ++index) {
      const item = array[index]
      const transformed = transform(item, index)
      if (transformed > max) {
        result = item
        max = transformed
      }
    }
    return result
  },
}
