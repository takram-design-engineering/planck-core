// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import md5 from 'md5'
import stringify from 'json-stable-stringify'

export default function Hash(object) {
  return md5(stringify(object))
}
