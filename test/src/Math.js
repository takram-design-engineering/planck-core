// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

import chai from 'chai'

import { Math as math } from '../..'

const { expect } = chai

chai.use(({ Assertion }, utils) => {
  const delta = Number.EPSILON * 2
  Assertion.addMethod('almost', function almost (expected, message) {
    const actual = utils.flag(this, 'object')
    if (!Array.isArray(actual) && !Array.isArray(expected)) {
      return this.closeTo(expected, delta, message)
    }
    actual.forEach((actual, i) => {
      new Assertion(actual).almost(expected[i], delta, message)
    })
    return this
  })
})

function vector (value) {
  return [value, value, value, value]
}

function matrix (value) {
  return [vector(value), vector(value), vector(value), vector(value)]
}

describe('Math', () => {
  describe('#lerp', () => {
    it('works', () => {
      expect(math.lerp(0, 1, 0.5)).almost(0.5)
      expect(math.lerp(0, -1, 0.5)).almost(-0.5)
    })
  })

  describe('#constrain', () => {
    it('works', () => {
      expect(math.constrain(1, 2, 3)).almost(2)
      expect(math.constrain(3, 2, 1)).almost(1)
    })
  })

  describe('#map', () => {
    it('works', () => {
      expect(math.map(0.5, 0, 1, 0, 100)).almost(50)
    })
  })

  describe('#wrap', () => {
    it('works', () => {
      expect(math.wrap(Math.PI * 2.25, 0, Math.PI)).almost(Math.PI / 4)
      expect(math.wrap(-Math.PI * 2.25, 0, Math.PI)).almost(Math.PI / 4 * 3)
    })
  })

  describe('#radians', () => {
    it('works', () => {
      expect(math.radians(180)).almost(Math.PI)
      expect(math.radians(vector(180))).almost(vector(Math.PI))
      expect(math.radians(matrix(180))).almost(matrix(Math.PI))
    })
  })

  describe('#degrees', () => {
    it('works', () => {
      expect(math.degrees(Math.PI)).almost(180)
      expect(math.degrees(vector(Math.PI))).almost(vector(180))
      expect(math.degrees(matrix(Math.PI))).almost(matrix(180))
    })
  })

  describe('#sin', () => {
    const angle = Math.random() * Math.PI
    const expected = Math.sin(angle)
    it('works', () => {
      expect(math.sin(angle)).almost(expected)
      expect(math.sin(vector(angle))).almost(vector(expected))
      expect(math.sin(matrix(angle))).almost(matrix(expected))
    })
  })

  describe('#cos', () => {
    const angle = Math.random() * Math.PI
    const expected = Math.cos(angle)
    it('works', () => {
      expect(math.cos(angle)).almost(expected)
      expect(math.cos(vector(angle))).almost(vector(expected))
      expect(math.cos(matrix(angle))).almost(matrix(expected))
    })
  })

  describe('#tan', () => {
    const angle = Math.random() * Math.PI
    const expected = Math.tan(angle)
    it('works', () => {
      expect(math.tan(angle)).almost(expected)
      expect(math.tan(vector(angle))).almost(vector(expected))
      expect(math.tan(matrix(angle))).almost(matrix(expected))
    })
  })

  describe('#asin', () => {
    const x = Math.random()
    const expected = Math.asin(x)
    it('works', () => {
      expect(math.asin(x)).almost(expected)
      expect(math.asin(vector(x))).almost(vector(expected))
      expect(math.asin(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#acos', () => {
    const x = Math.random()
    const expected = Math.acos(x)
    it('works', () => {
      expect(math.acos(x)).almost(expected)
      expect(math.acos(vector(x))).almost(vector(expected))
      expect(math.acos(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#atan(y)', () => {
    const x = Math.random() * Number.MAX_VALUE
    const expected = Math.atan(x)
    it('works', () => {
      expect(math.atan(x)).almost(expected)
      expect(math.atan(vector(x))).almost(vector(expected))
      expect(math.atan(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#atan(y, x)', () => {
    const y = Math.random()
    const x = Math.random()
    const expected = Math.atan2(y, x)
    it('works against number', () => {
      expect(math.atan(y, x)).almost(expected)
    })
    it('works against vector', () => {
      expect(math.atan(vector(y), vector(x))).almost(vector(expected))
    })
    it('works against matrix', () => {
      expect(math.atan(matrix(y), matrix(x))).almost(matrix(expected))
    })
  })

  describe('#pow', () => {
    const x = Math.random()
    const y = Math.random()
    const expected = Math.pow(x, y)
    it('works', () => {
      expect(math.pow(x, y)).almost(expected)
      expect(math.pow(vector(x), vector(y))).almost(vector(expected))
      expect(math.pow(matrix(x), matrix(y))).almost(matrix(expected))
    })
  })

  describe('#exp', () => {
    const x = Math.random()
    const expected = Math.exp(x)
    it('works', () => {
      expect(math.exp(x)).almost(expected)
      expect(math.exp(vector(x))).almost(vector(expected))
      expect(math.exp(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#log', () => {
    const x = Math.random()
    const expected = Math.log(x)
    it('works', () => {
      expect(math.log(x)).almost(expected)
      expect(math.log(vector(x))).almost(vector(expected))
      expect(math.log(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#exp2', () => {
    const x = Math.random()
    const expected = Math.pow(2, x)
    it('works', () => {
      expect(math.exp2(x)).almost(expected)
      expect(math.exp2(vector(x))).almost(vector(expected))
      expect(math.exp2(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#log2', () => {
    const x = Math.random()
    const expected = Math.log2(x)
    it('works', () => {
      expect(math.log2(x)).almost(expected)
      expect(math.log2(vector(x))).almost(vector(expected))
      expect(math.log2(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#sqrt', () => {
    const x = Math.random()
    const expected = Math.sqrt(x)
    it('works', () => {
      expect(math.sqrt(x)).almost(expected)
      expect(math.sqrt(vector(x))).almost(vector(expected))
      expect(math.sqrt(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#inversesqrt', () => {
    const x = Math.random()
    const expected = 1 / Math.sqrt(x)
    it('works', () => {
      expect(math.inversesqrt(x)).almost(expected)
      expect(math.inversesqrt(vector(x))).almost(vector(expected))
      expect(math.inversesqrt(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#abs', () => {
    const x = Math.random() - 0.5
    const expected = Math.abs(x)
    it('works', () => {
      expect(math.abs(x)).almost(expected)
      expect(math.abs(vector(x))).almost(vector(expected))
      expect(math.abs(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#sign', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.sign(x)
    it('works', () => {
      expect(math.sign(x)).almost(expected)
      expect(math.sign(vector(x))).almost(vector(expected))
      expect(math.sign(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#floor', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.floor(x)
    it('works', () => {
      expect(math.floor(x)).almost(expected)
      expect(math.floor(vector(x))).almost(vector(expected))
      expect(math.floor(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#ceil', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.ceil(x)
    it('works', () => {
      expect(math.ceil(x)).almost(expected)
      expect(math.ceil(vector(x))).almost(vector(expected))
      expect(math.ceil(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#fract', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = x - Math.floor(x)
    it('works', () => {
      expect(math.fract(x)).almost(expected)
      expect(math.fract(vector(x))).almost(vector(expected))
      expect(math.fract(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#mod', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = x % y
    it('works', () => {
      expect(math.mod(x, y)).almost(expected)
      expect(math.mod(vector(x), y)).almost(vector(expected))
      expect(math.mod(vector(x), vector(y))).almost(vector(expected))
      expect(math.mod(matrix(x), y)).almost(matrix(expected))
      expect(math.mod(matrix(x), matrix(y))).almost(matrix(expected))
    })
  })

  describe('#min', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = Math.min(x, y)
    it('works', () => {
      expect(math.min(x, y)).almost(expected)
      expect(math.min(vector(x), y)).almost(vector(expected))
      expect(math.min(vector(x), vector(y))).almost(vector(expected))
      expect(math.min(matrix(x), y)).almost(matrix(expected))
      expect(math.min(matrix(x), matrix(y))).almost(matrix(expected))
    })
  })

  describe('#max', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = Math.max(x, y)
    it('works', () => {
      expect(math.max(x, y)).almost(expected)
      expect(math.max(vector(x), y)).almost(vector(expected))
      expect(math.max(vector(x), vector(y))).almost(vector(expected))
      expect(math.max(matrix(x), y)).almost(matrix(expected))
      expect(math.max(matrix(x), matrix(y))).almost(matrix(expected))
    })
  })

  describe('#clamp', () => {
    const x = (Math.random() - 0.5) * 1000
    const min = (Math.random() - 0.5) * 1000
    const max = (Math.random() - 0.5) * 1000
    const expected = Math.min(Math.max(x, min), max)
    it('works', () => {
      expect(math.clamp(x, min, max)).almost(expected)
      expect(math.clamp(vector(x), min, max)).almost(vector(expected))
      expect(
        math.clamp(vector(x), vector(min), vector(max))
      ).almost(vector(expected))
      expect(math.clamp(matrix(x), min, max)).almost(matrix(expected))
      expect(
        math.clamp(matrix(x), matrix(min), matrix(max))
      ).almost(matrix(expected))
    })
  })

  describe('#mix', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const a = Math.random()
    const expected = x * (1 - a) + y * a
    it('works', () => {
      expect(math.mix(x, y, a)).almost(expected)
      expect(math.mix(vector(x), vector(y), a)).almost(vector(expected))
      expect(
        math.mix(vector(x), vector(y), vector(a))
      ).almost(vector(expected))
      expect(math.mix(matrix(x), matrix(y), a)).almost(matrix(expected))
      expect(
        math.mix(matrix(x), matrix(y), matrix(a))
      ).almost(matrix(expected))
    })
  })

  describe('#step', () => {
    const edge = (Math.random() - 0.5) * 1000
    const x = (Math.random() - 0.5) * 1000
    const expected = x < edge ? 0 : 1
    it('works', () => {
      expect(math.step(edge, x)).almost(expected)
      expect(math.step(edge, vector(x))).almost(vector(expected))
      expect(math.step(vector(edge), vector(x))).almost(vector(expected))
      expect(math.step(edge, matrix(x))).almost(matrix(expected))
      expect(math.step(matrix(edge), matrix(x))).almost(matrix(expected))
    })
  })

  describe('#smoothstep', () => {
    const edge0 = (Math.random() - 0.5) * 1000
    const edge1 = (Math.random() - 0.5) * 1000
    const x = (Math.random() - 0.5) * 1000
    const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
    const expected = t * t * (3 - 2 * t)
    it('works', () => {
      expect(math.smoothstep(edge0, edge1, x)).almost(expected)
      expect(
        math.smoothstep(edge0, edge1, vector(x))
      ).almost(vector(expected))
      expect(
        math.smoothstep(vector(edge0), vector(edge1), vector(x))
      ).almost(vector(expected))
      expect(
        math.smoothstep(edge0, edge1, matrix(x))
      ).almost(matrix(expected))
      expect(
        math.smoothstep(matrix(edge0), matrix(edge1), matrix(x))
      ).almost(matrix(expected))
    })
  })

  describe('#length', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const z = (Math.random() - 0.5) * 1000
    const w = (Math.random() - 0.5) * 1000
    it('works', () => {
      expect(math.length(x)).almost(Math.abs(x))
      expect(math.length([x, y]))
        .almost(Math.sqrt(x * x + y * y))
      expect(math.length([x, y, z]))
        .almost(Math.sqrt(x * x + y * y + z * z))
      expect(math.length([x, y, z, w]))
        .almost(Math.sqrt(x * x + y * y + z * z + w * w))
    })
  })

  describe('#distance', () => {
    const x1 = (Math.random() - 0.5) * 1000
    const y1 = (Math.random() - 0.5) * 1000
    const z1 = (Math.random() - 0.5) * 1000
    const w1 = (Math.random() - 0.5) * 1000
    const x2 = (Math.random() - 0.5) * 1000
    const y2 = (Math.random() - 0.5) * 1000
    const z2 = (Math.random() - 0.5) * 1000
    const w2 = (Math.random() - 0.5) * 1000
    const x = x1 - x2
    const y = y1 - y2
    const z = z1 - z2
    const w = w1 - w2
    it('works', () => {
      expect(math.distance(x1, x2)).almost(Math.abs(x))
      expect(math.distance([x1, y1], [x2, y2]))
        .almost(Math.sqrt(x * x + y * y))
      expect(math.distance([x1, y1, z1], [x2, y2, z2]))
        .almost(Math.sqrt(x * x + y * y + z * z))
      expect(math.distance([x1, y1, z1, w1], [x2, y2, z2, w2]))
        .almost(Math.sqrt(x * x + y * y + z * z + w * w))
    })
  })

  describe('#dot', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = x * y
    it('works', () => {
      expect(math.dot(x, y)).almost(expected)
      expect(math.dot([x, x], [y, y])).almost(expected * 2)
      expect(math.dot([x, y], [y, x])).almost(expected * 2)
    })
  })

  describe('#cross', () => {
    it('works', () => {
      expect(math.cross([1, 2, 3], [4, 5, 6])).almost([-3, 6, -3])
    })
  })

  describe('#normalize', () => {
    it('works', () => {
      expect(math.normalize([0, 5])).almost([0, 1])
      expect(math.normalize([0, 0, 5])).almost([0, 0, 1])
      expect(math.normalize([0, 0, 0, 5])).almost([0, 0, 0, 1])
    })
  })

  describe('#faceforward', () => {
    it('works', () => {
      expect(math.faceforward([-1, -2, -3], [-1, -1, -1])).almost([1, 2, 3])
      expect(math.faceforward([1, 2, 3], [-1, -1, -1])).almost([1, 2, 3])
      expect(math.faceforward([1, 2, 3], [1, 1, 1])).almost([-1, -2, -3])
    })
  })

  describe('#reflect', () => {
    it('works', () => {
      expect(math.reflect([1, 1, 0], [1, 0, 0])).almost([-1, 1, 0])
      expect(math.reflect([1, 1], [1, 0])).almost([-1, 1])
      expect(math.reflect([1, 1, 0, 0], [0, 1, 0, 0])).almost([1, -1, 0, 0])
    })
  })

  describe('#refract', () => {
    it('works', () => {
      expect(math.refract([1, 1], [-1, -1], 0)).almost([1, 1])
    })
  })
})
