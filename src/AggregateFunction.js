// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import Namespace from './Namespace'

export const internal = Namespace('AggregateFunction')

export default class AggregateFunction {
  // This constructor provides for inheritance only
  constructor(namespace, ...targets) {
    if (namespace !== internal) {
      throw new Error()
    }
    const scope = internal(this)
    scope.targets = targets
  }

  apply(target, bound, args) {
    const scope = internal(this)
    const { targets } = scope
    const result = []
    for (let i = 0; i < targets.length; ++i) {
      result.push(targets[i].apply(bound, args))
    }
    return result
  }

  static new(...args) {
    const instance = new this(internal, ...args)
    return new Proxy(() => {}, instance)
  }
}
