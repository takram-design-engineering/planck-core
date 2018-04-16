// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env worker */

import browserPath from 'path-browserify'

import { importNode } from './External'
import { isBrowser, isWorker, isNode } from './Global'

const nodePath = importNode('path')

export function currentFilePath () {
  if (isBrowser) {
    const currentScript = document.currentScript || document._currentScript
    return (currentScript && currentScript.src) || undefined
  }
  if (isWorker) {
    return self.location.href
  }
  if (isNode) {
    return __filename
  }
  return undefined
}

export const {
  resolve,
  normalize,
  join,
  relative,
  dirname,
  basename,
  extname,
  delimiter,
  sep
} = (() => {
  if (isNode) {
    return nodePath
  }
  return {
    ...browserPath,
    resolve (...args) {
      return browserPath.resolve('/', ...args)
    }
  }
})()

export default {
  resolve,
  normalize,
  join,
  relative,
  dirname,
  basename,
  extname,
  delimiter,
  sep
}
