// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export const isBrowser = (() => {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === window')()) {
      return true
    }
  } catch (error) {}
  return false
})()

export const isWorker = !isBrowser && (() => {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === self')()) {
      return true
    }
  } catch (error) {}
  return false
})()

export const isNode = !isBrowser && !isWorker && (() => {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === global')()) {
      return true
    }
  } catch (error) {}
  return false
})()

export const globalScope = (() => {
  if (isBrowser) {
    return window
  }
  if (isWorker) {
    // eslint-disable-next-line no-restricted-globals
    return self
  }
  if (isNode) {
    return global
  }
  return undefined
})()

export default {
  isBrowser,
  isWorker,
  isNode,
  scope: globalScope,
}
