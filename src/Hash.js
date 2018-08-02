// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import sha256 from 'hash.js/lib/hash/sha/256'
import stringify from 'json-stable-stringify'

export function generateHash (object) {
  return sha256().update(stringify(object)).digest('hex')
}

export default generateHash
