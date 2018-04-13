// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default function AssertionError (message) {
  this.message = message
}

Object.setPrototypeOf(AssertionError, Error)
AssertionError.prototype = Object.create(Error.prototype)
AssertionError.prototype.name = 'AssertionError'
AssertionError.prototype.message = ''
AssertionError.prototype.constructor = AssertionError
