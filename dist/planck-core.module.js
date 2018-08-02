import nodePath from 'path';
import fs from 'fs';
import request from 'request';

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function createNamespace(name) {
  var symbol = Symbol(name);
  return function namespace(object, init) {
    if (object[symbol] == null) {
      if (typeof init === 'function') {
        object[symbol] = init({});
      } else {
        object[symbol] = {};
      }
    }
    return object[symbol];
  };
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

// The MIT License

var internal = createNamespace('AggregateFunction');

var AggregateFunction = function () {
  // This constructor provides for inheritance only
  function AggregateFunction(namespace) {
    classCallCheck(this, AggregateFunction);

    if (namespace !== internal) {
      throw new Error('Use the static new function instead of new operator');
    }

    for (var _len = arguments.length, targets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      targets[_key - 1] = arguments[_key];
    }

    internal(this).targets = targets;
  }

  createClass(AggregateFunction, [{
    key: 'apply',
    value: function apply(target, bound, args) {
      var _internal = internal(this),
          targets = _internal.targets;

      var result = [];
      for (var i = 0; i < targets.length; ++i) {
        result.push(targets[i].apply(bound, args));
      }
      return result;
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return new Proxy(function () {}, new (Function.prototype.bind.apply(this, [null].concat([internal], args)))());
    }
  }]);
  return AggregateFunction;
}();

// The MIT License

var internal$1 = createNamespace('Aggregate');

var Aggregate = function () {
  // This constructor provides for inheritance only
  function Aggregate(namespace) {
    classCallCheck(this, Aggregate);

    if (namespace !== internal$1) {
      throw new Error('Use the static new function instead of new operator');
    }

    for (var _len = arguments.length, targets = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      targets[_key - 1] = arguments[_key];
    }

    internal$1(this).targets = targets;
  }

  createClass(Aggregate, [{
    key: 'set',
    value: function set$$1(target, property, value, receiver) {
      var _internal = internal$1(this),
          targets = _internal.targets;

      for (var i = 0; i < targets.length; ++i) {
        targets[i][property] = value;
      }
      target[property] = value;
      return true;
    }
  }, {
    key: 'get',
    value: function get$$1(target, property, receiver) {
      var _internal2 = internal$1(this),
          targets = _internal2.targets;
      // Return the first target's property if the given property is not a
      // function for the given target.


      if (typeof target[property] !== 'function') {
        var _targets = slicedToArray(targets, 1),
            firstTarget = _targets[0];

        return firstTarget && firstTarget[property];
      }
      var args = [];
      for (var i = 0; i < targets.length; ++i) {
        var _target = targets[i];
        args.push(_target[property].bind(_target));
      }
      return AggregateFunction.new.apply(AggregateFunction, args);
    }
  }], [{
    key: 'new',
    value: function _new() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      // Passing the internal forces users to call new instead of constructor
      return new Proxy({}, new (Function.prototype.bind.apply(this, [null].concat([internal$1], args)))());
    }
  }]);
  return Aggregate;
}();

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function min(array, transform) {
  var result = void 0;
  var min = Number.POSITIVE_INFINITY;
  if (typeof transform !== 'function') {
    for (var index = 0; index < array.length; ++index) {
      var item = array[index];
      if (item < min) {
        result = item;
        min = item;
      }
    }
    return result;
  }
  for (var _index = 0; _index < array.length; ++_index) {
    var _item = array[_index];
    var transformed = transform(_item, _index);
    if (transformed < min) {
      result = _item;
      min = transformed;
    }
  }
  return result;
}

function max(array, transform) {
  var result = void 0;
  var max = Number.NEGATIVE_INFINITY;
  if (typeof transform !== 'function') {
    for (var index = 0; index < array.length; ++index) {
      var item = array[index];
      if (item > max) {
        result = item;
        max = item;
      }
    }
    return result;
  }
  for (var _index2 = 0; _index2 < array.length; ++_index2) {
    var _item2 = array[_index2];
    var transformed = transform(_item2, _index2);
    if (transformed > max) {
      result = _item2;
      max = transformed;
    }
  }
  return result;
}

var Array$1 = {
  min: min,
  max: max
};

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function AssertionError(message) {
  this.message = message;
}

Object.setPrototypeOf(AssertionError, Error);
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.message = '';
AssertionError.prototype.constructor = AssertionError;

// 'path' module extracted from Node.js v8.11.1 (only the posix part)

function assertPath(path) {
  if (typeof path !== 'string') {
    throw new TypeError('Path must be a string. Received ' + JSON.stringify(path));
  }
}

