// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import AggregateFunction from './AggregateFunction'
import Namespace from './Namespace'

export const internal = Namespace('Aggregate')

export default class Aggregate {
  // This constructor provides for inheritance only
  constructor(namespace, ...targets) {
    if (namespace !== internal) {
      throw new Error()
    }
    const scope = internal(this)
    scope.targets = targets
  }

  set(target, property, value, receiver) {
    const scope = internal(this)
    const { targets } = scope
    for (let i = 0; i < targets.length; ++i) {
      targets[i][property] = value
    }
    // eslint-disable-next-line no-param-reassign
    target[property] = value
    return true
  }

  get(target, property, receiver) {
    const scope = internal(this)
    const { targets } = scope
    for (let i = 0; i < targets.length; ++i) {
      if (typeof target[property] !== 'function') {
        return scope.targets[0][property]
      }
    }
    const args = []
    for (let i = 0; i < targets.length; ++i) {
      const target = targets[i]
      args.push(target[property].bind(target))
    }
    return AggregateFunction.new(...args)
  }

  static new(...args) {
    const instance = new this(internal, ...args)
    return new Proxy({}, instance)
  }
}
