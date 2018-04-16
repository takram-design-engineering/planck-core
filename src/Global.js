// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env worker */
/* eslint-disable no-new-func */

export const isBrowser = (() => {
  try {
    if (new Function('return this === window')()) {
      return true
    }
  } catch (error) {}
  return false
})()

export const isWorker = !isBrowser && (() => {
  try {
    if (new Function('return this === self')()) {
      return true
    }
  } catch (error) {}
  return false
})()

export const isNode = !isBrowser && !isWorker && (() => {
  try {
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
  scope: globalScope
}
