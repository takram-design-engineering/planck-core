// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import browserPath from 'path-browserify'

import Environment from './Environment'
import External from './External'

const nodePath = External.node('path')

function currentScriptPath() {
  switch (Environment.type) {
    case 'browser': {
      // eslint-disable-next-line no-underscore-dangle
      const currentScript = document.currentScript || document._currentScript
      return (currentScript && currentScript.src) || undefined
    }
    case 'worker':
      // eslint-disable-next-line no-restricted-globals
      return self.location.href
    case 'node':
      return __filename
    default:
      break
  }
  return undefined
}

const initialScriptPath = currentScriptPath()

let aliases
if (Environment.type === 'node') {
  aliases = {
    resolve: nodePath.resolve,
    normalize: nodePath.normalize,
    join: nodePath.join,
    relative: nodePath.relative,
    dirname: nodePath.dirname,
    basename: nodePath.basename,
    extname: nodePath.extname,
    separator: nodePath.sep,
    delimiter: nodePath.delimiter,
  }
} else {
  aliases = {
    resolve(...paths) {
      return browserPath.resolve('/', ...paths)
    },

    normalize: browserPath.normalize,
    join: browserPath.join,
    relative: browserPath.relative,
    dirname: browserPath.dirname,
    basename: browserPath.basename,
    extname: browserPath.extname,
    separator: browserPath.sep,
    delimiter: browserPath.delimiter,
  }
}

export default {
  self: initialScriptPath,

  get current() {
    return currentScriptPath()
  },

  // Object rest spread must be placed at the last because this will be
  // transpiled to Object.assign with the above and aliases. Othewise current()
  // will become a static variable, not a getter function.
  ...aliases,
}
