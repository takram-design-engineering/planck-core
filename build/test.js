(function (mocha,chai$1,___build_planckCore_module_js,sinon,nock) {
'use strict';

mocha = 'default' in mocha ? mocha['default'] : mocha;
chai$1 = 'default' in chai$1 ? chai$1['default'] : chai$1;
sinon = 'default' in sinon ? sinon['default'] : sinon;
nock = 'default' in nock ? nock['default'] : nock;

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

mocha.setup('bdd');

window.addEventListener('load', function (event) {
  var runner = mocha.run();
  var results = [];

  runner.on('end', function () {
    window.mochaResults = runner.stats;
    window.mochaResults.reports = results;
  });

  runner.on('fail', function (test, error) {
    var titles = [];
    var current = test;
    while (current.parent.title) {
      titles.push(current.parent.title);
      current = current.parent;
    }
    titles.reverse();
    results.push({
      name: test.title,
      results: false,
      message: error.message,
      stack: error.stack,
      titles: titles
    });
  });
}, false);

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

var expect = chai$1.expect;

describe('Aggregate', function () {
  var T = function () {
    function T() {
      classCallCheck(this, T);
    }

    createClass(T, [{
      key: 'set',
      value: function set$$1(other) {
        this.value = other;
      }
    }]);
    return T;
  }();

  it('throws an error when new operator is used', function () {
    expect(function () {
      // eslint-disable-next-line no-new
      new ___build_planckCore_module_js.Aggregate();
    }).throw(Error);
  });

  it('stores property', function () {
    var targets = [new T(), new T(), new T()];
    var aggregate = ___build_planckCore_module_js.Aggregate.new.apply(___build_planckCore_module_js.Aggregate, targets);
    aggregate.property = true;
    expect(aggregate.property).equal(true);
  });

  it('returns the property of the first target', function () {
    var targets = [new T(), new T(), new T()];
    var aggregate = ___build_planckCore_module_js.Aggregate.new.apply(___build_planckCore_module_js.Aggregate, targets);
    targets.forEach(function (target, index) {
      target.value = index;
    });
    expect(aggregate.value).equal(0);
  });

  it('propagates property set to all the targets', function () {
    var targets = [new T(), new T(), new T()];
    var aggregate = ___build_planckCore_module_js.Aggregate.new.apply(___build_planckCore_module_js.Aggregate, targets);
    aggregate.value = true;
    targets.forEach(function (target) {
      return expect(target.value).equal(true);
    });
  });

  it('propagates function call to all the targets', function () {
    var targets = [new T(), new T(), new T()];
    var aggregate = ___build_planckCore_module_js.Aggregate.new.apply(___build_planckCore_module_js.Aggregate, targets);
    aggregate.set('a');
    targets.forEach(function (target) {
      return expect(target.value).equal('a');
    });
  });
});

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}



function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var sinonChai = createCommonjsModule(function (module, exports) {
    (function (sinonChai) {
        "use strict";

        // Module systems magic dance.

        /* istanbul ignore else */

        if (typeof commonjsRequire === "function" && 'object' === "object" && 'object' === "object") {
            // NodeJS
            module.exports = sinonChai;
        } else if (typeof undefined === "function" && undefined.amd) {
            // AMD
            undefined(function () {
                return sinonChai;
            });
        } else {
            // Other environment (usually <script> tag): plug in to global chai instance directly.
            chai.use(sinonChai);
        }
    })(function sinonChai(chai, utils) {
        "use strict";

        var slice = Array.prototype.slice;

        function isSpy(putativeSpy) {
            return typeof putativeSpy === "function" && typeof putativeSpy.getCall === "function" && typeof putativeSpy.calledWithExactly === "function";
        }

        function timesInWords(count) {
            return count === 1 ? "once" : count === 2 ? "twice" : count === 3 ? "thrice" : (count || 0) + " times";
        }

        function isCall(putativeCall) {
            return putativeCall && isSpy(putativeCall.proxy);
        }

        function assertCanWorkWith(assertion) {
            if (!isSpy(assertion._obj) && !isCall(assertion._obj)) {
                throw new TypeError(utils.inspect(assertion._obj) + " is not a spy or a call to a spy!");
            }
        }

        function getMessages(spy, action, nonNegatedSuffix, always, args) {
            var verbPhrase = always ? "always have " : "have ";
            nonNegatedSuffix = nonNegatedSuffix || "";
            if (isSpy(spy.proxy)) {
                spy = spy.proxy;
            }

            function printfArray(array) {
                return spy.printf.apply(spy, array);
            }

            return {
                affirmative: function affirmative() {
                    return printfArray(["expected %n to " + verbPhrase + action + nonNegatedSuffix].concat(args));
                },
                negative: function negative() {
                    return printfArray(["expected %n to not " + verbPhrase + action].concat(args));
                }
            };
        }

        function sinonProperty(name, action, nonNegatedSuffix) {
            utils.addProperty(chai.Assertion.prototype, name, function () {
                assertCanWorkWith(this);

                var messages = getMessages(this._obj, action, nonNegatedSuffix, false);
                this.assert(this._obj[name], messages.affirmative, messages.negative);
            });
        }

        function sinonPropertyAsBooleanMethod(name, action, nonNegatedSuffix) {
            utils.addMethod(chai.Assertion.prototype, name, function (arg) {
                assertCanWorkWith(this);

                var messages = getMessages(this._obj, action, nonNegatedSuffix, false, [timesInWords(arg)]);
                this.assert(this._obj[name] === arg, messages.affirmative, messages.negative);
            });
        }

        function createSinonMethodHandler(sinonName, action, nonNegatedSuffix) {
            return function () {
                assertCanWorkWith(this);

                var alwaysSinonMethod = "always" + sinonName[0].toUpperCase() + sinonName.substring(1);
                var shouldBeAlways = utils.flag(this, "always") && typeof this._obj[alwaysSinonMethod] === "function";
                var sinonMethod = shouldBeAlways ? alwaysSinonMethod : sinonName;

                var messages = getMessages(this._obj, action, nonNegatedSuffix, shouldBeAlways, slice.call(arguments));
                this.assert(this._obj[sinonMethod].apply(this._obj, arguments), messages.affirmative, messages.negative);
            };
        }

        function sinonMethodAsProperty(name, action, nonNegatedSuffix) {
            var handler = createSinonMethodHandler(name, action, nonNegatedSuffix);
            utils.addProperty(chai.Assertion.prototype, name, handler);
        }

        function exceptionalSinonMethod(chaiName, sinonName, action, nonNegatedSuffix) {
            var handler = createSinonMethodHandler(sinonName, action, nonNegatedSuffix);
            utils.addMethod(chai.Assertion.prototype, chaiName, handler);
        }

        function sinonMethod(name, action, nonNegatedSuffix) {
            exceptionalSinonMethod(name, name, action, nonNegatedSuffix);
        }

        utils.addProperty(chai.Assertion.prototype, "always", function () {
            utils.flag(this, "always", true);
        });

        sinonProperty("called", "been called", " at least once, but it was never called");
        sinonPropertyAsBooleanMethod("callCount", "been called exactly %1", ", but it was called %c%C");
        sinonProperty("calledOnce", "been called exactly once", ", but it was called %c%C");
        sinonProperty("calledTwice", "been called exactly twice", ", but it was called %c%C");
        sinonProperty("calledThrice", "been called exactly thrice", ", but it was called %c%C");
        sinonMethodAsProperty("calledWithNew", "been called with new");
        sinonMethod("calledBefore", "been called before %1");
        sinonMethod("calledAfter", "been called after %1");
        sinonMethod("calledImmediatelyBefore", "been called immediately before %1");
        sinonMethod("calledImmediatelyAfter", "been called immediately after %1");
        sinonMethod("calledOn", "been called with %1 as this", ", but it was called with %t instead");
        sinonMethod("calledWith", "been called with arguments %*", "%C");
        sinonMethod("calledWithExactly", "been called with exact arguments %*", "%C");
        sinonMethod("calledWithMatch", "been called with arguments matching %*", "%C");
        sinonMethod("returned", "returned %1");
        exceptionalSinonMethod("thrown", "threw", "thrown %1");
    });
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

var expect$1 = chai$1.expect;
chai$1.use(sinonChai);

describe('AggregateFunction', function () {
  it('throws an error when new operator is used', function () {
    expect$1(function () {
      // eslint-disable-next-line no-new
      new ___build_planckCore_module_js.AggregateFunction();
    }).throw(Error);
  });

  it('propagates call to all the targets', function () {
    var targets = [sinon.stub().returns('a'), sinon.stub().returns('b'), sinon.stub().returns('c')];
    var aggregate = ___build_planckCore_module_js.AggregateFunction.new.apply(___build_planckCore_module_js.AggregateFunction, targets);
    var result = aggregate();
    targets.forEach(function (target) {
      return expect$1(target).calledOnce;
    });
    expect$1(result[0]).equal('a');
    expect$1(result[1]).equal('b');
    expect$1(result[2]).equal('c');
  });
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

var expect$2 = chai$1.expect;

describe('AssertionError', function () {
  it('supports instanceof', function () {
    expect$2(new ___build_planckCore_module_js.AssertionError()).instanceof(___build_planckCore_module_js.AssertionError);
  });
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

var expect$3 = chai$1.expect;

describe('Hash', function () {
  it('generates a stable hash for objects', function () {
    var hash1 = ___build_planckCore_module_js.Hash({ a: 'a', b: [1, 2, { a: 'a', b: 'b' }] });
    var hash2 = ___build_planckCore_module_js.Hash({ b: [1, 2, { b: 'b', a: 'a' }], a: 'a' });
    var hash3 = ___build_planckCore_module_js.Hash({ a: 'a', b: [{ a: 'a', b: 'b' }, 1, 2] });
    expect$3(hash1).equal(hash2);
    expect$3(hash1).not.equal(hash3);
  });
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

var expect$4 = chai$1.expect;

describe('ImplementationError', function () {
  it('supports instanceof', function () {
    expect$4(new ___build_planckCore_module_js.ImplementationError()).instanceof(___build_planckCore_module_js.ImplementationError);
  });
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

var expect$5 = chai$1.expect;
chai$1.use(sinonChai);

describe('Namespace', function () {
  it('works', function () {
    var namespace = ___build_planckCore_module_js.Namespace();
    var object = {};
    var scope = namespace(object);
    expect$5(scope.a).undefined;
    scope.a = 'a';
    expect$5(scope.a).equal('a');
  });

  it('accepts init and is called once', function () {
    var init = sinon.stub().returns({
      a: 'a'
    });
    var namespace = ___build_planckCore_module_js.Namespace();
    var object = {};
    namespace(object, init);
    namespace(object, init);
    expect$5(init).calledOnce;
    var scope = namespace(object);
    scope.a = 'a';
    expect$5(scope.a).equal('a');
  });
});

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

var dsv = function (delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      delimiterCode = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert,
        columns,
        rows = parseRows(text, function (row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns;
    return rows;
  }

  function parseRows(text, f) {
    var EOL = {},
        // sentinel value for end-of-line
    EOF = {},
        // sentinel value for end-of-file
    rows = [],
        // output rows
    N = text.length,
        I = 0,
        // current character index
    n = 0,
        // the current line number
    t,
        // the current token
    eol; // is the current token followed by EOL?

    function token() {
      if (I >= N) return EOF; // special case: end of file
      if (eol) return eol = false, EOL; // special case: end of line

      // special case: quotes
      var j = I,
          c;
      if (text.charCodeAt(j) === 34) {
        var i = j;
        while (i++ < N) {
          if (text.charCodeAt(i) === 34) {
            if (text.charCodeAt(i + 1) !== 34) break;
            ++i;
          }
        }
        I = i + 2;
        c = text.charCodeAt(i + 1);
        if (c === 13) {
          eol = true;
          if (text.charCodeAt(i + 2) === 10) ++I;
        } else if (c === 10) {
          eol = true;
        }
        return text.slice(j + 1, i).replace(/""/g, "\"");
      }

      // common case: find next delimiter or newline
      while (I < N) {
        var k = 1;
        c = text.charCodeAt(I++);
        if (c === 10) eol = true; // \n
        else if (c === 13) {
            eol = true;if (text.charCodeAt(I) === 10) ++I, ++k;
          } // \r|\r\n
          else if (c !== delimiterCode) continue;
        return text.slice(j, I - k);
      }

      // special case: last token before EOF
      return text.slice(j);
    }

    while ((t = token()) !== EOF) {
      var a = [];
      while (t !== EOL && t !== EOF) {
        a.push(t);
        t = token();
      }
      if (f && (a = f(a, n++)) == null) continue;
      rows.push(a);
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
    return text == null ? "" : reFormat.test(text += "") ? "\"" + text.replace(/\"/g, "\"\"") + "\"" : text;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatRows: formatRows
  };
};

var csv = dsv(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatRows = csv.formatRows;

var tsv = dsv("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatRows = tsv.formatRows;



var d3 = Object.freeze({
	dsvFormat: dsv,
	csvParse: csvParse,
	csvParseRows: csvParseRows,
	csvFormat: csvFormat,
	csvFormatRows: csvFormatRows,
	tsvParse: tsvParse,
	tsvParseRows: tsvParseRows,
	tsvFormat: tsvFormat,
	tsvFormatRows: tsvFormatRows
});

/* !
 * Chai - checkError utility
 * Copyright(c) 2012-2016 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/**
 * ### .checkError
 *
 * Checks that an error conforms to a given set of criteria and/or retrieves information about it.
 *
 * @api public
 */

/**
 * ### .compatibleInstance(thrown, errorLike)
 *
 * Checks if two instances are compatible (strict equal).
 * Returns false if errorLike is not an instance of Error, because instances
 * can only be compatible if they're both error instances.
 *
 * @name compatibleInstance
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleInstance(thrown, errorLike) {
  return errorLike instanceof Error && thrown === errorLike;
}

/**
 * ### .compatibleConstructor(thrown, errorLike)
 *
 * Checks if two constructors are compatible.
 * This function can receive either an error constructor or
 * an error instance as the `errorLike` argument.
 * Constructors are compatible if they're the same or if one is
 * an instance of another.
 *
 * @name compatibleConstructor
 * @param {Error} thrown error
 * @param {Error|ErrorConstructor} errorLike object to compare against
 * @namespace Utils
 * @api public
 */

function compatibleConstructor(thrown, errorLike) {
  if (errorLike instanceof Error) {
    // If `errorLike` is an instance of any error we compare their constructors
    return thrown.constructor === errorLike.constructor || thrown instanceof errorLike.constructor;
  } else if (errorLike.prototype instanceof Error || errorLike === Error) {
    // If `errorLike` is a constructor that inherits from Error, we compare `thrown` to `errorLike` directly
    return thrown.constructor === errorLike || thrown instanceof errorLike;
  }

  return false;
}

/**
 * ### .compatibleMessage(thrown, errMatcher)
 *
 * Checks if an error's message is compatible with a matcher (String or RegExp).
 * If the message contains the String or passes the RegExp test,
 * it is considered compatible.
 *
 * @name compatibleMessage
 * @param {Error} thrown error
 * @param {String|RegExp} errMatcher to look for into the message
 * @namespace Utils
 * @api public
 */

function compatibleMessage(thrown, errMatcher) {
  var comparisonString = typeof thrown === 'string' ? thrown : thrown.message;
  if (errMatcher instanceof RegExp) {
    return errMatcher.test(comparisonString);
  } else if (typeof errMatcher === 'string') {
    return comparisonString.indexOf(errMatcher) !== -1; // eslint-disable-line no-magic-numbers
  }

  return false;
}

/**
 * ### .getFunctionName(constructorFn)
 *
 * Returns the name of a function.
 * This also includes a polyfill function if `constructorFn.name` is not defined.
 *
 * @name getFunctionName
 * @param {Function} constructorFn
 * @namespace Utils
 * @api private
 */

var functionNameMatch = /\s*function(?:\s|\s*\/\*[^(?:*\/)]+\*\/\s*)*([^\(\/]+)/;
function getFunctionName(constructorFn) {
  var name = '';
  if (typeof constructorFn.name === 'undefined') {
    // Here we run a polyfill if constructorFn.name is not defined
    var match = String(constructorFn).match(functionNameMatch);
    if (match) {
      name = match[1];
    }
  } else {
    name = constructorFn.name;
  }

  return name;
}

/**
 * ### .getConstructorName(errorLike)
 *
 * Gets the constructor name for an Error instance or constructor itself.
 *
 * @name getConstructorName
 * @param {Error|ErrorConstructor} errorLike
 * @namespace Utils
 * @api public
 */

function getConstructorName(errorLike) {
  var constructorName = errorLike;
  if (errorLike instanceof Error) {
    constructorName = getFunctionName(errorLike.constructor);
  } else if (typeof errorLike === 'function') {
    // If `err` is not an instance of Error it is an error constructor itself or another function.
    // If we've got a common function we get its name, otherwise we may need to create a new instance
    // of the error just in case it's a poorly-constructed error. Please see chaijs/chai/issues/45 to know more.
    constructorName = getFunctionName(errorLike).trim() || getFunctionName(new errorLike()); // eslint-disable-line new-cap
  }

  return constructorName;
}

/**
 * ### .getMessage(errorLike)
 *
 * Gets the error message from an error.
 * If `err` is a String itself, we return it.
 * If the error has no message, we return an empty string.
 *
 * @name getMessage
 * @param {Error|String} errorLike
 * @namespace Utils
 * @api public
 */

function getMessage(errorLike) {
  var msg = '';
  if (errorLike && errorLike.message) {
    msg = errorLike.message;
  } else if (typeof errorLike === 'string') {
    msg = errorLike;
  }

  return msg;
}

var index = {
  compatibleInstance: compatibleInstance,
  compatibleConstructor: compatibleConstructor,
  compatibleMessage: compatibleMessage,
  getMessage: getMessage,
  getConstructorName: getConstructorName
};

var chaiAsPromised = createCommonjsModule(function (module) {
    "use strict";

    var checkError = index;

    module.exports = function (chai, utils) {
        var Assertion = chai.Assertion;
        var assert = chai.assert;

        // If we are using a version of Chai that has checkError on it,
        // we want to use that version to be consistent. Otherwise, we use
        // what was passed to the factory.
        if (utils.checkError) {
            checkError = utils.checkError;
        }

        function isLegacyJQueryPromise(thenable) {
            // jQuery promises are Promises/A+-compatible since 3.0.0. jQuery 3.0.0 is also the first version
            // to define the catch method.
            return typeof thenable.catch !== "function" && typeof thenable.always === "function" && typeof thenable.done === "function" && typeof thenable.fail === "function" && typeof thenable.pipe === "function" && typeof thenable.progress === "function" && typeof thenable.state === "function";
        }

        function assertIsAboutPromise(assertion) {
            if (typeof assertion._obj.then !== "function") {
                throw new TypeError(utils.inspect(assertion._obj) + " is not a thenable.");
            }
            if (isLegacyJQueryPromise(assertion._obj)) {
                throw new TypeError("Chai as Promised is incompatible with thenables of jQuery<3.0.0, sorry! Please " + "upgrade jQuery or use another Promises/A+ compatible library (see " + "http://promisesaplus.com/).");
            }
        }

        function method(name, asserter) {
            utils.addMethod(Assertion.prototype, name, function () {
                assertIsAboutPromise(this);
                return asserter.apply(this, arguments);
            });
        }

        function property(name, asserter) {
            utils.addProperty(Assertion.prototype, name, function () {
                assertIsAboutPromise(this);
                return asserter.apply(this, arguments);
            });
        }

        function doNotify(promise, done) {
            promise.then(function () {
                done();
            }, done);
        }

        // These are for clarity and to bypass Chai refusing to allow `undefined` as actual when used with `assert`.
        function assertIfNegated(assertion, message, extra) {
            assertion.assert(true, null, message, extra.expected, extra.actual);
        }

        function assertIfNotNegated(assertion, message, extra) {
            assertion.assert(false, message, null, extra.expected, extra.actual);
        }

        function getBasePromise(assertion) {
            // We need to chain subsequent asserters on top of ones in the chain already (consider
            // `eventually.have.property("foo").that.equals("bar")`), only running them after the existing ones pass.
            // So the first base-promise is `assertion._obj`, but after that we use the assertions themselves, i.e.
            // previously derived promises, to chain off of.
            return typeof assertion.then === "function" ? assertion : assertion._obj;
        }

        function getReasonName(reason) {
            return reason instanceof Error ? reason.toString() : checkError.getConstructorName(reason);
        }

        // Grab these first, before we modify `Assertion.prototype`.

        var propertyNames = Object.getOwnPropertyNames(Assertion.prototype);

        var propertyDescs = {};
        propertyNames.forEach(function (name) {
            propertyDescs[name] = Object.getOwnPropertyDescriptor(Assertion.prototype, name);
        });

        property("fulfilled", function () {
            var that = this;
            var derivedPromise = getBasePromise(that).then(function (value) {
                assertIfNegated(that, "expected promise not to be fulfilled but it was fulfilled with #{act}", { actual: value });
                return value;
            }, function (reason) {
                assertIfNotNegated(that, "expected promise to be fulfilled but it was rejected with #{act}", { actual: getReasonName(reason) });
                return reason;
            });

            module.exports.transferPromiseness(that, derivedPromise);
        });

        property("rejected", function () {
            var that = this;
            var derivedPromise = getBasePromise(that).then(function (value) {
                assertIfNotNegated(that, "expected promise to be rejected but it was fulfilled with #{act}", { actual: value });
                return value;
            }, function (reason) {
                assertIfNegated(that, "expected promise not to be rejected but it was rejected with #{act}", { actual: getReasonName(reason) });

                // Return the reason, transforming this into a fulfillment, to allow further assertions, e.g.
                // `promise.should.be.rejected.and.eventually.equal("reason")`.
                return reason;
            });

            module.exports.transferPromiseness(that, derivedPromise);
        });

        method("rejectedWith", function (errorLike, errMsgMatcher, message) {
            var errorLikeName = null;
            var negate = utils.flag(this, "negate") || false;

            // rejectedWith with that is called without arguments is
            // the same as a plain ".rejected" use.
            if (errorLike === undefined && errMsgMatcher === undefined && message === undefined) {
                /* jshint expr: true */
                this.rejected;
                return;
            }

            if (message !== undefined) {
                utils.flag(this, "message", message);
            }

            if (errorLike instanceof RegExp || typeof errorLike === "string") {
                errMsgMatcher = errorLike;
                errorLike = null;
            } else if (errorLike && errorLike instanceof Error) {
                errorLikeName = errorLike.toString();
            } else if (typeof errorLike === "function") {
                errorLikeName = checkError.getConstructorName(errorLike);
            } else {
                errorLike = null;
            }
            var everyArgIsDefined = Boolean(errorLike && errMsgMatcher);

            var matcherRelation = "including";
            if (errMsgMatcher instanceof RegExp) {
                matcherRelation = "matching";
            }

            var that = this;
            var derivedPromise = getBasePromise(that).then(function (value) {
                var assertionMessage = null;
                var expected = null;

                if (errorLike) {
                    assertionMessage = "expected promise to be rejected with #{exp} but it was fulfilled with " + "#{act}";
                    expected = errorLikeName;
                } else if (errMsgMatcher) {
                    assertionMessage = "expected promise to be rejected with an error " + matcherRelation + " #{exp} but it was fulfilled with #{act}";
                    expected = errMsgMatcher;
                }

                assertIfNotNegated(that, assertionMessage, { expected: expected, actual: value });
                return value;
            }, function (reason) {
                var errorLikeCompatible = errorLike && (errorLike instanceof Error ? checkError.compatibleInstance(reason, errorLike) : checkError.compatibleConstructor(reason, errorLike));

                var errMsgMatcherCompatible = errMsgMatcher && checkError.compatibleMessage(reason, errMsgMatcher);

                var reasonName = getReasonName(reason);

                if (negate && everyArgIsDefined) {
                    if (errorLikeCompatible && errMsgMatcherCompatible) {
                        that.assert(true, null, "expected promise not to be rejected with #{exp} but it was rejected " + "with #{act}", errorLikeName, reasonName);
                    }
                } else {
                    if (errorLike) {
                        that.assert(errorLikeCompatible, "expected promise to be rejected with #{exp} but it was rejected with #{act}", "expected promise not to be rejected with #{exp} but it was rejected " + "with #{act}", errorLikeName, reasonName);
                    }

                    if (errMsgMatcher) {
                        that.assert(errMsgMatcherCompatible, "expected promise to be rejected with an error " + matcherRelation + " #{exp} but got #{act}", "expected promise not to be rejected with an error " + matcherRelation + " #{exp}", errMsgMatcher, checkError.getMessage(reason));
                    }
                }

                return reason;
            });

            module.exports.transferPromiseness(that, derivedPromise);
        });

        property("eventually", function () {
            utils.flag(this, "eventually", true);
        });

        method("notify", function (done) {
            doNotify(getBasePromise(this), done);
        });

        method("become", function (value, message) {
            return this.eventually.deep.equal(value, message);
        });

        ////////
        // `eventually`

        // We need to be careful not to trigger any getters, thus `Object.getOwnPropertyDescriptor` usage.
        var methodNames = propertyNames.filter(function (name) {
            return name !== "assert" && typeof propertyDescs[name].value === "function";
        });

        methodNames.forEach(function (methodName) {
            Assertion.overwriteMethod(methodName, function (originalMethod) {
                return function () {
                    doAsserterAsyncAndAddThen(originalMethod, this, arguments);
                };
            });
        });

        var getterNames = propertyNames.filter(function (name) {
            return name !== "_obj" && typeof propertyDescs[name].get === "function";
        });

        getterNames.forEach(function (getterName) {
            // Chainable methods are things like `an`, which can work both for `.should.be.an.instanceOf` and as
            // `should.be.an("object")`. We need to handle those specially.
            var isChainableMethod = Assertion.prototype.__methods.hasOwnProperty(getterName);

            if (isChainableMethod) {
                Assertion.overwriteChainableMethod(getterName, function (originalMethod) {
                    return function () {
                        doAsserterAsyncAndAddThen(originalMethod, this, arguments);
                    };
                }, function (originalGetter) {
                    return function () {
                        doAsserterAsyncAndAddThen(originalGetter, this);
                    };
                });
            } else {
                Assertion.overwriteProperty(getterName, function (originalGetter) {
                    return function () {
                        doAsserterAsyncAndAddThen(originalGetter, this);
                    };
                });
            }
        });

        function doAsserterAsyncAndAddThen(asserter, assertion, args) {
            // Since we're intercepting all methods/properties, we need to just pass through if they don't want
            // `eventually`, or if we've already fulfilled the promise (see below).
            if (!utils.flag(assertion, "eventually")) {
                return asserter.apply(assertion, args);
            }

            var derivedPromise = getBasePromise(assertion).then(function (value) {
                // Set up the environment for the asserter to actually run: `_obj` should be the fulfillment value, and
                // now that we have the value, we're no longer in "eventually" mode, so we won't run any of this code,
                // just the base Chai code that we get to via the short-circuit above.
                assertion._obj = value;
                utils.flag(assertion, "eventually", false);

                return args ? module.exports.transformAsserterArgs(args) : args;
            }).then(function (args) {
                asserter.apply(assertion, args);

                // Because asserters, for example `property`, can change the value of `_obj` (i.e. change the "object"
                // flag), we need to communicate this value change to subsequent chained asserters. Since we build a
                // promise chain paralleling the asserter chain, we can use it to communicate such changes.
                return assertion._obj;
            });

            module.exports.transferPromiseness(assertion, derivedPromise);
        }

        ///////
        // Now use the `Assertion` framework to build an `assert` interface.
        var originalAssertMethods = Object.getOwnPropertyNames(assert).filter(function (propName) {
            return typeof assert[propName] === "function";
        });

        assert.isFulfilled = function (promise, message) {
            return new Assertion(promise, message).to.be.fulfilled;
        };

        assert.isRejected = function (promise, errorLike, errMsgMatcher, message) {
            var assertion = new Assertion(promise, message);
            return assertion.to.be.rejectedWith(errorLike, errMsgMatcher, message);
        };

        assert.becomes = function (promise, value, message) {
            return assert.eventually.deepEqual(promise, value, message);
        };

        assert.doesNotBecome = function (promise, value, message) {
            return assert.eventually.notDeepEqual(promise, value, message);
        };

        assert.eventually = {};
        originalAssertMethods.forEach(function (assertMethodName) {
            assert.eventually[assertMethodName] = function (promise) {
                var otherArgs = Array.prototype.slice.call(arguments, 1);

                var customRejectionHandler;
                var message = arguments[assert[assertMethodName].length - 1];
                if (typeof message === "string") {
                    customRejectionHandler = function customRejectionHandler(reason) {
                        throw new chai.AssertionError(message + "\n\nOriginal reason: " + utils.inspect(reason));
                    };
                }

                var returnedPromise = promise.then(function (fulfillmentValue) {
                    return assert[assertMethodName].apply(assert, [fulfillmentValue].concat(otherArgs));
                }, customRejectionHandler);

                returnedPromise.notify = function (done) {
                    doNotify(returnedPromise, done);
                };

                return returnedPromise;
            };
        });
    };

    module.exports.transferPromiseness = function (assertion, promise) {
        assertion.then = promise.then.bind(promise);
    };

    module.exports.transformAsserterArgs = function (values) {
        return values;
    };
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

var expect$6 = chai$1.expect;
chai$1.use(chaiAsPromised);

if (___build_planckCore_module_js.Environment.type === 'node') {
  global.d3 = d3;
}

// eslint-disable-next-line func-names
describe('Request', function () {
  this.timeout(300000);

  var host = 'http://localhost';
  if (___build_planckCore_module_js.Environment.type !== 'node') {
    host = window.location.origin;
  }

  describe('#text', function () {
    it('resolves a string when fulfilled', function () {
      var path = '/test/core/data/text';
      var expected = 'response';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(200, expected);
      }
      return expect$6(___build_planckCore_module_js.Request.text('' + host + path)).fulfilled.then(function (response) {
        expect$6(response).equal(expected);
      });
    });

    it('rejects with status code other than 200', function () {
      var path = '/test/core/data/404';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(404);
      }
      return expect$6(___build_planckCore_module_js.Request.text('' + host + path)).rejected.then(function (error) {
        expect$6(error).equal(404);
      });
    });
  });

  describe('#json', function () {
    it('resolves an object when fulfilled', function () {
      var path = '/test/core/data/json';
      var expected = { a: 1, b: 'c' };
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(200, JSON.stringify(expected));
      }
      return expect$6(___build_planckCore_module_js.Request.json('' + host + path)).fulfilled.then(function (response) {
        expect$6(response).deep.equal(expected);
      });
    });

    it('rejects with error when the response is malformed', function () {
      var path = '/test/core/data/malformed';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(200, '!malformed');
      }
      return expect$6(___build_planckCore_module_js.Request.json('' + host + path)).rejected.then(function (error) {
        expect$6(error).instanceof(Error);
      });
    });

    it('rejects with status code other than 200', function () {
      var path = '/test/core/data/404';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(404);
      }
      return expect$6(___build_planckCore_module_js.Request.json('' + host + path)).rejected.then(function (error) {
        expect$6(error).equal(404);
      });
    });
  });

  describe('#buffer', function () {
    it('resolves a buffer when fulfilled', function () {
      var path = '/test/core/data/buffer';
      var expected = new Float32Array([1, 2, 3, 4]).buffer;

      if (___build_planckCore_module_js.Environment.type === 'node') {
        var buffer = new Buffer(expected.byteLength);
        var view = new Uint8Array(expected);
        for (var i = 0; i < buffer.length; ++i) {
          buffer[i] = view[i];
        }

        nock(host).get(path).reply(200, buffer);
      }
      return expect$6(___build_planckCore_module_js.Request.buffer('' + host + path)).fulfilled.then(function (response) {
        expect$6(response).instanceof(ArrayBuffer);
        expect$6(response.byteLength).equal(expected.byteLength);
        var responseView = new Float32Array(response);
        var expectedView = new Float32Array(expected);
        for (var _i = 0; _i < responseView.length; ++_i) {
          expect$6(responseView[_i]).equal(expectedView[_i]);
        }
      });
    });

    it('rejects with status code other than 200', function () {
      var path = '/test/core/data/404';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(404);
      }
      return expect$6(___build_planckCore_module_js.Request.buffer('' + host + path)).rejected.then(function (error) {
        expect$6(error).equal(404);
      });
    });
  });

  describe('#csv', function () {
    it('resolves a string when fulfilled', function () {
      var path = '/test/core/data/csv';
      var expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }];
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(200, csvFormat(expected));
      }
      return expect$6(___build_planckCore_module_js.Request.csv('' + host + path)).fulfilled.then(function (response) {
        delete response.columns;
        expect$6(response).deep.equal(expected);
      });
    });

    it('rejects with status code other than 200', function () {
      var path = '/test/core/data/404';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(404);
      }
      return expect$6(___build_planckCore_module_js.Request.csv('' + host + path)).rejected.then(function (error) {
        expect$6(error).equal(404);
      });
    });
  });

  describe('#tsv', function () {
    it('resolves a string when fulfilled', function () {
      var path = '/test/core/data/tsv';
      var expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }];
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(200, tsvFormat(expected));
      }
      return expect$6(___build_planckCore_module_js.Request.tsv('' + host + path)).fulfilled.then(function (response) {
        delete response.columns;
        expect$6(response).deep.equal(expected);
      });
    });

    it('rejects with status code other than 200', function () {
      var path = '/test/core/data/404';
      if (___build_planckCore_module_js.Environment.type === 'node') {
        nock(host).get(path).reply(404);
      }
      return expect$6(___build_planckCore_module_js.Request.tsv('' + host + path)).rejected.then(function (error) {
        expect$6(error).equal(404);
      });
    });
  });
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

var expect$7 = chai$1.expect;

describe('Semaphore', function () {
  it('runs tasks below or equal its capacity', function () {
    var semaphore = new ___build_planckCore_module_js.Semaphore(10);
    var count = 0;
    var callback = function callback(resolve, reject) {
      ++count;
      expect$7(count).most(10);
      setTimeout(function () {
        --count;
        expect$7(count).most(10);
        resolve();
      }, 10);
    };
    for (var i = 0; i < 1000; ++i) {
      semaphore.wait(callback);
    }
  });
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

var expect$8 = chai$1.expect;

describe('Stride', function () {
  describe('#forEach', function () {
    it('works', function () {
      var array = [0, 'a', 1, 'b', 2, 'c'];
      var i = 0;
      ___build_planckCore_module_js.Stride.forEach(array, 2, function (number, string, index) {
        expect$8(number).equal(array[i * 2 + 0]);
        expect$8(string).equal(array[i * 2 + 1]);
        expect$8(index).equal(i);
        ++i;
      });
    });
  });
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

var expect$9 = chai$1.expect;

describe('Transferral', function () {
  describe('#encode', function () {
    it('returns buffer', function () {
      expect$9(___build_planckCore_module_js.Transferral.encode({})).instanceof(ArrayBuffer);
    });
  });

  describe('#decode', function () {
    it('returns object', function () {
      var encoded = ___build_planckCore_module_js.Transferral.encode({});
      expect$9(_typeof(___build_planckCore_module_js.Transferral.decode(encoded))).equal('object');
    });
  });

  describe('#pack', function () {
    it('returns string', function () {
      var buffer = new ArrayBuffer(8);
      expect$9(_typeof(___build_planckCore_module_js.Transferral.pack(buffer))).equal('string');
    });
  });

  describe('#unpack', function () {
    it('returns array buffer', function () {
      var buffer = new ArrayBuffer(8);
      var packed = ___build_planckCore_module_js.Transferral.pack(buffer);
      expect$9(___build_planckCore_module_js.Transferral.unpack(packed)).instanceof(ArrayBuffer);
    });
  });

  it('performs consistent encode/decode', function () {
    var object = { values: [1, 2, 3] };
    var encoded = ___build_planckCore_module_js.Transferral.encode(object);
    var decoded = ___build_planckCore_module_js.Transferral.decode(encoded);
    expect$9(Object.values(decoded).length).equal(1);
    expect$9(decoded.values.length).equal(3);
    decoded.values.forEach(function (value, index) {
      expect$9(value).equal(object.values[index]);
    });
  });

  it('performs consistent pack/unpack', function () {
    var array = new Float32Array([0, Math.PI, Math.E]);
    var packed = ___build_planckCore_module_js.Transferral.pack(array.buffer);
    var unpacked = new Float32Array(___build_planckCore_module_js.Transferral.unpack(packed));
    expect$9(unpacked.length).equal(3);
    unpacked.forEach(function (value, index) {
      expect$9(value).equal(array[index]);
    });
  });
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

}(mocha,chai,Planck,sinon,nock));
//# sourceMappingURL=test.js.map
