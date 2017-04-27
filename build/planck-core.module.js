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

function Namespace(name = undefined) {
  const symbol = Symbol(name);
  return function namespace(object, init = data => data) {
    if (object[symbol] === undefined) {
      object[symbol] = init({});
    }
    return object[symbol];
  };
}

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

const internal$1 = Namespace('AggregateFunction');

class AggregateFunction {
  // This constructor provides for inheritance only
  constructor(targets = []) {
    const scope = internal$1(this);
    scope.targets = targets;
  }

  apply(target, bound, args) {
    const scope = internal$1(this);
    return scope.targets.map(target => {
      return Reflect.apply(target, bound, args);
    });
  }

  getPrototypeOf(target) {
    return this.constructor.prototype;
  }

  static new(...args) {
    const instance = new this(...args);
    return new Proxy(() => {}, instance);
  }
}

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

const internal$$1 = Namespace('Aggregate');

class Aggregate {
  // This constructor provides for inheritance only
  constructor(targets = []) {
    const scope = internal$$1(this);
    scope.targets = targets;
  }

  set(target, property, value, receiver) {
    const scope = internal$$1(this);
    scope.targets.forEach(target => {
      Reflect.set(target, property, value);
    });
    return Reflect.set(target, property, value, receiver);
  }

  get(target, property, receiver) {
    const scope = internal$$1(this);
    const aggregative = scope.targets.every(target => {
      return typeof Reflect.get(target, property) === 'function';
    });
    if (aggregative) {
      return AggregateFunction.new(scope.targets.map(target => {
        return Reflect.get(target, property).bind(target);
      }));
    }
    return Reflect.get(scope.targets[0], property, receiver);
  }

  getPrototypeOf(target) {
    return this.constructor.prototype;
  }

  static new(...args) {
    const instance = new this(...args);
    return new Proxy({}, instance);
  }
}

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

function AssertionError(message) {
  this.message = message;
}

Object.setPrototypeOf(AssertionError, Error);
AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.message = '';
AssertionError.prototype.constructor = AssertionError;

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



class Environment {
  static get type() {
    try {
      // eslint-disable-next-line no-new-func
      if (new Function('return this === window')()) {
        return 'browser';
      }
    } catch (error) {}
    try {
      // eslint-disable-next-line no-new-func
      if (new Function('return this === self')()) {
        return 'worker';
      }
    } catch (error) {}
    try {
      // eslint-disable-next-line no-new-func
      if (new Function('return this === global')()) {
        return 'node';
      }
    } catch (error) {}
    throw new Error();
  }

  static get global() {
    switch (this.type) {
      case 'browser':
        return window;
      case 'worker':
        return self;
      case 'node':
        return global;
      default:
        break;
    }
    throw new Error();
  }
}

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

let path;
if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  path = require('path');
}



class FilePath {
  static get self() {
    switch (Environment.type) {
      case 'browser':
        return document.currentScript.src;
      case 'worker':
        return self.location.href;
      case 'node':
        return __filename;
      default:
        break;
    }
    throw new Error();
  }

  static resolve(arg, ...rest) {
    let separator;
    let root;
    if (Environment.type !== 'node') {
      separator = '/';
      root = `${this.self.split('/').slice(0, -2).join('/')}/`;
    } else {
      separator = path.sep;
      root = '';
    }
    let first = arg;
    if (first.startsWith(root)) {
      first = first.substr(root.length);
    }
    const parts = [...resolveRelativePath(first.split(separator)), ...resolveRelativePath(rest.reduce((parts, part) => {
      return [...parts, ...part.split(separator)];
    }, []))];
    return root + parts.join(separator);
  }
}

