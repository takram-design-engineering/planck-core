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

export const resolve = (() => {
  return isNode ? nodePath.resolve : function resolve (...args) {
    return browserPath.resolve('/', ...args)
  }
})()

export const normalize = (() => {
  return isNode ? nodePath.normalize : browserPath.normalize
})()

export const join = (() => {
  return isNode ? nodePath.join : browserPath.join
})()

export const relative = (() => {
  return isNode ? nodePath.relative : browserPath.relative
})()

export const dirname = (() => {
  return isNode ? nodePath.dirname : browserPath.dirname
})()

export const basename = (() => {
  return isNode ? nodePath.basename : browserPath.basename
})()

export const extname = (() => {
  return isNode ? nodePath.extname : browserPath.extname
})()

export const delimiter = (() => {
  return isNode ? nodePath.delimiter : browserPath.delimiter
})()

export const sep = (() => {
  return isNode ? nodePath.sep : browserPath.sep
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
