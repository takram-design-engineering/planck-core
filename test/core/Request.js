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
