Planck Core
===========

A collection of classes and functions that are used anywhere in [Planck framework](https://takram.com/projects/planck), while is not precisely it’s core.

[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat
)](http://mit-license.org)
[![npm version](https://badge.fury.io/js/%40takram%2Fplanck-core.svg)](http://badge.fury.io/js/%40takram%2Fplanck-core)
[![Build Status](https://travis-ci.org/takram-design-engineering/planck-core.svg?branch=master)](https://travis-ci.org/takram-design-engineering/planck-core)
[![Sauce Test Status](https://saucelabs.com/buildstatus/planck-core)](https://saucelabs.com/u/planck-core)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/planck-core.svg)](https://saucelabs.com/u/planck-core)

## Getting Started

### Installing

```sh
npm install @takram/planck-core
```

## Usage

### Namespacing

`Namespace` is a function similar to the technique described in [Private Properties](https://developer.mozilla.org/en-US/Add-ons/SDK/Guides/Contributor_s_Guide/Private_Properties#Namespaces_in_the_Add-on_SDK) except this uses object literal rather than WeakMap, which will be an overkill in most cases. Another advantage that the article doesn’t mention is that using this technique over closure makes it easier to inspect its scope via `this`.

#### Example

```js
import { Namespace } from '@takram/planck-core'

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
import { Aggregate } from '@takram/planck-core'

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
import { Environment } from '@takram/planck-core'

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
import { Semaphore } from '@takram/planck-core'

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

## API Reference

### Aggregate

<a id="aggregate-class-new" href="#aggregate-class-new">#</a>
Aggregate.**new**(*target1* [, *target2* [, ...]])

<a id="aggregate-get" href="#aggregate-get">#</a>
*aggregate*[**property**]

<a id="aggregate-set" href="#aggregate-set">#</a>
*aggregate*[**property**] = *value*

### AggregateFunction

<a id="aggregatefunction-class-new" href="#aggregatefunction-class-new">#</a>
AggregateFunction.**new**(*target1* [, *target2* [, ...]])

<a id="aggregatefunction-apply" href="#aggregatefunction-apply">#</a>
*aggregateFunction*([*arg1* [, *arg2* [, ...]]])

### AssertionError

<a id="new-assertionerror" href="#new-assertionerror">#</a>
new **AssertionError**([*message*])

### Environment

<a id="environment-class-type" href="#environment-class-type">#</a>
Environment.**type**

<a id="environment-class-self" href="#environment-class-self">#</a>
Environment.**self**

### FilePath

<a id="filepath-class-self" href="#filepath-class-self">#</a>
FilePath.**self**

<a id="filepath-class-current" href="#filepath-class-current">#</a>
FilePath.**current**

### Hash

<a id="hash-function-apply" href="#hash-function-apply">#</a>
**Hash**(*object*)

### ImplementationError

<a id="new-implementationerror" href="#new-implementationerror">#</a>
new **ImplementationError**([*message*])

### Multiton

<a id="multiton-class-has" href="#multiton-class-has">#</a>
Multiton.**has**(*key*)

<a id="multiton-class-for" href="#multiton-class-for">#</a>
Multiton.**for**(*key*, [*arg1* [, *arg2* [, ...]]])

<a id="multiton-class-new" href="#multiton-class-new">#</a>
Multiton.**new**(*key*, [*arg1* [, *arg2* [, ...]]])

<a id="multiton-class-coercekey" href="#multiton-class-coercekey">#</a>
Multiton.**coerceKey**(*key*)

### Namespace

<a id="namespace-function-apply" href="#namespace-function-apply">#</a>
**Namespace**([*name*])

<a id="namespace-apply" href="#namespace-apply">#</a>
*namespace*(*object* [, *init*])

### Request

<a id="request-text-1" href="#request-text-1">#</a>
Request.**text**(*url* [, *options*])<br>
<a id="request-text-2" href="#request-text-2">#</a>
Request.**text**(*options*)

<a id="request-json-1" href="#request-json-1">#</a>
Request.**json**(*url* [, *options*])<br>
<a id="request-json-2" href="#request-json-2">#</a>
Request.**json**(*options*)

<a id="request-buffer-1" href="#request-buffer-1">#</a>
Request.**buffer**(*url* [, *options*])<br>
<a id="request-buffer-2" href="#request-buffer-2">#</a>
Request.**buffer**(*options*)

<a id="request-csv-1" href="#request-csv-1">#</a>
Request.**csv**(*url* [, *options*])<br>
<a id="request-csv-2" href="#request-csv-2">#</a>
Request.**csv**(*options*)

<a id="request-tsv-1" href="#request-tsv-1">#</a>
Request.**tsv**(*url* [, *options*])<br>
<a id="request-tsv-2" href="#request-tsv-2">#</a>
Request.**tsv**(*options*)

### Semaphore

<a id="new-semaphore" href="#new-semaphore">#</a>
new **Semaphore**(*capacity*)

<a id="semaphore-wait" href="#semaphore-wait">#</a>
*semaphore*.**wait**(*callback*)

<a id="semaphore-signal" href="#semaphore-signal">#</a>
*semaphore*.**signal**()

<a id="semaphore-capacity" href="#semaphore-capacity">#</a>
*semaphore*.**capacity**

<a id="semaphore-available" href="#semaphore-available">#</a>
*semaphore*.**available**

### Singleton

<a id="singleton-class-get" href="#singleton-class-get">#</a>
Singleton.**get**()

<a id="singleton-class-new" href="#singleton-class-new">#</a>
Singleton.**new**([*arg1* [, *arg2* [, ...]]])

### URL

<a id="new-url-1" href="#new-url-1">#</a>
new **URL**(*url* [, *parser*])<br>
<a id="new-url-2" href="#new-url-2">#</a>
new **URL**(*url*, *baseUrl* [, *parser*])

<a id="url-protocol" href="#url-protocol">#</a>
*url*.**protocol**

<a id="url-slashes" href="#url-slashes">#</a>
*url*.**slashes**

<a id="url-auth" href="#url-auth">#</a>
*url*.**auth**

<a id="url-username" href="#url-username">#</a>
*url*.**username**

<a id="url-password" href="#url-password">#</a>
*url*.**password**

<a id="url-host" href="#url-host">#</a>
*url*.**host**

<a id="url-hostname" href="#url-hostname">#</a>
*url*.**hostname**

<a id="url-port" href="#url-port">#</a>
*url*.**port**

<a id="url-pathname" href="#url-pathname">#</a>
*url*.**pathname**

<a id="url-query" href="#url-query">#</a>
*url*.**query**

<a id="url-hash" href="#url-hash">#</a>
*url*.**hash**

<a id="url-href" href="#url-href">#</a>
*url*.**href**

<a id="url-origin" href="#url-origin">#</a>
*url*.**origin**

<a id="url-toString" href="#url-toString">#</a>
*url*.**toString**()

### UUID

<a id="uuid-function-apply" href="#uuid-function-apply">#</a>
**UUID**()

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
