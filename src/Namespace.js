// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default function Namespace(name) {
  const symbol = Symbol(name)
  return function namespace(object, init) {
    if (object[symbol] == null) {
      if (typeof init === 'function') {
        // eslint-disable-next-line no-param-reassign
        object[symbol] = init({})
      } else if (typeof init === 'object') {
        // eslint-disable-next-line no-param-reassign
        object[symbol] = { ...init }
      } else {
        // eslint-disable-next-line no-param-reassign
        object[symbol] = {}
      }
    }
    return object[symbol]
  }
}