// Resolves . and .. elements in a path with directory names
function normalizeStringPosix(path, allowAboveRoot) {
  var res = '';
  var lastSegmentLength = 0;
  var lastSlash = -1;
  var dots = 0;
  var code;
  for (var i = 0; i <= path.length; ++i) {
    if (i < path.length) code = path.charCodeAt(i);else if (code === 47 /*/*/) break;else code = 47 /*/*/;
    if (code === 47 /*/*/) {
        if (lastSlash === i - 1 || dots === 1) ; else if (lastSlash !== i - 1 && dots === 2) {
          if (res.length < 2 || lastSegmentLength !== 2 || res.charCodeAt(res.length - 1) !== 46 /*.*/ || res.charCodeAt(res.length - 2) !== 46 /*.*/) {
              if (res.length > 2) {
                var lastSlashIndex = res.lastIndexOf('/');
                if (lastSlashIndex !== res.length - 1) {
                  if (lastSlashIndex === -1) {
                    res = '';
                    lastSegmentLength = 0;
                  } else {
                    res = res.slice(0, lastSlashIndex);
                    lastSegmentLength = res.length - 1 - res.lastIndexOf('/');
                  }
                  lastSlash = i;
                  dots = 0;
                  continue;
                }
              } else if (res.length === 2 || res.length === 1) {
                res = '';
                lastSegmentLength = 0;
                lastSlash = i;
                dots = 0;
                continue;
              }
            }
          if (allowAboveRoot) {
            if (res.length > 0) res += '/..';else res = '..';
            lastSegmentLength = 2;
          }
        } else {
          if (res.length > 0) res += '/' + path.slice(lastSlash + 1, i);else res = path.slice(lastSlash + 1, i);
          lastSegmentLength = i - lastSlash - 1;
        }
        lastSlash = i;
        dots = 0;
      } else if (code === 46 /*.*/ && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}

function _format(sep, pathObject) {
  var dir = pathObject.dir || pathObject.root;
  var base = pathObject.base || (pathObject.name || '') + (pathObject.ext || '');
  if (!dir) {
    return base;
  }
  if (dir === pathObject.root) {
    return dir + base;
  }
  return dir + sep + base;
}

var posix = {
  // path.resolve([from ...], to)
  resolve: function resolve() {
    var resolvedPath = '';
    var resolvedAbsolute = false;
    var cwd;

    for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path;
      if (i >= 0) path = arguments[i];else {
        if (cwd === undefined) cwd = process.cwd();
        path = cwd;
      }

      assertPath(path);

      // Skip empty entries
      if (path.length === 0) {
        continue;
      }

      resolvedPath = path + '/' + resolvedPath;
      resolvedAbsolute = path.charCodeAt(0) === 47 /*/*/;
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeStringPosix(resolvedPath, !resolvedAbsolute);

    if (resolvedAbsolute) {
      if (resolvedPath.length > 0) return '/' + resolvedPath;else return '/';
    } else if (resolvedPath.length > 0) {
      return resolvedPath;
    } else {
      return '.';
    }
  },

  normalize: function normalize(path) {
    assertPath(path);

    if (path.length === 0) return '.';

    var isAbsolute = path.charCodeAt(0) === 47 /*/*/;
    var trailingSeparator = path.charCodeAt(path.length - 1) === 47 /*/*/;

    // Normalize the path
    path = normalizeStringPosix(path, !isAbsolute);

    if (path.length === 0 && !isAbsolute) path = '.';
    if (path.length > 0 && trailingSeparator) path += '/';

    if (isAbsolute) return '/' + path;
    return path;
  },

  isAbsolute: function isAbsolute(path) {
    assertPath(path);
    return path.length > 0 && path.charCodeAt(0) === 47 /*/*/;
  },

  join: function join() {
    if (arguments.length === 0) return '.';
    var joined;
    for (var i = 0; i < arguments.length; ++i) {
      var arg = arguments[i];
      assertPath(arg);
      if (arg.length > 0) {
        if (joined === undefined) joined = arg;else joined += '/' + arg;
      }
    }
    if (joined === undefined) return '.';
    return posix.normalize(joined);
  },

  relative: function relative(from, to) {
    assertPath(from);
    assertPath(to);

    if (from === to) return '';

    from = posix.resolve(from);
    to = posix.resolve(to);

    if (from === to) return '';

    // Trim any leading backslashes
    var fromStart = 1;
    for (; fromStart < from.length; ++fromStart) {
      if (from.charCodeAt(fromStart) !== 47 /*/*/) break;
    }
    var fromEnd = from.length;
    var fromLen = fromEnd - fromStart;

    // Trim any leading backslashes
    var toStart = 1;
    for (; toStart < to.length; ++toStart) {
      if (to.charCodeAt(toStart) !== 47 /*/*/) break;
    }
    var toEnd = to.length;
    var toLen = toEnd - toStart;

    // Compare paths to find the longest common path from root
    var length = fromLen < toLen ? fromLen : toLen;
    var lastCommonSep = -1;
    var i = 0;
    for (; i <= length; ++i) {
      if (i === length) {
        if (toLen > length) {
          if (to.charCodeAt(toStart + i) === 47 /*/*/) {
              // We get here if `from` is the exact base path for `to`.
              // For example: from='/foo/bar'; to='/foo/bar/baz'
              return to.slice(toStart + i + 1);
            } else if (i === 0) {
            // We get here if `from` is the root
            // For example: from='/'; to='/foo'
            return to.slice(toStart + i);
          }
        } else if (fromLen > length) {
          if (from.charCodeAt(fromStart + i) === 47 /*/*/) {
              // We get here if `to` is the exact base path for `from`.
              // For example: from='/foo/bar/baz'; to='/foo/bar'
              lastCommonSep = i;
            } else if (i === 0) {
            // We get here if `to` is the root.
            // For example: from='/foo'; to='/'
            lastCommonSep = 0;
          }
        }
        break;
      }
      var fromCode = from.charCodeAt(fromStart + i);
      var toCode = to.charCodeAt(toStart + i);
      if (fromCode !== toCode) break;else if (fromCode === 47 /*/*/) lastCommonSep = i;
    }

    var out = '';
    // Generate the relative path based on the path difference between `to`
    // and `from`
    for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
      if (i === fromEnd || from.charCodeAt(i) === 47 /*/*/) {
          if (out.length === 0) out += '..';else out += '/..';
        }
    }

    // Lastly, append the rest of the destination (`to`) path that comes after
    // the common path parts
    if (out.length > 0) return out + to.slice(toStart + lastCommonSep);else {
      toStart += lastCommonSep;
      if (to.charCodeAt(toStart) === 47 /*/*/) ++toStart;
      return to.slice(toStart);
    }
  },

  _makeLong: function _makeLong(path) {
    return path;
  },

  dirname: function dirname(path) {
    assertPath(path);
    if (path.length === 0) return '.';
    var code = path.charCodeAt(0);
    var hasRoot = code === 47 /*/*/;
    var end = -1;
    var matchedSlash = true;
    for (var i = path.length - 1; i >= 1; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          if (!matchedSlash) {
            end = i;
            break;
          }
        } else {
        // We saw the first non-path separator
        matchedSlash = false;
      }
    }

    if (end === -1) return hasRoot ? '/' : '.';
    if (hasRoot && end === 1) return '//';
    return path.slice(0, end);
  },

  basename: function basename(path, ext) {
    if (ext !== undefined && typeof ext !== 'string') throw new TypeError('"ext" argument must be a string');
    assertPath(path);

    var start = 0;
    var end = -1;
    var matchedSlash = true;
    var i;

    if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
      if (ext.length === path.length && ext === path) return '';
      var extIdx = ext.length - 1;
      var firstNonSlashEnd = -1;
      for (i = path.length - 1; i >= 0; --i) {
        var code = path.charCodeAt(i);
        if (code === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else {
          if (firstNonSlashEnd === -1) {
            // We saw the first non-path separator, remember this index in case
            // we need it if the extension ends up not matching
            matchedSlash = false;
            firstNonSlashEnd = i + 1;
          }
          if (extIdx >= 0) {
            // Try to match the explicit extension
            if (code === ext.charCodeAt(extIdx)) {
              if (--extIdx === -1) {
                // We matched the extension, so mark this as the end of our path
                // component
                end = i;
              }
            } else {
              // Extension does not match, so our result is the entire path
              // component
              extIdx = -1;
              end = firstNonSlashEnd;
            }
          }
        }
      }

      if (start === end) end = firstNonSlashEnd;else if (end === -1) end = path.length;
      return path.slice(start, end);
    } else {
      for (i = path.length - 1; i >= 0; --i) {
        if (path.charCodeAt(i) === 47 /*/*/) {
            // If we reached a path separator that was not part of a set of path
            // separators at the end of the string, stop now
            if (!matchedSlash) {
              start = i + 1;
              break;
            }
          } else if (end === -1) {
          // We saw the first non-path separator, mark this as the end of our
          // path component
          matchedSlash = false;
          end = i + 1;
        }
      }

      if (end === -1) return '';
      return path.slice(start, end);
    }
  },

  extname: function extname(path) {
    assertPath(path);
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;
    for (var i = path.length - 1; i >= 0; --i) {
      var code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return '';
    }
    return path.slice(startDot, end);
  },

  format: function format(pathObject) {
    if (pathObject === null || (typeof pathObject === 'undefined' ? 'undefined' : _typeof(pathObject)) !== 'object') {
      throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + (typeof pathObject === 'undefined' ? 'undefined' : _typeof(pathObject)));
    }
    return _format('/', pathObject);
  },

  parse: function parse(path) {
    assertPath(path);

    var ret = { root: '', dir: '', base: '', ext: '', name: '' };
    if (path.length === 0) return ret;
    var code = path.charCodeAt(0);
    var isAbsolute = code === 47 /*/*/;
    var start;
    if (isAbsolute) {
      ret.root = '/';
      start = 1;
    } else {
      start = 0;
    }
    var startDot = -1;
    var startPart = 0;
    var end = -1;
    var matchedSlash = true;
    var i = path.length - 1;

    // Track the state of characters (if any) we see before our first dot and
    // after any path separator we find
    var preDotState = 0;

    // Get non-dir info
    for (; i >= start; --i) {
      code = path.charCodeAt(i);
      if (code === 47 /*/*/) {
          // If we reached a path separator that was not part of a set of path
          // separators at the end of the string, stop now
          if (!matchedSlash) {
            startPart = i + 1;
            break;
          }
          continue;
        }
      if (end === -1) {
        // We saw the first non-path separator, mark this as the end of our
        // extension
        matchedSlash = false;
        end = i + 1;
      }
      if (code === 46 /*.*/) {
          // If this is our first dot, mark it as the start of our extension
          if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
        } else if (startDot !== -1) {
        // We saw a non-dot and non-path separator before our dot, so we should
        // have a good chance at having a non-empty extension
        preDotState = -1;
      }
    }

    if (startDot === -1 || end === -1 ||
    // We saw a non-dot character immediately before the dot
    preDotState === 0 ||
    // The (right-most) trimmed path component is exactly '..'
    preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      if (end !== -1) {
        if (startPart === 0 && isAbsolute) ret.base = ret.name = path.slice(1, end);else ret.base = ret.name = path.slice(startPart, end);
      }
    } else {
      if (startPart === 0 && isAbsolute) {
        ret.name = path.slice(1, startDot);
        ret.base = path.slice(1, end);
      } else {
        ret.name = path.slice(startPart, startDot);
        ret.base = path.slice(startPart, end);
      }
      ret.ext = path.slice(startDot, end);
    }

    if (startPart > 0) ret.dir = path.slice(0, startPart - 1);else if (isAbsolute) ret.dir = '/';

    return ret;
  },

  sep: '/',
  delimiter: ':',
  win32: null,
  posix: null
};

