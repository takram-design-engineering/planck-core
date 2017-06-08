Planck Core
===========

A collection of classes and functions that are used anywhere in [Planck framework](https://takram.com/projects/planck), while is not precisely it’s core.

[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat
)](http://mit-license.org) [![Sauce Test Status](https://saucelabs.com/buildstatus/planck-core)](https://saucelabs.com/u/planck-core)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/planck-core.svg)](https://saucelabs.com/u/planck-core)

## Getting Started

### Installing

```sh
npm install --save github:takram-design-engineering/planck-core
```

## Usage

### Namespacing

`Namespace` is a function similar to the technique described in [Private Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties#Namespaces_in_the_Add-on_SDK) except this uses object literal rather than WeakMap, which will be an overkill in most cases. Another advantage that the article doesn’t mention is that using this technique over closure makes it easier to inspect its scope via `this`.

#### Example

```js
import { Namespace } from 'planck-core'

// Human-readable name is optional. 'T' should be displayed in the inspector of
// your browser as a property of the instance.
const internal = Namespace('T')

export default class T {
  constructor(value) {
    const scope = internal(this)
    scope.value = value
  }

  get value() {
    const scope = internal(this)
    return scope.value
  }
}
```

### Property and Function Call Aggregation

`Aggregate` proxies aggregates the calls to its targets as well as to the functions of the targets.

Getting a property from an aggregate returns the properties of the first target. Setting a property propagates it to all the targets, resulting the targets should have the same value. Calling a function property (typically a method of instances) applies to all of them and returns an array of their results.

#### Example

```js
import { Aggregate } from 'planck-core'

const a = { value: 'a', func() { return 'a' } }
const b = { value: 'b', func() { return 'b' } }
const aggregate = Aggregate.new(a, b)

aggregate.value = 'c'
console.log(a.value)  // 'c'
console.log(b.value)  // 'c'

console.log(aggregate.func())  // ['a', 'b']
```

### Environment Detection

`Environment` has 2 properties `type` and `self`. The `type` is either “browser”, “worker” or “node”, and `self` is either `window`, `self` or `global` in their respective environments.

#### Example

```js
import { Environment } from 'planck-core'

if (Environment.type === 'node') {
  Environment.self.module = require('module')
} else if (Environment.type === 'worker') {
  Environment.self.module = importScripts('/js/module.js')
}
// Assume the module is already loaded in browser

Environment.self.module()
```

### Promise-based Semaphore

The example below limits simultaneous requests by the function `load` to 10.

#### Example

```js
import { Semaphore } from 'planck-core'

const semaphore = new Semaphore(10)

function load(url) {
  // Unlike Promise, the function passed as the argument of “wait” will not be
  // executed until the semaphore becomes available.
  return semaphore.wait((resolve, reject) => {
    const request = new XMLHttpRequest()
    request.open('get', url)
    request.onload = () => {
      if (request.status !== 200) {
        reject(request.status)
      } else {
        resolve(request.response)
      }
    }
    request.onerror = reject
    request.send()
  })
}

[/* a bunch of urls */].map(url => load(url))
```

## License

The MIT License

Copyright (C) 2016-Present Shota Matsuda

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
