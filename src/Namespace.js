// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default function Namespace (name) {
  const symbol = Symbol(name)
  return function namespace (object, init) {
    if (object[symbol] == null) {
      if (typeof init === 'function') {
        object[symbol] = init({})
      } else if (typeof init === 'object') {
        object[symbol] = { ...init }
      } else {
        object[symbol] = {}
      }
    }
    return object[symbol]
  }
}