posix.posix = posix;

var pathBrowserify = posix;

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

/* eslint-env worker */
/* eslint-disable no-new-func */

var isBrowser = function () {
  try {
    if (new Function('return this === window')()) {
      return true;
    }
  } catch (error) {}
  return false;
}();

var isWorker = !isBrowser && function () {
  try {
    if (new Function('return this === self')()) {
      return true;
    }
  } catch (error) {}
  return false;
}();

var isNode = !isBrowser && !isWorker && function () {
  try {
    if (new Function('return this === global')()) {
      return true;
    }
  } catch (error) {}
  return false;
}();

var globalScope = function () {
  if (isBrowser) {
    return window;
  }
  if (isWorker) {
    return self;
  }
  if (isNode) {
    return global;
  }
  return undefined;
}();

var Global = {
  isBrowser: isBrowser,
  isWorker: isWorker,
  isNode: isNode,
  scope: globalScope
};

// The MIT License

var _ref = function () {
  if (isNode) {
    return nodePath;
  }
  return _extends({}, pathBrowserify, {
    resolve: function resolve() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return pathBrowserify.resolve.apply(pathBrowserify, ['/'].concat(args));
    }
  });
}();

var resolve = _ref.resolve,
    normalize = _ref.normalize,
    join = _ref.join,
    relative = _ref.relative,
    dirname = _ref.dirname,
    basename = _ref.basename,
    extname = _ref.extname,
    delimiter = _ref.delimiter,
    sep = _ref.sep;


