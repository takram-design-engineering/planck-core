// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

const environmentType = (() => {
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === window')()) {
      return 'browser'
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === self')()) {
      return 'worker'
    }
  } catch (error) {}
  try {
    // eslint-disable-next-line no-new-func
    if (new Function('return this === global')()) {
      return 'node'
    }
  } catch (error) {}
  return undefined
})()

let environmentSelf
switch (environmentType) {
  case 'browser':
    environmentSelf = window
    break
  case 'worker':
    // eslint-disable-next-line no-restricted-globals
    environmentSelf = self
    break
  case 'node':
    environmentSelf = global
    break
  default:
    break
}

export default {
  type: environmentType,
  self: environmentSelf,
}
