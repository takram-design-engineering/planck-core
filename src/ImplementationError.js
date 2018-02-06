// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export default function ImplementationError(message) {
  this.message = message
}

Object.setPrototypeOf(ImplementationError, Error)
ImplementationError.prototype = Object.create(Error.prototype)
ImplementationError.prototype.name = 'ImplementationError'
ImplementationError.prototype.message = ''
ImplementationError.prototype.constructor = ImplementationError