function resolveRelativePath(parts) {
  return parts.reduce((result, part) => {
    if (part.length === 0 || part === '.') {
      return result;
    }
    if (part === '..') {
      result.pop();
      return result;
    }
    return [...result, part];
  }, []);
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var crypt = createCommonjsModule(function (module) {
  (function () {
    var base64map = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        crypt = {
      // Bit-wise rotation left
      rotl: function (n, b) {
        return n << b | n >>> 32 - b;
      },

      // Bit-wise rotation right
      rotr: function (n, b) {
        return n << 32 - b | n >>> b;
      },

      // Swap big-endian to little-endian and vice versa
      endian: function (n) {
        // If number given, swap endian
        if (n.constructor == Number) {
          return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
        }

        // Else, assume array and swap all items
        for (var i = 0; i < n.length; i++) n[i] = crypt.endian(n[i]);
        return n;
      },

      // Generate an array of any length of random bytes
      randomBytes: function (n) {
        for (var bytes = []; n > 0; n--) bytes.push(Math.floor(Math.random() * 256));
        return bytes;
      },

      // Convert a byte array to big-endian 32-bit words
      bytesToWords: function (bytes) {
        for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8) words[b >>> 5] |= bytes[i] << 24 - b % 32;
        return words;
      },

      // Convert big-endian 32-bit words to a byte array
      wordsToBytes: function (words) {
        for (var bytes = [], b = 0; b < words.length * 32; b += 8) bytes.push(words[b >>> 5] >>> 24 - b % 32 & 0xFF);
        return bytes;
      },

      // Convert a byte array to a hex string
      bytesToHex: function (bytes) {
        for (var hex = [], i = 0; i < bytes.length; i++) {
          hex.push((bytes[i] >>> 4).toString(16));
          hex.push((bytes[i] & 0xF).toString(16));
        }
        return hex.join('');
      },

      // Convert a hex string to a byte array
      hexToBytes: function (hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2) bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
      },

      // Convert a byte array to a base-64 string
      bytesToBase64: function (bytes) {
        for (var base64 = [], i = 0; i < bytes.length; i += 3) {
          var triplet = bytes[i] << 16 | bytes[i + 1] << 8 | bytes[i + 2];
          for (var j = 0; j < 4; j++) if (i * 8 + j * 6 <= bytes.length * 8) base64.push(base64map.charAt(triplet >>> 6 * (3 - j) & 0x3F));else base64.push('=');
        }
        return base64.join('');
      },

      // Convert a base-64 string to a byte array
      base64ToBytes: function (base64) {
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
    stringToBytes: function (str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function (str) {
      for (var bytes = [], i = 0; i < str.length; i++) bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function (bytes) {
      for (var str = [], i = 0; i < bytes.length; i++) str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

var charenc_1 = charenc;

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var index = function (obj) {
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
        isBuffer = index,
        bin = charenc_1.bin,


    // The core
    md5 = function (message, options) {
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

var at;
var ch;
var escapee = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    b: '\b',
    f: '\f',
    n: '\n',
    r: '\r',
    t: '\t'
};
var text;
var error$1 = function (m) {
    // Call error when something is wrong.
    throw {
        name: 'SyntaxError',
        message: m,
        at: at,
        text: text
    };
};
var next = function (c) {
    // If a c parameter is provided, verify that it matches the current character.
    if (c && c !== ch) {
        error$1("Expected '" + c + "' instead of '" + ch + "'");
    }

    // Get the next character. When there are no more characters,
    // return the empty string.

    ch = text.charAt(at);
    at += 1;
    return ch;
};
var number = function () {
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
        error$1("Bad number");
    } else {
        return number;
    }
};
var string = function () {
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
    error$1("Bad string");
};
var white = function () {

    // Skip whitespace.

    while (ch && ch <= ' ') {
        next();
    }
};
var word = function () {

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
    error$1("Unexpected '" + ch + "'");
};
var value;
var array = function () {

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
    error$1("Bad array");
};
var object = function () {

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
                error$1('Duplicate key "' + key + '"');
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
    error$1("Bad object");
};

value = function () {

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

var parse$1 = function (source, reviver) {
    var result;

    text = source;
    at = 0;
    ch = ' ';
    result = value();
    white();
    if (ch) {
        error$1("Syntax error");
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
        if (value && typeof value === 'object') {
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

var escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
var gap;
var indent;
var meta = { // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"': '\\"',
    '\\': '\\\\'
};
var rep;

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
    if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
        value = value.toJSON(key);
    }

    // If we were called with a replacer function, then call the replacer to
    // obtain a replacement value.
    if (typeof rep === 'function') {
        value = rep.call(holder, key, value);
    }

    // What happens next depends on the value's type.
    switch (typeof value) {
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
            if (rep && typeof rep === 'object') {
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

var stringify$2 = function (value, replacer, space) {
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
    if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
        throw new Error('JSON.stringify');
    }

    // Make a fake root object containing our value under the key of ''.
    // Return the result of stringifying the value.
    return str('', { '': value });
};

var parse = parse$1;
var stringify$1 = stringify$2;

var index$3 = {
	parse: parse,
	stringify: stringify$1
};

var json = typeof JSON !== 'undefined' ? JSON : index$3;

var index$2 = function (obj, opts) {
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
        if (typeof node !== 'object' || node === null) {
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

function Hash(object) {
  return md5(index$2(object));
}

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

function ImplementationError(message) {
  this.message = message;
}

Object.setPrototypeOf(ImplementationError, Error);
ImplementationError.prototype = Object.create(Error.prototype);
ImplementationError.prototype.name = 'ImplementationError';
ImplementationError.prototype.message = '';
ImplementationError.prototype.constructor = ImplementationError;

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

const internal$4 = Namespace('Multiton');

class Multiton {
  constructor(key) {
    if (this.constructor.has(key)) {
      throw new Error(`Attempt to create multiple instances for key "${key}"`);
    }
  }

  static has(key) {
    const scope = internal$4(this);
    if (scope.instances === undefined) {
      return false;
    }
    const coercedKey = this.coerceMultitonKey(key);
    return scope.instances[coercedKey] !== undefined;
  }

  static for(key, ...args) {
    const scope = internal$4(this);
    if (!scope.instances) {
      scope.instances = new Map();
    }
    const coercedKey = this.coerceMultitonKey(key);
    if (scope.instances.has(coercedKey)) {
      return scope.instances.get(coercedKey);
    }
    const instance = this.new(coercedKey, ...args);
    scope.instances.set(coercedKey, instance);
    return instance;
  }

  static new(...args) {
    return new this(...args);
  }

  static coerceMultitonKey(key) {
    return key;
  }
}

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

const internal$5 = Namespace('Semaphore');

class Task {
  constructor(semaphore, callback) {
    const promises = [new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    }), new Promise(resolve => {
      this.let = resolve;
    }).then(() => {
      callback(this.resolve, this.reject);
    })];
    this.promise = Promise.all(promises).then(values => {
      semaphore.signal();
      return values[0];
    }, reason => {
      semaphore.signal();
      return Promise.reject(reason);
    });
  }
}

class Semaphore {
  constructor(capacity) {
    const scope = internal$5(this);
    scope.capacity = capacity;
    scope.available = capacity;
    scope.queue = [];
  }

  wait(callback) {
    const scope = internal$5(this);
    const task = new Task(this, callback);
    if (scope.available === 0) {
      scope.queue.push(task);
    } else {
      --scope.available;
      task.let();
    }
    return task.promise;
  }

  signal() {
    const scope = internal$5(this);
    if (scope.queue.length === 0) {
      ++scope.available;
    } else {
      scope.queue.shift().let();
    }
  }

  // Properties

  get capacity() {
    const scope = internal$5(this);
    return scope.capacity;
  }

  get available() {
    const scope = internal$5(this);
    return scope.available;
  }
}

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

const internal$6 = Namespace('Singleton');

class Singleton {
  constructor() {
    if (internal$6(this.constructor).instance !== undefined) {
      throw new Error('Attempt to create multiple instances for singleton');
    }
  }

  static get(...args) {
    const scope = internal$6(this);
    if (scope.instance === undefined) {
      scope.instance = this.new(...args);
    }
    return scope.instance;
  }

  static new(...args) {
    return new this(...args);
  }
}

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

class Stride {
  static transform(array, stride, callback) {
    const values = [];
    array.forEach((value, index) => {
      const modulo = index % stride;
      values[modulo] = value;
      if (modulo === stride - 1) {
        const transformed = callback(...values, Math.floor(index / stride));
        for (let offset = 0; offset < stride; ++offset) {
          array[index - (stride - offset - 1)] = transformed[offset];
        }
      }
    });
    return array;
  }

  static forEach(array, stride, callback) {
    const values = [];
    array.forEach((value, index) => {
      const modulo = index % stride;
      values[modulo] = value;
      if (modulo === stride - 1) {
        callback(...values, Math.floor(index / stride));
      }
    });
  }

  static some(array, stride, callback) {
    const values = [];
    return array.some((value, index) => {
      const modulo = index % stride;
      values[modulo] = value;
      if (modulo === stride - 1) {
        return callback(...values, Math.floor(index / stride));
      }
      return false;
    });
  }

  static every(array, stride, callback) {
    const values = [];
    return array.every((value, index) => {
      const modulo = index % stride;
      values[modulo] = value;
      if (modulo === stride - 1) {
        return callback(...values, Math.floor(index / stride));
      }
      return true;
    });
  }

  static reduce(array, stride, callback, initial) {
    const values = [];
    return array.reduce((result, value, index) => {
      const modulo = index % stride;
      values[modulo] = value;
      if (modulo === stride - 1) {
        return callback(result, ...values, Math.floor(index / stride));
      }
      return result;
    }, initial);
  }
}

var base64Arraybuffer = createCommonjsModule(function (module, exports) {
  /*
   * base64-arraybuffer
   * https://github.com/niklasvh/base64-arraybuffer
   *
   * Copyright (c) 2012 Niklas von Hertzen
   * Licensed under the MIT license.
   */
  (function () {
    "use strict";

    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    // Use a lookup table to find the index.
    var lookup = new Uint8Array(256);
    for (var i = 0; i < chars.length; i++) {
      lookup[chars.charCodeAt(i)] = i;
    }

    exports.encode = function (arraybuffer) {
      var bytes = new Uint8Array(arraybuffer),
          i,
          len = bytes.length,
          base64 = "";

      for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
        base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
        base64 += chars[bytes[i + 2] & 63];
      }

      if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + "=";
      } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + "==";
      }

      return base64;
    };

    exports.decode = function (base64) {
      var bufferLength = base64.length * 0.75,
          len = base64.length,
          i,
          p = 0,
          encoded1,
          encoded2,
          encoded3,
          encoded4;

      if (base64[base64.length - 1] === "=") {
        bufferLength--;
        if (base64[base64.length - 2] === "=") {
          bufferLength--;
        }
      }

      var arraybuffer = new ArrayBuffer(bufferLength),
          bytes = new Uint8Array(arraybuffer);

      for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = encoded1 << 2 | encoded2 >> 4;
        bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
        bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
      }

      return arraybuffer;
    };
  })();
});

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

if (Environment.type === 'node') {
  // eslint-disable-next-line global-require
  const encoding = require('text-encoding');
  if (Environment.global.TextEncoder === undefined) {
    Environment.global.TextEncoder = encoding.TextEncoder;
  }
  if (Environment.global.TextDecoder === undefined) {
    Environment.global.TextDecoder = encoding.TextDecoder;
  }
}

class Transferral {
  static encode(object) {
    if (typeof TextEncoder !== 'function') {
      throw new Error('TextEncoder is missing');
    }
    const encoder = new TextEncoder();
    const text = JSON.stringify(object);
    const array = encoder.encode(text);
    return array.buffer;
  }

  static decode(buffer) {
    if (typeof TextDecoder !== 'function') {
      throw new Error('TextDecoder is missing');
    }
    const decoder = new TextDecoder();
    const view = new DataView(buffer);
    const text = decoder.decode(view);
    return JSON.parse(text);
  }

  static pack(buffer) {
    return base64Arraybuffer.encode(buffer);
  }

  static unpack(string) {
    return base64Arraybuffer.decode(string);
  }

  static packBufferGeometry(geometry) {
    Object.values(geometry.data.attributes).forEach(attribute => {
      const constructor = Environment.global[attribute.type];
      const buffer = new constructor(attribute.array).buffer;
      attribute.array = this.pack(buffer);
    });
  }

  static unpackBufferGeometry(geometry) {
    Object.values(geometry.data.attributes).forEach(attribute => {
      const constructor = Environment.global[attribute.type];
      const buffer = this.unpack(attribute.array);
      attribute.array = Array.from(new constructor(buffer));
    });
  }
}

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

export { Aggregate, AggregateFunction, AssertionError, Environment, FilePath, Hash, ImplementationError, Multiton, Namespace, Semaphore, Singleton, Stride, Transferral };
