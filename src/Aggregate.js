// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

const symbol = Symbol()

export function isAggregate (object) {
  if (object == null) {
    return false
  }
  return !!object[symbol]
}

export default function Aggregate (...targets) {
  return new Proxy(Aggregate, {
    set (target, property, value, receiver) {
      targets.forEach(target => { target[property] = value })
      return true
    },

    get (target, property, receiver) {
      if (property === symbol) {
        return true
      }
      let callable = targets.length > 0
      let values = targets.map(target => {
        const value = target[property]
        if (typeof value === 'function') {
          return value.bind(target)
        }
        callable = false
        return value
      })
      if (callable) {
        return Aggregate(...values)
      }
      return values
    },

    apply (target, bound, args) {
      return targets.map(target => target(...args))
    }
  })
}

Aggregate.isAggregate = isAggregate
