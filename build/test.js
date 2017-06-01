(function (mocha,chai$1,___build_planckCore_module_js,sinon) {
'use strict';

mocha = 'default' in mocha ? mocha['default'] : mocha;
chai$1 = 'default' in chai$1 ? chai$1['default'] : chai$1;
sinon = 'default' in sinon ? sinon['default'] : sinon;

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
    while (test.parent.title) {
      titles.push(test.parent.title);
      test = test.parent;
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

  it('supports instanceof', function () {
    expect(___build_planckCore_module_js.Aggregate.new()).instanceof(___build_planckCore_module_js.Aggregate);
  });

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
  it('supports instanceof', function () {
    expect$1(___build_planckCore_module_js.AggregateFunction.new()).instanceof(___build_planckCore_module_js.AggregateFunction);
  });

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

describe('FilePath', function () {
  it('returns an absolute path', function () {
    expect$3(___build_planckCore_module_js.FilePath.resolve('path')).equal('path');
  });

  it('joins components', function () {
    expect$3(___build_planckCore_module_js.FilePath.resolve('./a', './b')).equal('a/b');
    expect$3(___build_planckCore_module_js.FilePath.resolve('a', '', 'b')).equal('a/b');
    expect$3(___build_planckCore_module_js.FilePath.resolve('a', '/', 'b')).equal('a/b');
    expect$3(___build_planckCore_module_js.FilePath.resolve('a', 'b', '')).equal('a/b');
  });

  it('normalizes relative parts but no above root', function () {
    expect$3(___build_planckCore_module_js.FilePath.resolve('../a')).equal('a');
    expect$3(___build_planckCore_module_js.FilePath.resolve('a', '../b')).equal('a/b');
    expect$3(___build_planckCore_module_js.FilePath.resolve('../a/../b', '../c/d', '../e')).equal('b/c/e');
  });

  it('normalizes relative parts but no above root', function () {
    expect$3(___build_planckCore_module_js.FilePath.resolve('/')).equal('');
    expect$3(___build_planckCore_module_js.FilePath.resolve('/a')).equal('a');
    expect$3(___build_planckCore_module_js.FilePath.resolve('/a', '/b')).equal('b');
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

describe('Hash', function () {
  it('generates a stable hash for objects', function () {
    var hash1 = ___build_planckCore_module_js.Hash({ a: 'a', b: [1, 2, { a: 'a', b: 'b' }] });
    var hash2 = ___build_planckCore_module_js.Hash({ b: [1, 2, { b: 'b', a: 'a' }], a: 'a' });
    var hash3 = ___build_planckCore_module_js.Hash({ a: 'a', b: [{ a: 'a', b: 'b' }, 1, 2] });
    expect$4(hash1).equal(hash2);
    expect$4(hash1).not.equal(hash3);
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

describe('ImplementationError', function () {
  it('supports instanceof', function () {
    expect$5(new ___build_planckCore_module_js.ImplementationError()).instanceof(___build_planckCore_module_js.ImplementationError);
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

var expect$6 = chai$1.expect;
chai$1.use(sinonChai);

describe('Namespace', function () {
  it('works', function () {
    var namespace = ___build_planckCore_module_js.Namespace();
    var object = {};
    var scope = namespace(object);
    expect$6(scope.a).undefined;
    scope.a = 'a';
    expect$6(scope.a).equal('a');
  });

  it('accepts init and is called once', function () {
    var init = sinon.stub().returns({
      a: 'a'
    });
    var namespace = ___build_planckCore_module_js.Namespace();
    var object = {};
    namespace(object, init);
    namespace(object, init);
    expect$6(init).calledOnce;
    var scope = namespace(object);
    scope.a = 'a';
    expect$6(scope.a).equal('a');
  });
});

// //
// //  The MIT License
// //
// //  Copyright (C) 2016-Present Shota Matsuda
// //
// //  Permission is hereby granted, free of charge, to any person obtaining a
// //  copy of this software and associated documentation files (the "Software"),
// //  to deal in the Software without restriction, including without limitation
// //  the rights to use, copy, modify, merge, publish, distribute, sublicense,
// //  and/or sell copies of the Software, and to permit persons to whom the
// //  Software is furnished to do so, subject to the following conditions:
// //
// //  The above copyright notice and this permission notice shall be included in
// //  all copies or substantial portions of the Software.
// //
// //  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// //  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// //  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
// //  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// //  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// //  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
// //  DEALINGS IN THE SOFTWARE.
// //
//
// import * as d3 from 'd3-dsv'
// import chai from 'chai'
// import chaiAsPromised from 'chai-as-promised'
// import nock from 'nock'
//
// import { Request } from '../..'
//
// global.d3 = d3
//
// const expect = chai.expect
// chai.use(chaiAsPromised)
//
// describe('Request', () => {
//   describe('#text', () => {
//     it('resolves a string when fulfilled', () => {
//       const expected = 'response'
//       nock('http://localhost')
//         .get('/')
//         .reply(200, expected)
//
//       return expect(Request.text('http://localhost')).fulfilled
//         .then(response => {
//           expect(response).equal(expected)
//         })
//     })
//
//     it('rejects with status code other than 200', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(404)
//
//       return expect(Request.text('http://localhost')).rejected
//         .then(error => {
//           expect(error).equal(404)
//         })
//     })
//   })
//
//   describe('#json', () => {
//     it('resolves an object when fulfilled', () => {
//       const expected = { response: 'response' }
//       nock('http://localhost')
//         .get('/')
//         .reply(200, JSON.stringify(expected))
//
//       return expect(Request.json('http://localhost')).fulfilled
//         .then(response => {
//           expect(response).deep.equal(expected)
//         })
//     })
//
//     it('rejects with error when the response is malformed', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(200, 'malformed')
//
//       return expect(Request.json('http://localhost')).rejected
//         .then(error => {
//           expect(error).instanceof(Error)
//         })
//     })
//
//     it('rejects with status code other than 200', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(404)
//
//       return expect(Request.json('http://localhost')).rejected
//         .then(error => {
//           expect(error).equal(404)
//         })
//     })
//   })
//
//   describe('#buffer', () => {
//     it('resolves a buffer when fulfilled', () => {
//       const expected = new Float32Array([1, 2, 3, 4]).buffer
//       const buffer = new Buffer(expected.byteLength)
//       const view = new Uint8Array(expected)
//       for (let i = 0; i < buffer.length; ++i) {
//         buffer[i] = view[i]
//       }
//
//       nock('http://localhost')
//         .get('/')
//         .reply(200, buffer)
//
//       return expect(Request.buffer('http://localhost')).fulfilled
//         .then(response => {
//           expect(response).instanceof(ArrayBuffer)
//           expect(response.byteLength).equal(expected.byteLength)
//           const responseView = new Float32Array(response)
//           const expectedView = new Float32Array(expected)
//           for (let i = 0; i < responseView.length; ++i) {
//             expect(responseView[i]).equal(expectedView[i])
//           }
//         })
//     })
//
//     it('rejects with status code other than 200', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(404)
//
//       return expect(Request.buffer('http://localhost')).rejected
//         .then(error => {
//           expect(error).equal(404)
//         })
//     })
//   })
//
//   describe('#csv', () => {
//     it('resolves a string when fulfilled', () => {
//       const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
//       nock('http://localhost')
//         .get('/')
//         .reply(200, d3.csvFormat(expected))
//
//       return expect(Request.csv('http://localhost')).fulfilled
//         .then(response => {
//           delete response.columns
//           expect(response).deep.equal(expected)
//         })
//     })
//
//     it('rejects with status code other than 200', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(404)
//
//       return expect(Request.csv('http://localhost')).rejected
//         .then(error => {
//           expect(error).equal(404)
//         })
//     })
//   })
//
//   describe('#tsv', () => {
//     it('resolves a string when fulfilled', () => {
//       const expected = [{ a: '1', b: '2' }, { a: '3', b: '4' }]
//       nock('http://localhost')
//         .get('/')
//         .reply(200, d3.tsvFormat(expected))
//
//       return expect(Request.tsv('http://localhost')).fulfilled
//         .then(response => {
//           delete response.columns
//           expect(response).deep.equal(expected)
//         })
//     })
//
//     it('rejects with status code other than 200', () => {
//       nock('http://localhost')
//         .get('/')
//         .reply(404)
//
//       return expect(Request.tsv('http://localhost')).rejected
//         .then(error => {
//           expect(error).equal(404)
//         })
//     })
//   })
// })

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
      expect$9(_typeof(___build_planckCore_module_js.Transferral.pack(new ArrayBuffer()))).equal('string');
    });
  });

  describe('#unpack', function () {
    it('returns array buffer', function () {
      var packed = ___build_planckCore_module_js.Transferral.pack(new ArrayBuffer());
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

}(mocha,chai,Planck,sinon));
//# sourceMappingURL=test.js.map
