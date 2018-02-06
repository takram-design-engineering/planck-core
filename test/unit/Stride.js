// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import 'source-map-support/register'

import chai from 'chai'

import { Stride } from '../..'

const { expect } = chai

describe('Stride', () => {
  describe('#forEach', () => {
    it('works with stride of 2', () => {
      {
        const array = [0, 'a', 1, 'b', 2, 'c']
        let i = 0
        Stride.forEach(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
        })
        expect(i).equal(3)
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5])
        let i = 0
        Stride.forEach(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
        })
        expect(i).equal(3)
      }
    })

    it('works with stride of 3', () => {
      {
        const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C']
        let i = 0
        Stride.forEach(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
        })
        expect(i).equal(3)
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
        let i = 0
        Stride.forEach(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
        })
        expect(i).equal(3)
      }
    })

    it('skips residue of stride', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C', 3]
      let i = 0
      Stride.forEach(array, 3, (values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
      })
      expect(i).equal(3)
    })
  })

  describe('#some', () => {
    it('works with stride of 2', () => {
      {
        const array = [0, 'a', 1, 'b', 2, 'c']
        let i = 0
        const result = Stride.some(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return true
          }
          return false
        })
        expect(i).equal(2)
        expect(result).true
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5])
        let i = 0
        const result = Stride.some(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return true
          }
          return false
        })
        expect(i).equal(2)
        expect(result).true
      }
    })

    it('works with stride of 3', () => {
      {
        const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C']
        let i = 0
        const result = Stride.some(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return true
          }
          return false
        })
        expect(i).equal(2)
        expect(result).true
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
        let i = 0
        const result = Stride.some(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return true
          }
          return false
        })
        expect(i).equal(2)
        expect(result).true
      }
    })

    it('skips residue of stride', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C', 3]
      let i = 0
      const result = Stride.some(array, 3, (values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
        return false
      })
      expect(i).equal(3)
      expect(result).false
    })
  })

  describe('#every', () => {
    it('works with stride of 2', () => {
      {
        const array = [0, 'a', 1, 'b', 2, 'c']
        let i = 0
        const result = Stride.every(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return false
          }
          return true
        })
        expect(i).equal(2)
        expect(result).false
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5])
        let i = 0
        const result = Stride.every(array, 2, (values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return false
          }
          return true
        })
        expect(i).equal(2)
        expect(result).false
      }
    })

    it('works with stride of 3', () => {
      {
        const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C']
        let i = 0
        const result = Stride.every(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return false
          }
          return true
        })
        expect(i).equal(2)
        expect(result).false
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
        let i = 0
        const result = Stride.every(array, 3, (values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          if (index === 1) {
            return false
          }
          return true
        })
        expect(i).equal(2)
        expect(result).false
      }
    })

    it('skips residue of stride', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C', 3]
      let i = 0
      const result = Stride.every(array, 3, (values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
        return true
      })
      expect(i).equal(3)
      expect(result).true
    })
  })

  describe('#reduce', () => {
    it('works with stride of 2', () => {
      {
        const array = [0, 'a', 1, 'b', 2, 'c']
        let i = 0
        const result = Stride.reduce(array, 2, (reduced, values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          return [...reduced, a]
        }, [])
        expect(i).equal(3)
        expect(result).deep.equal([0, 1, 2])
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5])
        let i = 0
        const result = Stride.reduce(array, 2, (reduced, values, index) => {
          const [a, b] = values
          expect(a).equal(array[i * 2 + 0])
          expect(b).equal(array[i * 2 + 1])
          expect(index).equal(i)
          ++i
          return [...reduced, a]
        }, [])
        expect(i).equal(3)
        expect(result).deep.equal([0, 2, 4])
      }
    })

    it('works with stride of 3', () => {
      {
        const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C']
        let i = 0
        const result = Stride.reduce(array, 3, (reduced, values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          return [...reduced, a]
        }, [])
        expect(i).equal(3)
        expect(result).deep.equal([0, 1, 2])
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
        let i = 0
        const result = Stride.reduce(array, 3, (reduced, values, index) => {
          const [a, b, c] = values
          expect(a).equal(array[i * 3 + 0])
          expect(b).equal(array[i * 3 + 1])
          expect(c).equal(array[i * 3 + 2])
          expect(index).equal(i)
          ++i
          return [...reduced, a]
        }, [])
        expect(i).equal(3)
        expect(result).deep.equal([0, 3, 6])
      }
    })

    it('skips residue of stride', () => {
      const array = [0, 'a', 'A', 1, 'b', 'B', 2, 'c', 'C', 3]
      let i = 0
      const result = Stride.reduce(array, 3, (reduced, values, index) => {
        const [a, b, c] = values
        expect(a).equal(array[i * 3 + 0])
        expect(b).equal(array[i * 3 + 1])
        expect(c).equal(array[i * 3 + 2])
        expect(index).equal(i)
        ++i
        return [...reduced, a]
      }, [])
      expect(i).equal(3)
      expect(result).deep.equal([0, 1, 2])
    })
  })

  describe('#set', () => {
    it('works with stride of 2', () => {
      {
        const array = Array(6).fill(null)
        const item = [0, 'a']
        const result = Stride.set(array, 2, item)
        expect(result).deep.equal([0, 'a', 0, 'a', 0, 'a'])
      }
      {
        const array = new Uint8Array(6)
        const item = new Uint8Array([0, 1])
        const result = Stride.set(array, 2, item)
        expect(Array.from(result)).deep.equal([0, 1, 0, 1, 0, 1])
      }
    })

    it('works with stride of 3', () => {
      {
        const array = Array(9).fill(null)
        const item = [0, 'a', 'A']
        const result = Stride.set(array, 3, item)
        expect(result).deep.equal([0, 'a', 'A', 0, 'a', 'A', 0, 'a', 'A'])
      }
      {
        const array = new Uint8Array(9)
        const item = new Uint8Array([0, 1, 2])
        const result = Stride.set(array, 3, item)
        expect(Array.from(result)).deep.equal([0, 1, 2, 0, 1, 2, 0, 1, 2])
      }
    })

    it('skips residue of stride', () => {
      const array = Array(8).fill(null)
      const item = [0, 'a', 'A']
      const result = Stride.set(array, 3, item)
      expect(result).deep.equal([0, 'a', 'A', 0, 'a', 'A', null, null])
    })
  })

  describe('#transform', () => {
    it('works with stride of 2', () => {
      {
        const array = [0, 1, 2, 3, 4, 5]
        const result = Stride.transform(array, 2, (values, index) => {
          return [values[0] + index, values[1] + index]
        })
        expect(result).deep.equal([0, 1, 3, 4, 6, 7])
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5])
        const result = Stride.transform(array, 2, (values, index) => {
          return [values[0] + index, values[1] + index]
        })
        expect(Array.from(result)).deep.equal([0, 1, 3, 4, 6, 7])
      }
    })

    it('works with stride of 3', () => {
      {
        const array = [0, 1, 2, 3, 4, 5, 6, 7, 8]
        const result = Stride.transform(array, 3, (values, index) => {
          return [values[0] + index, values[1] + index, values[2] + index]
        })
        expect(result).deep.equal([0, 1, 2, 4, 5, 6, 8, 9, 10])
      }
      {
        const array = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8])
        const result = Stride.transform(array, 3, (values, index) => {
          return [values[0] + index, values[1] + index, values[2] + index]
        })
        expect(Array.from(result)).deep.equal([0, 1, 2, 4, 5, 6, 8, 9, 10])
      }
    })

    it('skips residue of stride', () => {
      const array = [0, 1, 2, 3, 4, 5, 6, 7]
      const result = Stride.transform(array, 3, (values, index) => {
        return [values[0] + index, values[1] + index, values[2] + index]
      })
      expect(result).deep.equal([0, 1, 2, 4, 5, 6, 6, 7])
    })
  })
})
