Planck Core
===========

A collection of classes and functions that are used anywhere in [Planck framework](https://takram.com/projects/planck), while is not precisely it’s core.

[![License](http://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat
)](http://mit-license.org)
[![npm version](https://badge.fury.io/js/%40takram%2Fplanck-core.svg)](http://badge.fury.io/js/%40takram%2Fplanck-core)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
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

`Global` distinguishes browsers, workers and node processes by `isBrowser`, `isWorker` and `isNode` respectively, and provides unified way to access the global scopes via `scope`.

#### Example

```js
import { Global } from '@takram/planck-core'

if (Global.isNode) {
  Global.scope.module = require('module')
} else if (Global.isWorker) {
  Global.scope.module = importScripts('/js/module.js')
}
// Assume the module is already loaded in browser

Global.scope.module()
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

<a id="aggregate-new" href="#aggregate-new">#</a>
Aggregate.**new**(_target1_ [, _target2_ [, ...]])

<a id="aggregate-get" href="#aggregate-get">#</a>
_aggregate_[**property**]

<a id="aggregate-set" href="#aggregate-set">#</a>
_aggregate_[**property**] = _value_

### AggregateFunction

<a id="aggregatefunction-new" href="#aggregatefunction-new">#</a>
AggregateFunction.**new**(_target1_ [, _target2_ [, ...]])

<a id="aggregatefunction-apply" href="#aggregatefunction-apply">#</a>
_aggregateFunction_([_arg1_ [, _arg2_ [, ...]]])

### Array

<a id="array-min" href="#array-min">#</a>
Array.**min**(_array_, _transform_)

<a id="array-max" href="#array-max">#</a>
Array.**max**(_array_, _transform_)

### AssertionError

<a id="new-assertionerror" href="#new-assertionerror">#</a>
new **AssertionError**([_message_])

### FilePath

<a id="filepath-resolve" href="#filepath-resolve">#</a>
FilePath.**resolve**([_path1_ [, _path2_ [, ...]]])

<a id="filepath-normalize" href="#filepath-normalize">#</a>
FilePath.**normalize**(_path_)

<a id="filepath-join" href="#filepath-join">#</a>
FilePath.**join**([_path1_ [, _path2_ [, ...]]])

<a id="filepath-relative" href="#filepath-relative">#</a>
FilePath.**relative**(_from_, _to_)

<a id="filepath-dirname" href="#filepath-dirname">#</a>
FilePath.**dirname**(_path_)

<a id="filepath-basename" href="#filepath-basename">#</a>
FilePath.**basename**(_path_ [, _ext_])

<a id="filepath-extname" href="#filepath-extname">#</a>
FilePath.**extname**(_path_)

<a id="filepath-sep" href="#filepath-sep">#</a>
FilePath.**sep**

<a id="filepath-delimiter" href="#filepath-delimiter">#</a>
FilePath.**delimiter**

### Global

<a id="global-isbrowser" href="#global-isbrowser">#</a>
Global.**isBrowser**

<a id="global-isworker" href="#global-isworker">#</a>
Global.**isWorker**

<a id="global-isnode" href="#global-isnode">#</a>
Global.**isNode**

<a id="global-scope" href="#global-scope">#</a>
Global.**scope**

### Hash

<a id="hash-function-apply" href="#hash-function-apply">#</a>
**Hash**(_object_)

### ImplementationError

<a id="new-implementationerror" href="#new-implementationerror">#</a>
new **ImplementationError**([_message_])

### Math

<a id="math-lerp" href="#math-lerp">#</a>
Math.**lerp**(_start_, _stop_, _amount_)

<a id="math-constrain" href="#math-constrain">#</a>
Math.**constrain**(_x_, _min_, _max_)

<a id="math-map" href="#math-map">#</a>
Math.**map**(_x_, _min1_, _max1_, _min2_, _max2_)

<a id="math-wrap" href="#math-wrap">#</a>
Math.**wrap**(_x_, _min_, _max_)

<a id="math-radians" href="#math-radians">#</a>
Math.**radians**(_degrees_)

<a id="math-degrees" href="#math-degrees">#</a>
Math.**degrees**(_radians_)

<a id="math-sin" href="#math-sin">#</a>
Math.**sin**(_angle_)

<a id="math-cos" href="#math-cos">#</a>
Math.**cos**(_angle_)

<a id="math-tan" href="#math-tan">#</a>
Math.**tan**(_angle_)

<a id="math-asin" href="#math-asin">#</a>
Math.**asin**(_x_)

<a id="math-acos" href="#math-acos">#</a>
Math.**acos**(_x_)

<a id="math-atan" href="#math-atan">#</a>
Math.**atan**(y [, x])

<a id="math-pow" href="#math-pow">#</a>
Math.**pow**(_x_, _y_)

<a id="math-exp" href="#math-exp">#</a>
Math.**exp**(_x_)

<a id="math-log" href="#math-log">#</a>
Math.**log**(_x_)

<a id="math-exp2" href="#math-exp2">#</a>
Math.**exp2**(_x_)

<a id="math-log2" href="#math-log2">#</a>
Math.**log2**(_x_)

<a id="math-sqrt" href="#math-sqrt">#</a>
Math.**sqrt**(_x_)

<a id="math-inversesqrt" href="#math-inversesqrt">#</a>
Math.**inversesqrt**(_x_)

<a id="math-abs" href="#math-abs">#</a>
Math.**abs**(_x_)

<a id="math-sign" href="#math-sign">#</a>
Math.**sign**(_x_)

<a id="math-floor" href="#math-floor">#</a>
Math.**floor**(_x_)

<a id="math-ceil" href="#math-ceil">#</a>
Math.**ceil**(_x_)

<a id="math-fract" href="#math-fract">#</a>
Math.**fract**(_x_)

<a id="math-mod" href="#math-mod">#</a>
Math.**mod**(_x_, _y_)

<a id="math-min" href="#math-min">#</a>
Math.**min**(_x_, _y_)

<a id="math-max" href="#math-max">#</a>
Math.**max**(_x_, _y_)

<a id="math-clamp" href="#math-clamp">#</a>
Math.**clamp**(_x_, _min_, _max_)

<a id="math-mix" href="#math-mix">#</a>
Math.**mix**(_x_, _y_, _a_)

<a id="math-step" href="#math-step">#</a>
Math.**step**(_edge_, _x_)

<a id="math-smoothstep" href="#math-smoothstep">#</a>
Math.**smoothstep**(_edge0_, _edge1_, _x_)

<a id="math-length" href="#math-length">#</a>
Math.**length**(_x_)

<a id="math-distance" href="#math-distance">#</a>
Math.**distance**(_x_, _y_)

<a id="math-dot" href="#math-dot">#</a>
Math.**dot**(_x_, _y_)

<a id="math-cross" href="#math-cross">#</a>
Math.**cross**(_x_, _y_)

<a id="math-normalize" href="#math-normalize">#</a>
Math.**normalize**(_x_)

<a id="math-faceforward" href="#math-faceforward">#</a>
Math.**faceforward**(_N_, _I_ [, _Nref_])

<a id="math-reflect" href="#math-reflect">#</a>
Math.**reflect**(_I_, _N_)

<a id="math-refract" href="#math-refract">#</a>
Math.**refract**(_I_, _N_, _eta_)

### Namespace

<a id="namespace-function-apply" href="#namespace-function-apply">#</a>
**Namespace**([_name_])

<a id="namespace-apply" href="#namespace-apply">#</a>
_namespace_(_object_ [, _init_])

### Request

<a id="request-text-1" href="#request-text-1">#</a>
Request.**text**(_url_ [, _options_])<br>
<a id="request-text-2" href="#request-text-2">#</a>
Request.**text**(_options_)

<a id="request-json-1" href="#request-json-1">#</a>
Request.**json**(_url_ [, _options_])<br>
<a id="request-json-2" href="#request-json-2">#</a>
Request.**json**(_options_)

<a id="request-buffer-1" href="#request-buffer-1">#</a>
Request.**buffer**(_url_ [, _options_])<br>
<a id="request-buffer-2" href="#request-buffer-2">#</a>
Request.**buffer**(_options_)

<a id="request-csv-1" href="#request-csv-1">#</a>
Request.**csv**(_url_ [, _options_])<br>
<a id="request-csv-2" href="#request-csv-2">#</a>
Request.**csv**(_options_)

<a id="request-tsv-1" href="#request-tsv-1">#</a>
Request.**tsv**(_url_ [, _options_])<br>
<a id="request-tsv-2" href="#request-tsv-2">#</a>
Request.**tsv**(_options_)

<a id="request-abort" href="#request-abort">#</a>
_request_.**abort**()

### Semaphore

<a id="new-semaphore" href="#new-semaphore">#</a>
new **Semaphore**(_capacity_)

<a id="semaphore-wait" href="#semaphore-wait">#</a>
_semaphore_.**wait**(_callback_)

<a id="semaphore-signal" href="#semaphore-signal">#</a>
_semaphore_.**signal**()

<a id="semaphore-capacity" href="#semaphore-capacity">#</a>
_semaphore_.**capacity**

<a id="semaphore-available" href="#semaphore-available">#</a>
_semaphore_.**available**

### Stride

<a id="stride-foreach" href="#stride-foreach">#</a>
Stride.**forEach**(_array_, _stride_, _callback_)

<a id="stride-some" href="#stride-some">#</a>
Stride.**some**(_array_, _stride_, _callback_)

<a id="stride-every" href="#stride-every">#</a>
Stride.**every**(_array_, _stride_, _callback_)

<a id="stride-reduce" href="#stride-reduce">#</a>
Stride.**reduce**(_array_, _stride_, _callback_, _initial_)

<a id="stride-set" href="#stride-set">#</a>
Stride.**set**(_array_, _stride_, _item_)

<a id="stride-transform" href="#stride-transform">#</a>
Stride.**transform**(_array_, _stride_, _callback_)

### URL

<a id="new-url-1" href="#new-url-1">#</a>
new **URL**(_url_ [, _parser_])<br>
<a id="new-url-2" href="#new-url-2">#</a>
new **URL**(_url_, _baseUrl_ [, _parser_])

<a id="url-protocol" href="#url-protocol">#</a>
_url_.**protocol**

<a id="url-slashes" href="#url-slashes">#</a>
_url_.**slashes**

<a id="url-auth" href="#url-auth">#</a>
_url_.**auth**

<a id="url-username" href="#url-username">#</a>
_url_.**username**

<a id="url-password" href="#url-password">#</a>
_url_.**password**

<a id="url-host" href="#url-host">#</a>
_url_.**host**

<a id="url-hostname" href="#url-hostname">#</a>
_url_.**hostname**

<a id="url-port" href="#url-port">#</a>
_url_.**port**

<a id="url-pathname" href="#url-pathname">#</a>
_url_.**pathname**

<a id="url-query" href="#url-query">#</a>
_url_.**query**

<a id="url-hash" href="#url-hash">#</a>
_url_.**hash**

<a id="url-href" href="#url-href">#</a>
_url_.**href**

<a id="url-origin" href="#url-origin">#</a>
_url_.**origin**

<a id="url-toString" href="#url-toString">#</a>
_url_.**toString**()

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