var FilePath = {
  resolve: resolve,
  normalize: normalize,
  join: join,
  relative: relative,
  dirname: dirname,
  basename: basename,
  extname: extname,
  delimiter: delimiter,
  sep: sep
};

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
  (function () {
    var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        crypt = {
      // Bit-wise rotation left
      rotl: function rotl(n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotation right
      rotr: function rotr(n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function endian(n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) {
          n[i] = crypt.endian(n[i]);
        }return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function randomBytes(n) {
        for (var bytes = []; n > 0; n--) {
          bytes.push(Math.floor(Math.random() * 256));
        }return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function bytesToWords(bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) {
          words[b >>> 5] |= bytes[i] << 24 - b % 32;
        }return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function wordsToBytes(words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) {
          bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        }return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function bytesToHex(bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) {
          bytes.push(parseInt(hex.substr(c, 2), 16));
        }return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function bytesToBase64(bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) {
            if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
          }
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function base64ToBytes(base64) {
        // Remove non-base-64 characters
        base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

        for (var bytes = [], i = 0, imod4 = 0; i < base64.length; imod4 = ++i % 4) {
          if (imod4 == 0) continue;
          bytes.push((base64map.indexOf(base64.charAt(i - 1)) & Math.pow(2, -2 * imod4 + 8) - 1) << imod4 * 2 | base64map.indexOf(base64.charAt(i)) >>> 6 - imod4 * 2);
        }
        return bytes;
      }
    };

    module.exports = crypt;
  })();
});

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function stringToBytes(str) {
      for (var bytes = [], i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
      }return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function bytesToString(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) {
        str.push(String.fromCharCode(bytes[i]));
      }return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function isBuffer_1(obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};

function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

var md5 = createCommonjsModule(function (module) {
  (function () {
    var crypt$$1 = crypt,
        utf8 = charenc_1.utf8,
        isBuffer = isBuffer_1,
        bin = charenc_1.bin,


    // The core
    md5 = function md5(message, options) {
      // Convert to byte array
      if (message.constructor == String) {
        if (options && options.encoding === 'binary') message = bin.stringToBytes(message);else message = utf8.stringToBytes(message);
      } else if (isBuffer(message)) message = Array.prototype.slice.call(message, 0);else if (!Array.isArray(message)) message = message.toString();
      // else, assume byte array already

      var m = crypt$$1.bytesToWords(message),
          l = message.length * 8,
          a = 1732584193,
          b = -271733879,
          c = -1732584194,
          d = 271733878;

      // Swap endian
      for (var i = 0; i < m.length; i++) {
        m[i] = (m[i] << 8 | m[i] >>> 24) & 0x00FF00FF | (m[i] << 24 | m[i] >>> 8) & 0xFF00FF00;
      }

      // Padding
      m[l >>> 5] |= 0x80 << l % 32;
      m[(l + 64 >>> 9 << 4) + 14] = l;

      // Method shortcuts
      var FF = md5._ff,
          GG = md5._gg,
          HH = md5._hh,
          II = md5._ii;

      for (var i = 0; i < m.length; i += 16) {

        var aa = a,
            bb = b,
            cc = c,
            dd = d;

        a = FF(a, b, c, d, m[i + 0], 7, -680876936);
        d = FF(d, a, b, c, m[i + 1], 12, -389564586);
        c = FF(c, d, a, b, m[i + 2], 17, 606105819);
        b = FF(b, c, d, a, m[i + 3], 22, -1044525330);
        a = FF(a, b, c, d, m[i + 4], 7, -176418897);
        d = FF(d, a, b, c, m[i + 5], 12, 1200080426);
        c = FF(c, d, a, b, m[i + 6], 17, -1473231341);
        b = FF(b, c, d, a, m[i + 7], 22, -45705983);
        a = FF(a, b, c, d, m[i + 8], 7, 1770035416);
        d = FF(d, a, b, c, m[i + 9], 12, -1958414417);
        c = FF(c, d, a, b, m[i + 10], 17, -42063);
        b = FF(b, c, d, a, m[i + 11], 22, -1990404162);
        a = FF(a, b, c, d, m[i + 12], 7, 1804603682);
        d = FF(d, a, b, c, m[i + 13], 12, -40341101);
        c = FF(c, d, a, b, m[i + 14], 17, -1502002290);
        b = FF(b, c, d, a, m[i + 15], 22, 1236535329);

        a = GG(a, b, c, d, m[i + 1], 5, -165796510);
        d = GG(d, a, b, c, m[i + 6], 9, -1069501632);
        c = GG(c, d, a, b, m[i + 11], 14, 643717713);
        b = GG(b, c, d, a, m[i + 0], 20, -373897302);
        a = GG(a, b, c, d, m[i + 5], 5, -701558691);
        d = GG(d, a, b, c, m[i + 10], 9, 38016083);
        c = GG(c, d, a, b, m[i + 15], 14, -660478335);
        b = GG(b, c, d, a, m[i + 4], 20, -405537848);
        a = GG(a, b, c, d, m[i + 9], 5, 568446438);
        d = GG(d, a, b, c, m[i + 14], 9, -1019803690);
        c = GG(c, d, a, b, m[i + 3], 14, -187363961);
        b = GG(b, c, d, a, m[i + 8], 20, 1163531501);
        a = GG(a, b, c, d, m[i + 13], 5, -1444681467);
        d = GG(d, a, b, c, m[i + 2], 9, -51403784);
        c = GG(c, d, a, b, m[i + 7], 14, 1735328473);
        b = GG(b, c, d, a, m[i + 12], 20, -1926607734);

        a = HH(a, b, c, d, m[i + 5], 4, -378558);
        d = HH(d, a, b, c, m[i + 8], 11, -2022574463);
        c = HH(c, d, a, b, m[i + 11], 16, 1839030562);
        b = HH(b, c, d, a, m[i + 14], 23, -35309556);
        a = HH(a, b, c, d, m[i + 1], 4, -1530992060);
        d = HH(d, a, b, c, m[i + 4], 11, 1272893353);
        c = HH(c, d, a, b, m[i + 7], 16, -155497632);
        b = HH(b, c, d, a, m[i + 10], 23, -1094730640);
        a = HH(a, b, c, d, m[i + 13], 4, 681279174);
        d = HH(d, a, b, c, m[i + 0], 11, -358537222);
        c = HH(c, d, a, b, m[i + 3], 16, -722521979);
        b = HH(b, c, d, a, m[i + 6], 23, 76029189);
        a = HH(a, b, c, d, m[i + 9], 4, -640364487);
        d = HH(d, a, b, c, m[i + 12], 11, -421815835);
        c = HH(c, d, a, b, m[i + 15], 16, 530742520);
        b = HH(b, c, d, a, m[i + 2], 23, -995338651);

        a = II(a, b, c, d, m[i + 0], 6, -198630844);
        d = II(d, a, b, c, m[i + 7], 10, 1126891415);
        c = II(c, d, a, b, m[i + 14], 15, -1416354905);
        b = II(b, c, d, a, m[i + 5], 21, -57434055);
        a = II(a, b, c, d, m[i + 12], 6, 1700485571);
        d = II(d, a, b, c, m[i + 3], 10, -1894986606);
        c = II(c, d, a, b, m[i + 10], 15, -1051523);
        b = II(b, c, d, a, m[i + 1], 21, -2054922799);
        a = II(a, b, c, d, m[i + 8], 6, 1873313359);
        d = II(d, a, b, c, m[i + 15], 10, -30611744);
        c = II(c, d, a, b, m[i + 6], 15, -1560198380);
        b = II(b, c, d, a, m[i + 13], 21, 1309151649);
        a = II(a, b, c, d, m[i + 4], 6, -145523070);
        d = II(d, a, b, c, m[i + 11], 10, -1120210379);
        c = II(c, d, a, b, m[i + 2], 15, 718787259);
        b = II(b, c, d, a, m[i + 9], 21, -343485551);

        a = a + aa >>> 0;
        b = b + bb >>> 0;
        c = c + cc >>> 0;
        d = d + dd >>> 0;
      }

      return crypt$$1.endian([a, b, c, d]);
    };

    // Auxiliary functions
    md5._ff = function (a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._gg = function (a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._hh = function (a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };
    md5._ii = function (a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return (n << s | n >>> 32 - s) + b;
    };

    // Package private blocksize
    md5._blocksize = 16;
    md5._digestsize = 16;

    module.exports = function (message, options) {
      if (message === undefined || message === null) throw new Error('Illegal argument ' + message);

      var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
      return options && options.asBytes ? digestbytes : options && options.asString ? bin.bytesToString(digestbytes) : crypt$$1.bytesToHex(digestbytes);
    };
  })();
});

var at,
    // The index of the current character
ch,
    // The current character
escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
},
    text,
    error = function error(m) {
    // Call error when something is wrong.
    throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text
    };
},
    next = function next(c) {
    // If a c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
    }

    // Get the next character. When there are no more characters,
    // return the empty string.

    ch = text.charAt(at);
    at += 1;
    return ch;
},
    number = function number() {
    // Parse a number value.
    var number,
        string = '';

    if (ch === '-') {
        string = '-';
        next('-');
    }
    while (ch >= '0' && ch <= '9') {
        string += ch;
        next();
    }
    if (ch === '.') {
        string += '.';
        while (next() && ch >= '0' && ch <= '9') {
            string += ch;
        }
    }
    if (ch === 'e' || ch === 'E') {
        string += ch;
        next();
        if (ch === '-' || ch === '+') {
            string += ch;
            next();
        }
        while (ch >= '0' && ch <= '9') {
            string += ch;
            next();
        }
    }
    number = +string;
    if (!isFinite(number)) {
        error("Bad number");
    } else {
        return number;
    }
},
    string = function string() {
    // Parse a string value.
    var hex,
        i,
        string = '',
        uffff;

    // When parsing for string values, we must look for " and \ characters.
    if (ch === '"') {
        while (next()) {
            if (ch === '"') {
                next();
                return string;
            } else if (ch === '\\') {
                next();
                if (ch === 'u') {
                    uffff = 0;
                    for (i = 0; i < 4; i += 1) {
                        hex = parseInt(next(), 16);
                        if (!isFinite(hex)) {
                            break;
                        }
                        uffff = uffff * 16 + hex;
                    }
                    string += String.fromCharCode(uffff);
                } else if (typeof escapee[ch] === 'string') {
                    string += escapee[ch];
                } else {
                    break;
                }
            } else {
                string += ch;
            }
        }
    }
    error("Bad string");
},
    white = function white() {

    // Skip whitespace.

    while (ch && ch <= ' ') {
        next();
    }
},
    word = function word() {

    // true, false, or null.

    switch (ch) {
        case 't':
            next('t');
            next('r');
            next('u');
            next('e');
            return true;
        case 'f':
            next('f');
            next('a');
            next('l');
            next('s');
            next('e');
            return false;
        case 'n':
            next('n');
            next('u');
            next('l');
            next('l');
            return null;
    }
    error("Unexpected '" + ch + "'");
},
    value,
    // Place holder for the value function.

array = function array() {

    // Parse an array value.

    var array = [];

    if (ch === '[') {
        next('[');
        white();
        if (ch === ']') {
            next(']');
            return array; // empty array
        }
        while (ch) {
            array.push(value());
            white();
            if (ch === ']') {
                next(']');
                return array;
            }
            next(',');
            white();
        }
    }
    error("Bad array");
},
    object = function object() {

    // Parse an object value.

    var key,
        object = {};

    if (ch === '{') {
        next('{');
        white();
        if (ch === '}') {
            next('}');
            return object; // empty object
        }
        while (ch) {
            key = string();
            white();
            next(':');
            if (Object.hasOwnProperty.call(object, key)) {
                error('Duplicate key "' + key + '"');
            }
            object[key] = value();
            white();
            if (ch === '}') {
                next('}');
                return object;
            }
            next(',');
            white();
        }
    }
    error("Bad object");
};

value = function value() {

    // Parse a JSON value. It could be an object, an array, a string, a number,
    // or a word.

    white();
    switch (ch) {
        case '{':
            return object();
        case '[':
            return array();
        case '"':
            return string();
        case '-':
            return number();
        default:
            return ch >= '0' && ch <= '9' ? number() : word();
    }
};

// Return the json_parse function. It will have access to all of the above
// functions and variables.

var parse = function parse(source, reviver) {
    var result;

    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }

    // If there is a reviver function, we recursively walk the new structure,
    // passing each name/value pair to the reviver function for possible
    // transformation, starting with a temporary root object that holds the result
    // in an empty key. If there is not a reviver function, we simply return the
    // result.

    return typeof reviver === 'function' ? function walk(holder, key) {
        var k,
            v,
            value = holder[key];
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            for (k in value) {
                if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = walk(value, k);
                    if (v !== undefined) {
                        value[k] = v;
                    } else {
                        delete value[k];
                    }
                }
            }
        }
        return reviver.call(holder, key, value);
    }({ '': result }, '') : result;
};

