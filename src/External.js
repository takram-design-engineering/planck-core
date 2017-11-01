//
//  The MIT License
//
//  Copyright (C) 2016-Present Shota Matsuda
//
//  Permission is hereby granted, free of charge, to any person obtaining a
//  copy of this software and associated documentation files (the "Software"),
//  to deal in the Software without restriction, including without limitation
//  the rights to use, copy, modify, merge, publish, distribute, sublicense,
//  and/or sell copies of the Software, and to permit persons to whom the
//  Software is furnished to do so, subject to the following conditions:
//
//  The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
//  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
//  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
//  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
//  DEALINGS IN THE SOFTWARE.
//

import Environment from './Environment'

function branchingImport(arg) {
  // Assuming `process.browser` is defined via DefinePlugin on webpack, this
  // conditional will be determined at transpilation time, and `else` block will
  // be completely removed in order to prevent webpack from bundling module.
  let name
  let id
  if (typeof arg === 'string') {
    id = arg
    name = arg
  } else {
    [id] = Object.keys(arg)
    name = arg[id]
  }
  if (process.browser) {
    return Environment.self[name]
  // eslint-disable-next-line no-else-return
  } else {
    if (Environment.type !== 'node') {
      return undefined
    }
    try {
    // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(id)
    } catch (error) {}
    return undefined
  }
}

function runtimeImport(id) {
  // This will throw error on browser, in which `process` is typically not
  // defined in the global scope. Re-importing after defining `process.browser`
  // in the global scope will evaluate the conditional in `branchingImport` for
  // rollup's bundles.
  try {
    return branchingImport(id)
  } catch (e) {
    Environment.self.process = {
      browser: Environment.type !== 'node',
    }
  }
  return branchingImport(id)
}

function importOptional(id) {
  const module = runtimeImport(id)
  if (module === undefined) {
    return {}
  }
  return module
}

function importRequired(id) {
  const module = runtimeImport(id)
  if (module === undefined) {
    if (Environment.type === 'node') {
      throw new Error(`Could not resolve module "${id}"`)
    } else {
      throw new Error(`"${id}" isn’t defined in the global scope`)
    }
  }
  return module
}

function importNode(id) {
  const module = runtimeImport(id)
  if (module === undefined) {
    if (Environment.type === 'node') {
      throw new Error(`Could not resolve module "${id}"`)
    }
    return {}
  }
  return module
}

function importBrowser(id) {
  const module = runtimeImport(id)
  if (module === undefined) {
    if (Environment.type !== 'node') {
      throw new Error(`"${id}" isn’t defined in the global scope`)
    }
    return {}
  }
  return module
}

export default {
  optional: importOptional,
  required: importRequired,
  browser: importBrowser,
  node: importNode,
}
