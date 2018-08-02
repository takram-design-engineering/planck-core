(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Planck = global.Planck || {})));
}(this, (function (exports) { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var asyncToGenerator = function (fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  // The MIT License
  // Copyright (C) 2016-Present Shota Matsuda

  var isAggregateSymbol = Symbol('isAggregate');

  function isAggregate(object) {
    if (object == null) {
      return false;
    }
    return !!object[isAggregateSymbol];
  }

  function Aggregate() {
    for (var _len = arguments.length, targets = Array(_len), _key = 0; _key < _len; _key++) {
      targets[_key] = arguments[_key];
    }

    return new Proxy(Aggregate, {
      set: function set$$1(target, property, value, receiver) {
        targets.forEach(function (target) {
          target[property] = value;
        });
        return true;
      },
      get: function get$$1(target, property, receiver) {
        if (property === isAggregateSymbol) {
          return true;
        }
        var callable = targets.length > 0;
        var values = targets.map(function (target) {
          var value = target[property];
          if (typeof value === 'function') {
            return value.bind(target);
          }
          callable = false;
          return value;
        });
        if (callable) {
          return Aggregate.apply(undefined, toConsumableArray(values));
        }
        return values;
      },
      apply: function apply(target, bound, args) {
        return targets.map(function (target) {
          return target.apply(undefined, toConsumableArray(args));
        });
      }
    });
  }

  Aggregate.isAggregate = isAggregate;

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

  var nodePath = null;

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

  var minimalisticAssert = assert;

  function assert(val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  assert.equal = function assertEqual(l, r, msg) {
    if (l != r) throw new Error(msg || 'Assertion failed: ' + l + ' != ' + r);
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var inherits_browser = createCommonjsModule(function (module) {
    if (typeof Object.create === 'function') {
      // implementation from standard node.js 'util' module
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      };
    } else {
      // old school shim for old browsers
      module.exports = function inherits(ctor, superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function TempCtor() {};
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      };
    }
  });

  var inherits_1 = inherits_browser;

  function toArray$1(msg, enc) {
    if (Array.isArray(msg)) return msg.slice();
    if (!msg) return [];
    var res = [];
    if (typeof msg === 'string') {
      if (!enc) {
        for (var i = 0; i < msg.length; i++) {
          var c = msg.charCodeAt(i);
          var hi = c >> 8;
          var lo = c & 0xff;
          if (hi) res.push(hi, lo);else res.push(lo);
        }
      } else if (enc === 'hex') {
        msg = msg.replace(/[^a-z0-9]+/ig, '');
        if (msg.length % 2 !== 0) msg = '0' + msg;
        for (i = 0; i < msg.length; i += 2) {
          res.push(parseInt(msg[i] + msg[i + 1], 16));
        }
      }
    } else {
      for (i = 0; i < msg.length; i++) {
        res[i] = msg[i] | 0;
      }
    }
    return res;
  }
  var toArray_1 = toArray$1;

  function toHex(msg) {
    var res = '';
    for (var i = 0; i < msg.length; i++) {
      res += zero2(msg[i].toString(16));
    }return res;
  }
  var toHex_1 = toHex;

  function htonl(w) {
    var res = w >>> 24 | w >>> 8 & 0xff00 | w << 8 & 0xff0000 | (w & 0xff) << 24;
    return res >>> 0;
  }
  var htonl_1 = htonl;

  function toHex32(msg, endian) {
    var res = '';
    for (var i = 0; i < msg.length; i++) {
      var w = msg[i];
      if (endian === 'little') w = htonl(w);
      res += zero8(w.toString(16));
    }
    return res;
  }
  var toHex32_1 = toHex32;

  function zero2(word) {
    if (word.length === 1) return '0' + word;else return word;
  }
  var zero2_1 = zero2;

  function zero8(word) {
    if (word.length === 7) return '0' + word;else if (word.length === 6) return '00' + word;else if (word.length === 5) return '000' + word;else if (word.length === 4) return '0000' + word;else if (word.length === 3) return '00000' + word;else if (word.length === 2) return '000000' + word;else if (word.length === 1) return '0000000' + word;else return word;
  }
  var zero8_1 = zero8;

  function join32(msg, start, end, endian) {
    var len = end - start;
    minimalisticAssert(len % 4 === 0);
    var res = new Array(len / 4);
    for (var i = 0, k = start; i < res.length; i++, k += 4) {
      var w;
      if (endian === 'big') w = msg[k] << 24 | msg[k + 1] << 16 | msg[k + 2] << 8 | msg[k + 3];else w = msg[k + 3] << 24 | msg[k + 2] << 16 | msg[k + 1] << 8 | msg[k];
      res[i] = w >>> 0;
    }
    return res;
  }
  var join32_1 = join32;

  function split32(msg, endian) {
    var res = new Array(msg.length * 4);
    for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
      var m = msg[i];
      if (endian === 'big') {
        res[k] = m >>> 24;
        res[k + 1] = m >>> 16 & 0xff;
        res[k + 2] = m >>> 8 & 0xff;
        res[k + 3] = m & 0xff;
      } else {
        res[k + 3] = m >>> 24;
        res[k + 2] = m >>> 16 & 0xff;
        res[k + 1] = m >>> 8 & 0xff;
        res[k] = m & 0xff;
      }
    }
    return res;
  }
  var split32_1 = split32;

  function rotr32(w, b) {
    return w >>> b | w << 32 - b;
  }
  var rotr32_1 = rotr32;

  function rotl32(w, b) {
    return w << b | w >>> 32 - b;
  }
  var rotl32_1 = rotl32;

  function sum32(a, b) {
    return a + b >>> 0;
  }
  var sum32_1 = sum32;

  function sum32_3(a, b, c) {
    return a + b + c >>> 0;
  }
  var sum32_3_1 = sum32_3;

  function sum32_4(a, b, c, d) {
    return a + b + c + d >>> 0;
  }
  var sum32_4_1 = sum32_4;

  function sum32_5(a, b, c, d, e) {
    return a + b + c + d + e >>> 0;
  }
  var sum32_5_1 = sum32_5;

  function sum64(buf, pos, ah, al) {
    var bh = buf[pos];
    var bl = buf[pos + 1];

    var lo = al + bl >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
  }
  var sum64_1 = sum64;

  function sum64_hi(ah, al, bh, bl) {
    var lo = al + bl >>> 0;
    var hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
  }
  var sum64_hi_1 = sum64_hi;

  function sum64_lo(ah, al, bh, bl) {
    var lo = al + bl;
    return lo >>> 0;
  }
  var sum64_lo_1 = sum64_lo;

  function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;

    var hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
  }
  var sum64_4_hi_1 = sum64_4_hi;

  function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
    var lo = al + bl + cl + dl;
    return lo >>> 0;
  }
  var sum64_4_lo_1 = sum64_4_lo;

  function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var carry = 0;
    var lo = al;
    lo = lo + bl >>> 0;
    carry += lo < al ? 1 : 0;
    lo = lo + cl >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = lo + dl >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = lo + el >>> 0;
    carry += lo < el ? 1 : 0;

    var hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
  }
  var sum64_5_hi_1 = sum64_5_hi;

  function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    var lo = al + bl + cl + dl + el;

    return lo >>> 0;
  }
  var sum64_5_lo_1 = sum64_5_lo;

  function rotr64_hi(ah, al, num) {
    var r = al << 32 - num | ah >>> num;
    return r >>> 0;
  }
  var rotr64_hi_1 = rotr64_hi;

  function rotr64_lo(ah, al, num) {
    var r = ah << 32 - num | al >>> num;
    return r >>> 0;
  }
  var rotr64_lo_1 = rotr64_lo;

  function shr64_hi(ah, al, num) {
    return ah >>> num;
  }
  var shr64_hi_1 = shr64_hi;

  function shr64_lo(ah, al, num) {
    var r = ah << 32 - num | al >>> num;
    return r >>> 0;
  }
  var shr64_lo_1 = shr64_lo;

  var utils = {
    inherits: inherits_1,
    toArray: toArray_1,
    toHex: toHex_1,
    htonl: htonl_1,
    toHex32: toHex32_1,
    zero2: zero2_1,
    zero8: zero8_1,
    join32: join32_1,
    split32: split32_1,
    rotr32: rotr32_1,
    rotl32: rotl32_1,
    sum32: sum32_1,
    sum32_3: sum32_3_1,
    sum32_4: sum32_4_1,
    sum32_5: sum32_5_1,
    sum64: sum64_1,
    sum64_hi: sum64_hi_1,
    sum64_lo: sum64_lo_1,
    sum64_4_hi: sum64_4_hi_1,
    sum64_4_lo: sum64_4_lo_1,
    sum64_5_hi: sum64_5_hi_1,
    sum64_5_lo: sum64_5_lo_1,
    rotr64_hi: rotr64_hi_1,
    rotr64_lo: rotr64_lo_1,
    shr64_hi: shr64_hi_1,
    shr64_lo: shr64_lo_1
  };

  function BlockHash() {
    this.pending = null;
    this.pendingTotal = 0;
    this.blockSize = this.constructor.blockSize;
    this.outSize = this.constructor.outSize;
    this.hmacStrength = this.constructor.hmacStrength;
    this.padLength = this.constructor.padLength / 8;
    this.endian = 'big';

    this._delta8 = this.blockSize / 8;
    this._delta32 = this.blockSize / 32;
  }
  var BlockHash_1 = BlockHash;

  BlockHash.prototype.update = function update(msg, enc) {
    // Convert message to array, pad it, and join into 32bit blocks
    msg = utils.toArray(msg, enc);
    if (!this.pending) this.pending = msg;else this.pending = this.pending.concat(msg);
    this.pendingTotal += msg.length;

    // Enough data, try updating
    if (this.pending.length >= this._delta8) {
      msg = this.pending;

      // Process pending data in blocks
      var r = msg.length % this._delta8;
      this.pending = msg.slice(msg.length - r, msg.length);
      if (this.pending.length === 0) this.pending = null;

      msg = utils.join32(msg, 0, msg.length - r, this.endian);
      for (var i = 0; i < msg.length; i += this._delta32) {
        this._update(msg, i, i + this._delta32);
      }
    }

    return this;
  };

  BlockHash.prototype.digest = function digest(enc) {
    this.update(this._pad());
    minimalisticAssert(this.pending === null);

    return this._digest(enc);
  };

  BlockHash.prototype._pad = function pad() {
    var len = this.pendingTotal;
    var bytes = this._delta8;
    var k = bytes - (len + this.padLength) % bytes;
    var res = new Array(k + this.padLength);
    res[0] = 0x80;
    for (var i = 1; i < k; i++) {
      res[i] = 0;
    } // Append length
    len <<= 3;
    if (this.endian === 'big') {
      for (var t = 8; t < this.padLength; t++) {
        res[i++] = 0;
      }res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = len >>> 24 & 0xff;
      res[i++] = len >>> 16 & 0xff;
      res[i++] = len >>> 8 & 0xff;
      res[i++] = len & 0xff;
    } else {
      res[i++] = len & 0xff;
      res[i++] = len >>> 8 & 0xff;
      res[i++] = len >>> 16 & 0xff;
      res[i++] = len >>> 24 & 0xff;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;
      res[i++] = 0;

      for (t = 8; t < this.padLength; t++) {
        res[i++] = 0;
      }
    }

    return res;
  };

  var common = {
    BlockHash: BlockHash_1
  };

  var rotr32$1 = utils.rotr32;

  function ft_1(s, x, y, z) {
    if (s === 0) return ch32(x, y, z);
    if (s === 1 || s === 3) return p32(x, y, z);
    if (s === 2) return maj32(x, y, z);
  }
  var ft_1_1 = ft_1;

  function ch32(x, y, z) {
    return x & y ^ ~x & z;
  }
  var ch32_1 = ch32;

  function maj32(x, y, z) {
    return x & y ^ x & z ^ y & z;
  }
  var maj32_1 = maj32;

  function p32(x, y, z) {
    return x ^ y ^ z;
  }
  var p32_1 = p32;

  function s0_256(x) {
    return rotr32$1(x, 2) ^ rotr32$1(x, 13) ^ rotr32$1(x, 22);
  }
  var s0_256_1 = s0_256;

  function s1_256(x) {
    return rotr32$1(x, 6) ^ rotr32$1(x, 11) ^ rotr32$1(x, 25);
  }
  var s1_256_1 = s1_256;

  function g0_256(x) {
    return rotr32$1(x, 7) ^ rotr32$1(x, 18) ^ x >>> 3;
  }
  var g0_256_1 = g0_256;

  function g1_256(x) {
    return rotr32$1(x, 17) ^ rotr32$1(x, 19) ^ x >>> 10;
  }
  var g1_256_1 = g1_256;

  var common$1 = {
    ft_1: ft_1_1,
    ch32: ch32_1,
    maj32: maj32_1,
    p32: p32_1,
    s0_256: s0_256_1,
    s1_256: s1_256_1,
    g0_256: g0_256_1,
    g1_256: g1_256_1
  };

  var sum32$1 = utils.sum32;
  var sum32_4$1 = utils.sum32_4;
  var sum32_5$1 = utils.sum32_5;
  var ch32$1 = common$1.ch32;
  var maj32$1 = common$1.maj32;
  var s0_256$1 = common$1.s0_256;
  var s1_256$1 = common$1.s1_256;
  var g0_256$1 = common$1.g0_256;
  var g1_256$1 = common$1.g1_256;

  var BlockHash$1 = common.BlockHash;

  var sha256_K = [0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2];

  function SHA256() {
    if (!(this instanceof SHA256)) return new SHA256();

    BlockHash$1.call(this);
    this.h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    this.k = sha256_K;
    this.W = new Array(64);
  }
  utils.inherits(SHA256, BlockHash$1);
  var _256 = SHA256;

  SHA256.blockSize = 512;
  SHA256.outSize = 256;
  SHA256.hmacStrength = 192;
  SHA256.padLength = 64;

  SHA256.prototype._update = function _update(msg, start) {
    var W = this.W;

    for (var i = 0; i < 16; i++) {
      W[i] = msg[start + i];
    }for (; i < W.length; i++) {
      W[i] = sum32_4$1(g1_256$1(W[i - 2]), W[i - 7], g0_256$1(W[i - 15]), W[i - 16]);
    }var a = this.h[0];
    var b = this.h[1];
    var c = this.h[2];
    var d = this.h[3];
    var e = this.h[4];
    var f = this.h[5];
    var g = this.h[6];
    var h = this.h[7];

    minimalisticAssert(this.k.length === W.length);
    for (i = 0; i < W.length; i++) {
      var T1 = sum32_5$1(h, s1_256$1(e), ch32$1(e, f, g), this.k[i], W[i]);
      var T2 = sum32$1(s0_256$1(a), maj32$1(a, b, c));
      h = g;
      g = f;
      f = e;
      e = sum32$1(d, T1);
      d = c;
      c = b;
      b = a;
      a = sum32$1(T1, T2);
    }

    this.h[0] = sum32$1(this.h[0], a);
    this.h[1] = sum32$1(this.h[1], b);
    this.h[2] = sum32$1(this.h[2], c);
    this.h[3] = sum32$1(this.h[3], d);
    this.h[4] = sum32$1(this.h[4], e);
    this.h[5] = sum32$1(this.h[5], f);
    this.h[6] = sum32$1(this.h[6], g);
    this.h[7] = sum32$1(this.h[7], h);
  };

  SHA256.prototype._digest = function digest(enc) {
    if (enc === 'hex') return utils.toHex32(this.h, 'big');else return utils.split32(this.h, 'big');
  };

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
    return _256().update(jsonStableStringify(object)).digest('hex');
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

  var fs = null;

  var request = null;

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
  function sanitize(address) {
    // Sanitize what is left of the address
    return address.replace('\\', '/');
  }, ['/', 'pathname'], // Extract from the back.
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
   * @public
   */
  function lolcation(loc) {
    var location = commonjsGlobal && commonjsGlobal.location || {};
    loc = loc || location;

    var finaldestination = {},
        type = typeof loc === 'undefined' ? 'undefined' : _typeof(loc),
        key;

    if ('blob:' === loc.protocol) {
      finaldestination = new Url(unescape(loc.pathname), {});
    } else if ('string' === type) {
      finaldestination = new Url(loc, {});
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
   * @private
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
   * @private
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
   * It is worth noting that we should not use `URL` as class name to prevent
   * clashes with the global URL instance that got introduced in browsers.
   *
   * @constructor
   * @param {String} address URL we want to parse.
   * @param {Object|String} location Location defaults for relative paths.
   * @param {Boolean|Function} parser Parser for the query string.
   * @private
   */
  function Url(address, location, parser) {
    if (!(this instanceof Url)) {
      return new Url(address, location, parser);
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
    if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

    for (; i < instructions.length; i++) {
      instruction = instructions[i];

      if (typeof instruction === 'function') {
        address = instruction(address);
        continue;
      }

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
   * @returns {URL} URL instance for chaining.
   * @public
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
   * @returns {String} Compiled version of the URL.
   * @public
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

  Url.prototype = { set: set$1, toString: toString };

  //
  // Expose the URL parser and some additional properties that might be useful for
  // others or testing.
  //
  Url.extractProtocol = extractProtocol;
  Url.location = lolcation;
  Url.qs = querystringify_1;

  var urlParse = Url;

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
  // Copyright (C) 2016-Present Shota Matsuda

  var Semaphore = function () {
    function Semaphore() {
      var capacity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      classCallCheck(this, Semaphore);

      var number = +capacity;
      if (Number.isNaN(number) || number < 1) {
        throw new Error("Invalid number of capacity: " + capacity);
      }
      this.capacity = number;
      this.available = number;
      this.queue = [];
    }

    createClass(Semaphore, [{
      key: "wait",
      value: function () {
        var _ref = asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(callback) {
          var resolveTask, rejectTask, runTask, task, result, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  resolveTask = void 0;
                  rejectTask = void 0;
                  runTask = void 0;
                  task = Promise.all([new Promise(function (resolve, reject) {
                    resolveTask = resolve;
                    rejectTask = reject;
                  }), new Promise(function (resolve, reject) {
                    runTask = resolve;
                  }).then(function () {
                    var result = callback(resolveTask, rejectTask);
                    if (result instanceof Promise) {
                      return result.then(resolveTask).catch(rejectTask);
                    }
                    return result;
                  })]);

                  if (this.available === 0) {
                    this.queue.push(runTask);
                  } else {
                    --this.available;
                    runTask();
                  }
                  result = void 0;
                  _context.prev = 6;
                  _context.next = 9;
                  return task;

                case 9:
                  _ref2 = _context.sent;
                  _ref3 = slicedToArray(_ref2, 1);
                  result = _ref3[0];
                  _context.next = 18;
                  break;

                case 14:
                  _context.prev = 14;
                  _context.t0 = _context["catch"](6);

                  this.signal();
                  throw _context.t0;

                case 18:
                  this.signal();
                  return _context.abrupt("return", result);

                case 20:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[6, 14]]);
        }));

        function wait(_x2) {
          return _ref.apply(this, arguments);
        }

        return wait;
      }()
    }, {
      key: "signal",
      value: function signal() {
        if (this.queue.length === 0) {
          ++this.available;
        } else {
          this.queue.shift()();
        }
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

  exports.Aggregate = Aggregate;
  exports.Array = Array$1;
  exports.AssertionError = AssertionError;
  exports.FilePath = FilePath;
  exports.Global = Global;
  exports.Hash = generateHash;
  exports.ImplementationError = ImplementationError;
  exports.Math = Math$1;
  exports.Namespace = createNamespace;
  exports.Request = performRequest;
  exports.Semaphore = Semaphore;
  exports.Stride = Stride;
  exports.URL = urlParse;
  exports.default = index;
  exports.isBrowser = isBrowser;
  exports.isWorker = isWorker;
  exports.isNode = isNode;
  exports.globalScope = globalScope;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=planck-core.browser.js.map