var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = { // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
},
    rep;

function quote(string) {
    // If the string contains no control characters, no quote characters, and no
    // backslash characters, then we can safely slap some quotes around it.
    // Otherwise we must also replace the offending characters with safe escape
    // sequences.

    escapable.lastIndex = 0;
    return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' : '"' + string + '"';
}

function str(key, holder) {
    // Produce a string from holder[key].
    var i,
        // The loop counter.
    k,
        // The member key.
    v,
        // The member value.
    length,
        mind = gap,
        partial,
        value = holder[key];

    // If the value has a toJSON method, call it to obtain a replacement value.
    if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.
    switch (typeof value === 'undefined' ? 'undefined' : _typeof(value)) {
        case 'string':
            return quote(value);

        case 'number':
            // JSON numbers must be finite. Encode non-finite numbers as null.
            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':
            // If the value is a boolean or null, convert it to a string. Note:
            // typeof null does not produce 'null'. The case is included here in
            // the remote chance that this gets fixed someday.
            return String(value);

        case 'object':
            if (!value) return 'null';
            gap += indent;
            partial = [];

            // Array.isArray
            if (Object.prototype.toString.apply(value) === '[object Array]') {
                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

                // Join all of the elements together, separated with commas, and
                // wrap them in brackets.
                v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

            // If the replacer is an array, use it to select the members to be
            // stringified.
            if (rep && (typeof rep === 'undefined' ? 'undefined' : _typeof(rep)) === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {
                // Otherwise, iterate through all of the keys in the object.
                for (k in value) {
                    if (Object.prototype.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

            // Join all of the member texts together, separated with commas,
            // and wrap them in braces.

            v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
    }
}

var stringify = function stringify(value, replacer, space) {
    var i;
    gap = '';
    indent = '';

    // If the space parameter is a number, make an indent string containing that
    // many spaces.
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    }
    // If the space parameter is a string, it will be used as the indent string.
    else if (typeof space === 'string') {
            indent = space;
        }

    // If there is a replacer, it must be a function or an array.
    // Otherwise, throw an error.
    rep = replacer;
    if (replacer && typeof replacer !== 'function' && ((typeof replacer === 'undefined' ? 'undefined' : _typeof(replacer)) !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', { '': value });
};

var parse$1 = parse;
var stringify$1 = stringify;

var jsonify = {
	parse: parse$1,
	stringify: stringify$1
};

var json = typeof JSON !== 'undefined' ? JSON : jsonify;

var jsonStableStringify = function jsonStableStringify(obj, opts) {
    if (!opts) opts = {};
    if (typeof opts === 'function') opts = { cmp: opts };
    var space = opts.space || '';
    if (typeof space === 'number') space = Array(space + 1).join(' ');
    var cycles = typeof opts.cycles === 'boolean' ? opts.cycles : false;
    var replacer = opts.replacer || function (key, value) {
        return value;
    };

    var cmp = opts.cmp && function (f) {
        return function (node) {
            return function (a, b) {
                var aobj = { key: a, value: node[a] };
                var bobj = { key: b, value: node[b] };
                return f(aobj, bobj);
            };
        };
    }(opts.cmp);

    var seen = [];
    return function stringify(parent, key, node, level) {
        var indent = space ? '\n' + new Array(level + 1).join(space) : '';
        var colonSeparator = space ? ': ' : ':';

        if (node && node.toJSON && typeof node.toJSON === 'function') {
            node = node.toJSON();
        }

        node = replacer.call(parent, key, node);

        if (node === undefined) {
            return;
        }
        if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object' || node === null) {
            return json.stringify(node);
        }
        if (isArray(node)) {
            var out = [];
            for (var i = 0; i < node.length; i++) {
                var item = stringify(node, i, node[i], level + 1) || json.stringify(null);
                out.push(indent + space + item);
            }
            return '[' + out.join(',') + indent + ']';
        } else {
            if (seen.indexOf(node) !== -1) {
                if (cycles) return json.stringify('__cycle__');
                throw new TypeError('Converting circular structure to JSON');
            } else seen.push(node);

            var keys = objectKeys(node).sort(cmp && cmp(node));
            var out = [];
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                var value = stringify(node, key, node[key], level + 1);

                if (!value) continue;

                var keyValue = json.stringify(key) + colonSeparator + value;
                out.push(indent + space + keyValue);
            }
            seen.splice(seen.indexOf(node), 1);
            return '{' + out.join(',') + indent + '}';
        }
    }({ '': obj }, '', obj, 0);
};

var isArray = Array.isArray || function (x) {
    return {}.toString.call(x) === '[object Array]';
};

var objectKeys = Object.keys || function (obj) {
    var has = Object.prototype.hasOwnProperty || function () {
        return true;
    };
    var keys = [];
    for (var key in obj) {
        if (has.call(obj, key)) keys.push(key);
    }
    return keys;
};

// The MIT License

function generateHash(object) {
  return md5(jsonStableStringify(object));
}

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function ImplementationError(message) {
  this.message = message;
}

Object.setPrototypeOf(ImplementationError, Error);
ImplementationError.prototype = Object.create(Error.prototype);
ImplementationError.prototype.name = 'ImplementationError';
ImplementationError.prototype.message = '';
ImplementationError.prototype.constructor = ImplementationError;

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function lerp(start, stop, amount) {
  return start + (stop - start) * amount;
}

function constrain(x, min, max) {
  return x < min ? min : x > max ? max : x;
}

function map(x, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((x - min1) / (max1 - min1));
}

function wrap(x, min, max) {
  if (x < min) {
    return max - (min - x) % (max - min);
  }
  return min + (x - min) % (max - min);
}

// GLSL functions

function radians(degrees) {
  if (Array.isArray(degrees)) {
    return degrees.map(radians);
  }
  return degrees * 0.017453292519943295;
}

function degrees(radians) {
  if (Array.isArray(radians)) {
    return radians.map(degrees);
  }
  return radians * 57.29577951308232;
}

function sin(angle) {
  if (Array.isArray(angle)) {
    return angle.map(sin);
  }
  return Math.sin(angle);
}

function cos(angle) {
  if (Array.isArray(angle)) {
    return angle.map(cos);
  }
  return Math.cos(angle);
}

function tan(angle) {
  if (Array.isArray(angle)) {
    return angle.map(tan);
  }
  return Math.tan(angle);
}

function asin(x) {
  if (Array.isArray(x)) {
    return x.map(asin);
  }
  return Math.asin(x);
}

function acos(x) {
  if (Array.isArray(x)) {
    return x.map(acos);
  }
  return Math.acos(x);
}

function atan(y, x) {
  if (x != null) {
    if (Array.isArray(y)) {
      return y.map(function (y, i) {
        return atan(y, x[i]);
      });
    }
    return Math.atan2(y, x);
  }
  if (Array.isArray(y)) {
    return y.map(function (y) {
      return atan(y);
    });
  }
  return Math.atan(y);
}

function pow(x, y) {
  if (Array.isArray(x)) {
    return x.map(function (x, i) {
      return pow(x, y[i]);
    });
  }
  return Math.pow(x, y);
}

function exp(x) {
  if (Array.isArray(x)) {
    return x.map(exp);
  }
  return Math.exp(x);
}

function log(x) {
  if (Array.isArray(x)) {
    return x.map(log);
  }
  return Math.log(x);
}

function exp2(x) {
  if (Array.isArray(x)) {
    return x.map(exp2);
  }
  return Math.pow(2, x);
}

function log2(x) {
  if (Array.isArray(x)) {
    return x.map(log2);
  }
  return Math.log2(x);
}

function sqrt(x) {
  if (Array.isArray(x)) {
    return x.map(sqrt);
  }
  return Math.sqrt(x);
}

function inversesqrt(x) {
  if (Array.isArray(x)) {
    return x.map(inversesqrt);
  }
  return 1 / Math.sqrt(x);
}

function abs(x) {
  if (Array.isArray(x)) {
    return x.map(abs);
  }
  return Math.abs(x);
}

function sign(x) {
  if (Array.isArray(x)) {
    return x.map(sign);
  }
  return Math.sign(x);
}

function floor(x) {
  if (Array.isArray(x)) {
    return x.map(floor);
  }
  return Math.floor(x);
}

function ceil(x) {
  if (Array.isArray(x)) {
    return x.map(ceil);
  }
  return Math.ceil(x);
}

function fract(x) {
  if (Array.isArray(x)) {
    return x.map(fract);
  }
  return x - Math.floor(x);
}

function mod(x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map(function (x, i) {
        return mod(x, y[i]);
      });
    }
    return x.map(function (x) {
      return mod(x, y);
    });
  }
  return x % y;
}

function min$1(x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map(function (x, i) {
        return min$1(x, y[i]);
      });
    }
    return x.map(function (x) {
      return min$1(x, y);
    });
  }
  return Math.min(x, y);
}

