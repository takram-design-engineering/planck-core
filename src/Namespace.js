// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export function createNamespace(name = undefined) {
  const symbol = Symbol(name)
  return function namespace(object, init = data => data) {
    if (object[symbol] === undefined) {
      // eslint-disable-next-line no-param-reassign
      object[symbol] = init({})
    }
    return object[symbol]
  }
}

export default createNamespace
