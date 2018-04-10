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
    internal(this).targets = targets
  }

  set(target, property, value, receiver) {
    const { targets } = internal(this)
    for (let i = 0; i < targets.length; ++i) {
      targets[i][property] = value
    }
    target[property] = value // eslint-disable-line no-param-reassign
    return true
  }

  get(target, property, receiver) {
    const { targets } = internal(this)
    // Return the first target's property if the given property is not a
    // function for the given target.
    if (typeof target[property] !== 'function') {
      const [firstTarget] = targets
      return firstTarget && firstTarget[property]
    }
    const args = []
    for (let i = 0; i < targets.length; ++i) {
      const target = targets[i]
      args.push(target[property].bind(target))
    }
    return AggregateFunction.new(...args)
  }

  static new(...args) {
    // Passing the internal forces users to call new instead of constructor
    return new Proxy({}, new this(internal, ...args))
  }
}