function max$1(x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map(function (x, i) {
        return max$1(x, y[i]);
      });
    }
    return x.map(function (x) {
      return max$1(x, y);
    });
  }
  return Math.max(x, y);
}

function clamp(x, min, max) {
  if (Array.isArray(x)) {
    if (Array.isArray(min)) {
      return x.map(function (x, i) {
        return clamp(x, min[i], max[i]);
      });
    }
    return x.map(function (x) {
      return clamp(x, min, max);
    });
  }
  return Math.min(Math.max(x, min), max);
}

function mix(x, y, a) {
  if (Array.isArray(x)) {
    if (Array.isArray(a)) {
      return x.map(function (x, i) {
        return mix(x, y[i], a[i]);
      });
    }
    return x.map(function (x, i) {
      return mix(x, y[i], a);
    });
  }
  return x * (1 - a) + y * a;
}

function step(edge, x) {
  if (Array.isArray(x)) {
    if (Array.isArray(edge)) {
      return x.map(function (x, i) {
        return step(edge[i], x);
      });
    }
    return x.map(function (x) {
      return step(edge, x);
    });
  }
  return x < edge ? 0 : 1;
}

function smoothstep(edge0, edge1, x) {
  if (Array.isArray(x)) {
    if (Array.isArray(edge0)) {
      return x.map(function (x, i) {
        return smoothstep(edge0[i], edge1[i], x);
      });
    }
    return x.map(function (x) {
      return smoothstep(edge0, edge1, x);
    });
  }
  var t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function length(x) {
  if (!Array.isArray(x)) {
    return Math.abs(x);
  }
  return Math.sqrt(x.reduce(function (sum, x) {
    return sum + x * x;
  }, 0));
}

function distance(x, y) {
  if (!Array.isArray(x)) {
    return Math.abs(x - y);
  }
  return Math.sqrt(x.reduce(function (sum, x, i) {
    return sum + (x - y[i]) * (x - y[i]);
  }, 0));
}

function dot(x, y) {
  if (!Array.isArray(x)) {
    return x * y;
  }
  return x.reduce(function (sum, x, i) {
    return sum + x * y[i];
  }, 0);
}

function cross(x, y) {
  var _x = slicedToArray(x, 3),
      x0 = _x[0],
      x1 = _x[1],
      x2 = _x[2];

  var _y = slicedToArray(y, 3),
      y0 = _y[0],
      y1 = _y[1],
      y2 = _y[2];

  return [x1 * y2 - x2 * y1, x2 * y0 - x0 * y2, x0 * y1 - x1 * y0];
}

function normalize$1(x) {
  var length = x.reduce(function (sum, x) {
    return sum + x * x;
  }, 0);
  if (length > 0) {
    var coeff = 1 / Math.sqrt(length);
    return x.map(function (x) {
      return x * coeff;
    });
  }
  return Array(x.length).fill(0);
}

function faceforward(N, I, Nref) {
  if (Nref == null) {
    Nref = N;
  }
  var dot = Nref.reduce(function (sum, x, i) {
    return sum + x * I[i];
  }, 0);
  return dot < 0 ? N : N.map(function (x) {
    return -x;
  });
}

function reflect(I, N) {
  var dot = N.reduce(function (sum, x, i) {
    return sum + x * I[i];
  }, 0);
  return N.map(function (x, i) {
    return I[i] - 2 * dot * x;
  });
}

function refract(I, N, eta) {
  var dot = N.reduce(function (sum, x, i) {
    return sum + x * I[i];
  }, 0);
  var k = 1 - eta * eta * (1 - dot * dot);
  if (k > 0) {
    var coeff = eta * dot + Math.sqrt(k);
    return N.map(function (x, i) {
      return eta * I[i] - coeff * x;
    });
  }
  return Array(N.length).fill(0);
}

var Math$1 = {
  lerp: lerp,
  constrain: constrain,
  map: map,
  wrap: wrap,
  radians: radians,
  degrees: degrees,
  sin: sin,
  cos: cos,
  tan: tan,
  asin: asin,
  acos: acos,
  atan: atan,
  pow: pow,
  exp: exp,
  log: log,
  exp2: exp2,
  log2: log2,
  sqrt: sqrt,
  inversesqrt: inversesqrt,
  abs: abs,
  sign: sign,
  floor: floor,
  ceil: ceil,
  fract: fract,
  mod: mod,
  min: min$1,
  max: max$1,
  clamp: clamp,
  mix: mix,
  step: step,
  smoothstep: smoothstep,
  length: length,
  distance: distance,
  dot: dot,
  cross: cross,
  normalize: normalize$1,
  faceforward: faceforward,
  reflect: reflect,
  refract: refract
};

var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function (name, i) {
    return JSON.stringify(name) + ": d[" + i + "]";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function (row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function (row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function dsv (delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert,
        columns,
        rows = parseRows(text, function (row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [],
        // output rows
    N = text.length,
        I = 0,
        // current character index
    n = 0,
        // current line number
    t,
        // current token
    eof = N <= 0,
        // current token followed by EOF?
    eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i,
          j = I,
          c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE) {}
        if ((i = I) >= N) eof = true;else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;else if (c === RETURN) {
          eol = true;if (text.charCodeAt(I) === NEWLINE) ++I;
        }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;else if (c === RETURN) {
          eol = true;if (text.charCodeAt(I) === NEWLINE) ++I;
        } else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) {
        row.push(t), t = token();
      }if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(rows.map(function (row) {
      return columns.map(function (column) {
        return formatValue(row[column]);
      }).join(delimiter);
    })).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(text) {
    return text == null ? "" : reFormat.test(text += "") ? "\"" + text.replace(/"/g, "\"\"") + "\"" : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
}

var csv = dsv(",");

var csvParse = csv.parse;

var tsv = dsv("\t");

var tsvParse = tsv.parse;

/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */

var requiresPort = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
      return port !== 80;

    case 'https':
    case 'wss':
      return port !== 443;

    case 'ftp':
      return port !== 21;

    case 'gopher':
      return port !== 70;

    case 'file':
      return false;
  }

  return port !== 0;
};

var has = Object.prototype.hasOwnProperty;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String} The decoded string.
 * @api private
 */
function decode(input) {
  return decodeURIComponent(input.replace(/\+/g, ' '));
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g,
      result = {},
      part;

  while (part = parser.exec(query)) {
    var key = decode(part[1]),
        value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    if (key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
var stringify$2 = querystringify;
var parse$2 = querystring;

var querystringify_1 = {
  stringify: stringify$2,
  parse: parse$2
};

var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i,
    slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [['#', 'hash'], // Extract from the back.
['?', 'query'], // Extract from the back.
['/', 'pathname'], // Extract from the back.
['@', 'auth', 1], // Extract from the front.
[NaN, 'host', undefined, 1, 1], // Set left over value.
[/:(\d+)$/, 'port', undefined, 1], // RegExp the back.
[NaN, 'hostname', undefined, 1, 1] // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
function lolcation(loc) {
  var location = commonjsGlobal && commonjsGlobal.location || {};
  loc = loc || location;

  var finaldestination = {},
      type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
      key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) {
      delete finaldestination[key];
    }
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve$1(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/')),
      i = path.length,
      last = path[i - 1],
      unshift = false,
      up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative,
      extracted,
      parse,
      instruction,
      index,
      key,
      instructions = rules.slice(),
      type = typeof location === 'undefined' ? 'undefined' : _typeof(location),
      url = this,
      i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = querystringify_1.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if (index = parse.exec(address)) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (relative && instruction[3] ? location[key] || '' : '');

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (relative && location.slashes && url.pathname.charAt(0) !== '/' && (url.pathname !== '' || location.pathname !== '')) {
    url.pathname = resolve$1(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!requiresPort(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set$1(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || querystringify_1.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!requiresPort(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname + ':' + value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':' + url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:' ? url.protocol + '//' + url.host : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = querystringify_1.stringify;

  var query,
      url = this,
      protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':' + url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === _typeof(url.query) ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?' + query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set$1, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = querystringify_1;

var urlParse = URL;

// The MIT License

// The MIT License

function browserRequest(url, options) {
  var resolve = void 0;
  var reject = void 0;
  // eslint-disable-next-line promise/param-names
  var promise = new Promise(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    resolve = args[0];
    reject = args[1];
  });
  var parsed = new urlParse(url, true);
  if (options.query) {
    parsed.set('query', Object.assign({}, parsed.query, options.query));
  }
  var request$$1 = new XMLHttpRequest();
  request$$1.open('get', parsed.toString(), true);
  if (options.headers) {
    var names = Object.keys(options.headers);
    for (var i = 0; i < names.length; ++i) {
      var name = names[i];
      request$$1.setRequestHeader(name, options.headers[name]);
    }
  }
  request$$1.responseType = options.type;
  request$$1.addEventListener('loadend', function (event) {
    if (request$$1.status < 200 || request$$1.status >= 300) {
      reject(request$$1.status);
      return;
    }
    if (request$$1.response == null && options.type === 'json') {
      reject(new Error('Could not parse JSON'));
      return;
    }
    resolve(request$$1.response);
  }, false);
  request$$1.send();
  promise.abort = function () {
    request$$1.abort();
  };
  return promise;
}

function nodeRequest(url, options) {
  var resolve = void 0;
  var reject = void 0;
  // eslint-disable-next-line promise/param-names
  var promise = new Promise(function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    resolve = args[0];
    reject = args[1];
  });
  if (options.local) {
    fs.readFile(url, options.encoding, function (error, response) {
      if (error) {
        reject(error);
        return;
      }
      resolve(response);
    });
    promise.abort = function () {}; // TODO: Support abortion
  } else {
    var stream = request({
      url: url,
      headers: options.headers || {},
      qs: options.query || {},
      encoding: options.encoding
    }, function (error, response) {
      if (error) {
        reject(error);
        return;
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(response.statusCode);
      }
      resolve(response.body);
    });
    stream.on('abort', function () {
      reject(0);
    });
    promise.abort = function () {
      stream.abort();
    };
  }
  return promise;
}

function performRequest(url, options) {
  if (isNode) {
    var _request = nodeRequest(url, options);
    if (options.type === 'json') {
      var promise = _request.then(function (response) {
        if (typeof response !== 'string') {
          throw new Error('Response is unexpectedly not a string');
        }
        return JSON.parse(response);
      });
      promise.abort = function () {
        _request.abort();
      };
      return promise;
    }
    if (options.type === 'arraybuffer') {
      var _promise = _request.then(function (response) {
        if (!(response instanceof Buffer)) {
          throw new Error('Response is unexpectedly not a buffer');
        }
        var buffer = new ArrayBuffer(response.length);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < response.length; ++i) {
          view[i] = response[i];
        }
        return buffer;
      });
      _promise.abort = function () {
        _request.abort();
      };
      return _promise;
    }
    return _request;
  }
  return browserRequest(url, options);
}

function parseArguments() {
  for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }

  var url = args[0],
      options = args[1];

  if (typeof url !== 'string') {
    options = url;var _options = options;
    url = _options.url;
  }
  if (typeof url !== 'string') {
    throw new Error('The first argument or options.url must be a string');
  }
  options = Object.assign({}, {
    type: 'text',
    local: false,
    encoding: 'utf-8'
  }, options);
  return [url, options];
}

function requestText() {
  var _parseArguments = parseArguments.apply(undefined, arguments),
      _parseArguments2 = slicedToArray(_parseArguments, 2),
      url = _parseArguments2[0],
      options = _parseArguments2[1];

  options.type = 'text';
  return performRequest(url, options);
}

function requestJSON() {
  var _parseArguments3 = parseArguments.apply(undefined, arguments),
      _parseArguments4 = slicedToArray(_parseArguments3, 2),
      url = _parseArguments4[0],
      options = _parseArguments4[1];

  options.type = 'json';
  return performRequest(url, options);
}

function requestBuffer() {
  var _parseArguments5 = parseArguments.apply(undefined, arguments),
      _parseArguments6 = slicedToArray(_parseArguments5, 2),
      url = _parseArguments6[0],
      options = _parseArguments6[1];

  options.type = 'arraybuffer';
  options.encoding = null;
  return performRequest(url, options);
}

function requestCSV() {
  var _parseArguments7 = parseArguments.apply(undefined, arguments),
      _parseArguments8 = slicedToArray(_parseArguments7, 2),
      url = _parseArguments8[0],
      options = _parseArguments8[1];

  var request$$1 = this.text(url, options);
  var promise = request$$1.then(function (response) {
    return csvParse(response, options.row);
  });
  promise.abort = function () {
    request$$1.abort();
  };
  return promise;
}

function requestTSV() {
  var _parseArguments9 = parseArguments.apply(undefined, arguments),
      _parseArguments10 = slicedToArray(_parseArguments9, 2),
      url = _parseArguments10[0],
      options = _parseArguments10[1];

  var request$$1 = this.text(url, options);
  var promise = request$$1.then(function (response) {
    return tsvParse(response, options.row);
  });
  promise.abort = function () {
    request$$1.abort();
  };
  return promise;
}

Object.assign(performRequest, {
  text: requestText,
  json: requestJSON,
  buffer: requestBuffer,
  csv: requestCSV,
  tsv: requestTSV
});

// The MIT License

var internal$3 = createNamespace('Semaphore');

var Task = function Task(semaphore, callback) {
  var _this = this;

  classCallCheck(this, Task);

  var promises = [new Promise(function (resolve, reject) {
    _this.resolve = resolve;
    _this.reject = reject;
  }), new Promise(function (resolve) {
    _this.permit = resolve;
  }).then(function () {
    callback(_this.resolve, _this.reject);
  })];
  this.promise = Promise.all(promises).then(function (values) {
    semaphore.signal();
    return values[0];
  }, function (reason) {
    semaphore.signal();
    return Promise.reject(reason);
  });
};

var Semaphore = function () {
  function Semaphore(capacity) {
    classCallCheck(this, Semaphore);

    var scope = internal$3(this);
    scope.capacity = capacity;
    scope.available = capacity;
    scope.queue = [];
  }

  createClass(Semaphore, [{
    key: 'wait',
    value: function wait(callback) {
      var scope = internal$3(this);
      var task = new Task(this, callback);
      if (scope.available === 0) {
        scope.queue.push(task);
      } else {
        --scope.available;
        task.permit();
      }
      return task.promise;
    }
  }, {
    key: 'signal',
    value: function signal() {
      var scope = internal$3(this);
      if (scope.queue.length === 0) {
        ++scope.available;
      } else {
        scope.queue.shift().permit();
      }
    }
  }, {
    key: 'capacity',
    get: function get$$1() {
      return internal$3(this).capacity;
    }
  }, {
    key: 'available',
    get: function get$$1() {
      return internal$3(this).available;
    }
  }]);
  return Semaphore;
}();

// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function isTypedArray(array) {
  return array instanceof Int8Array || array instanceof Uint8Array || array instanceof Uint8ClampedArray || array instanceof Int16Array || array instanceof Uint16Array || array instanceof Int32Array || array instanceof Uint32Array || array instanceof Float32Array || array instanceof Float64Array;
}

function slice(array, start, end) {
  return array.slice(start, end);
}

function subarray(array, start, end) {
  return array.subarray(start, end);
}

function forEach(array, stride, callback) {
  var func = isTypedArray(array) ? subarray : slice;
  var end = array.length - array.length % stride;
  for (var start = 0, index = 0; start < end; start += stride, ++index) {
    callback(func(array, start, start + stride), index);
  }
}

function some(array, stride, callback) {
  var end = array.length - array.length % stride;
  var func = isTypedArray(array) ? subarray : slice;
  for (var start = 0, index = 0; start < end; start += stride, ++index) {
    if (callback(func(array, start, start + stride), index)) {
      return true;
    }
  }
  return false;
}

function every(array, stride, callback) {
  var end = array.length - array.length % stride;
  var func = isTypedArray(array) ? subarray : slice;
  for (var start = 0, index = 0; start < end; start += stride, ++index) {
    if (!callback(func(array, start, start + stride), index)) {
      return false;
    }
  }
  return true;
}

function reduce(array, stride, callback, initial) {
  var result = initial;
  var end = array.length - array.length % stride;
  var func = isTypedArray(array) ? subarray : slice;
  for (var start = 0, index = 0; start < end; start += stride, ++index) {
    result = callback(result, func(array, start, start + stride), index);
  }
  return result;
}

function set$2(array, stride, item) {
  var end = array.length - array.length % stride;
  if (isTypedArray(array)) {
    for (var start = 0; start < end; start += stride) {
      array.set(item, start);
    }
  } else {
    for (var _start = 0; _start < end; _start += stride) {
      for (var offset = 0; offset < stride; ++offset) {
        array[_start + offset] = item[offset];
      }
    }
  }
  return array;
}

function transform(array, stride, callback) {
  var end = array.length - array.length % stride;
  if (isTypedArray(array)) {
    for (var start = 0, index = 0; start < end; start += stride, ++index) {
      var item = callback(array.slice(start, start + stride), index);
      array.set(item, start);
    }
  } else {
    for (var _start2 = 0, _index = 0; _start2 < end; _start2 += stride, ++_index) {
      for (var offset = 0; offset < stride; ++offset) {
        var _item = callback(array.slice(_start2, _start2 + stride), _index);
        array[_start2 + offset] = _item[offset];
      }
    }
  }
  return array;
}

var Stride = {
  forEach: forEach,
  some: some,
  every: every,
  reduce: reduce,
  set: set$2,
  transform: transform
};

// The MIT License

var index = {
  Aggregate: Aggregate,
  AggregateFunction: AggregateFunction,
  Array: Array$1,
  AssertionError: AssertionError,
  FilePath: FilePath,
  Global: Global,
  Hash: generateHash,
  ImplementationError: ImplementationError,
  Math: Math$1,
  Namespace: createNamespace,
  Request: performRequest,
  Semaphore: Semaphore,
  Stride: Stride,
  URL: urlParse
};

export default index;
export { Aggregate, AggregateFunction, Array$1 as Array, AssertionError, FilePath, Global, generateHash as Hash, ImplementationError, Math$1 as Math, createNamespace as Namespace, performRequest as Request, Semaphore, Stride, urlParse as URL, isBrowser, isWorker, isNode, globalScope };
//# sourceMappingURL=planck-core.module.js.map
