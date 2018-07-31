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
    it('returns 0.5 where lerp(0, 1, 0.5)', () => {
      expect(math.lerp(0, 1, 0.5)).almost(0.5)
    })

    it('returns 0.5 where lerp(0, -1, 0.5)', () => {
      expect(math.lerp(0, -1, 0.5)).almost(-0.5)
    })
  })

  describe('#constrain', () => {
    it('returns 2 where constrain(1, 2, 3)', () => {
      expect(math.constrain(1, 2, 3)).equal(2)
    })

    it('returns 1 where constrain(3, 2, 1)', () => {
      expect(math.constrain(3, 2, 1)).equal(1)
    })

    it('returns 2 where constrain(2, 1, 3)', () => {
      expect(math.constrain(2, 1, 3)).equal(2)
    })
  })

  describe('#map', () => {
    it('returns 50 where map(0.5, 0, 1, 0, 100)', () => {
      expect(math.map(0.5, 0, 1, 0, 100)).almost(50)
    })
  })

  describe('#wrap', () => {
    it('returns 1/4π where wrap(2.25π, 0, π)', () => {
      expect(math.wrap(Math.PI * 2.25, 0, Math.PI)).almost(Math.PI / 4)
    })

    it('returns -3/4π where wrap(-2.25π, 0, π)', () => {
      expect(math.wrap(-Math.PI * 2.25, 0, Math.PI)).almost(Math.PI / 4 * 3)
    })
  })

  describe('#radians', () => {
    const x = 180
    const expected = Math.PI

    it('returns π where radians(180)', () => {
      expect(math.radians(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.radians(vector(x))).almost(vector(expected))
      expect(math.radians(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#degrees', () => {
    const x = Math.PI
    const expected = 180

    it('returns 180 where radians(π)', () => {
      expect(math.degrees(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.degrees(vector(x))).almost(vector(expected))
      expect(math.degrees(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#sin', () => {
    const x = Math.random() * Math.PI
    const expected = Math.sin(x)

    it('returns Math.sin(x)', () => {
      expect(math.sin(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.sin(vector(x))).almost(vector(expected))
      expect(math.sin(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#cos', () => {
    const x = Math.random() * Math.PI
    const expected = Math.cos(x)

    it('returns Math.cos(x)', () => {
      expect(math.cos(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.cos(vector(x))).almost(vector(expected))
      expect(math.cos(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#tan', () => {
    const x = Math.random() * Math.PI
    const expected = Math.tan(x)

    it('returns Math.tan(x)', () => {
      expect(math.tan(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.tan(vector(x))).almost(vector(expected))
      expect(math.tan(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#asin', () => {
    const x = Math.random()
    const expected = Math.asin(x)

    it('returns Math.asin(x)', () => {
      expect(math.asin(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.asin(vector(x))).almost(vector(expected))
      expect(math.asin(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#acos', () => {
    const x = Math.random()
    const expected = Math.acos(x)

    it('returns Math.acos(x)', () => {
      expect(math.acos(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.acos(vector(x))).almost(vector(expected))
      expect(math.acos(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#atan(y)', () => {
    const x = Math.random() * Number.MAX_VALUE
    const expected = Math.atan(x)

    it('returns Math.atan(x)', () => {
      expect(math.atan(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.atan(vector(x))).almost(vector(expected))
      expect(math.atan(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#atan(y, x)', () => {
    const y = Math.random()
    const x = Math.random()
    const expected = Math.atan2(y, x)

    it('returns Math.atan2(y, x)', () => {
      expect(math.atan(y, x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.atan(vector(y), vector(x))).almost(vector(expected))
      expect(math.atan(matrix(y), matrix(x))).almost(matrix(expected))
    })
  })

  describe('#pow', () => {
    const x = Math.random()
    const y = Math.random()
    const expected = Math.pow(x, y)

    it('returns Math.pow(x, y)', () => {
      expect(math.pow(x, y)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.pow(vector(x), vector(y))).almost(vector(expected))
      expect(math.pow(matrix(x), matrix(y))).almost(matrix(expected))
    })
  })

  describe('#exp', () => {
    const x = Math.random()
    const expected = Math.exp(x)

    it('returns Math.exp(x)', () => {
      expect(math.exp(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.exp(vector(x))).almost(vector(expected))
      expect(math.exp(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#log', () => {
    const x = Math.random()
    const expected = Math.log(x)

    it('returns Math.log(x)', () => {
      expect(math.log(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.log(vector(x))).almost(vector(expected))
      expect(math.log(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#exp2', () => {
    const x = Math.random()
    const expected = math.pow(2, x)

    it('returns pow(2, x)', () => {
      expect(math.exp2(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.exp2(vector(x))).almost(vector(expected))
      expect(math.exp2(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#log2', () => {
    const x = Math.random()
    const expected = Math.log2(x)

    it('returns Math.log2(x)', () => {
      expect(math.log2(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.log2(vector(x))).almost(vector(expected))
      expect(math.log2(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#sqrt', () => {
    const x = Math.random()
    const expected = Math.sqrt(x)

    it('returns Math.sqrt(x)', () => {
      expect(math.sqrt(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.sqrt(vector(x))).almost(vector(expected))
      expect(math.sqrt(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#inversesqrt', () => {
    const x = Math.random()
    const expected = 1 / math.sqrt(x)

    it('returns (1 / sqrt(x))', () => {
      expect(math.inversesqrt(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.inversesqrt(vector(x))).almost(vector(expected))
      expect(math.inversesqrt(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#abs', () => {
    const x = Math.random() - 0.5
    const expected = Math.abs(x)

    it('returns Math.abs(x)', () => {
      expect(math.abs(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.abs(vector(x))).almost(vector(expected))
      expect(math.abs(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#sign', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.sign(x)

    it('returns Math.sign(x)', () => {
      expect(math.sign(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.sign(vector(x))).almost(vector(expected))
      expect(math.sign(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#floor', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.floor(x)

    it('returns Math.floor(x)', () => {
      expect(math.floor(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.floor(vector(x))).almost(vector(expected))
      expect(math.floor(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#ceil', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = Math.ceil(x)

    it('returns Math.ceil(x)', () => {
      expect(math.ceil(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.ceil(vector(x))).almost(vector(expected))
      expect(math.ceil(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#fract', () => {
    const x = (Math.random() - 0.5) * 1000
    const expected = x - math.floor(x)

    it('returns (x - floor(x))', () => {
      expect(math.fract(x)).almost(expected)
    })

    it('supports vector and matrix', () => {
      expect(math.fract(vector(x))).almost(vector(expected))
      expect(math.fract(matrix(x))).almost(matrix(expected))
    })
  })

  describe('#mod', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = x % y

    it('returns (x % y)', () => {
      expect(math.mod(x, y)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
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

    it('returns Math.min(x, y)', () => {
      expect(math.min(x, y)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
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

    it('returns Math.max(x, y)', () => {
      expect(math.max(x, y)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
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
    const expected = math.min(math.max(x, min), max)

    it('returns min(max(x, min), max) where clamp(x, min, max)', () => {
      expect(math.clamp(x, min, max)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
      expect(math.clamp(vector(x), min, max)).almost(vector(expected))
      expect(math.clamp(vector(x), vector(min), vector(max)))
        .almost(vector(expected))
      expect(math.clamp(matrix(x), min, max)).almost(matrix(expected))
      expect(math.clamp(matrix(x), matrix(min), matrix(max)))
        .almost(matrix(expected))
    })
  })

  describe('#mix', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const a = Math.random()
    const expected = x * (1 - a) + y * a

    it('returns (x * (1 - a) + y * a) where mix(x, y, a)', () => {
      expect(math.mix(x, y, a)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
      expect(math.mix(vector(x), vector(y), a)).almost(vector(expected))
      expect(math.mix(vector(x), vector(y), vector(a)))
        .almost(vector(expected))
      expect(math.mix(matrix(x), matrix(y), a)).almost(matrix(expected))
      expect(math.mix(matrix(x), matrix(y), matrix(a)))
        .almost(matrix(expected))
    })
  })

  describe('#step', () => {
    const edge = (Math.random() - 0.5) * 1000
    const x = (Math.random() - 0.5) * 1000
    const expected = x < edge ? 0 : 1

    it('returns (x < edge ? 0 : 1) where step(edge, x)', () => {
      expect(math.step(edge, x)).almost(expected)
    })

    it('returns 0 where step(1, 0)', () => {
      expect(math.step(1, 0)).almost(0)
    })

    it('returns 0 where step(0, 1)', () => {
      expect(math.step(0, 1)).almost(1)
    })

    it('supports element-wise vector and matrix', () => {
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

    it([
      'returns (t * t * (3 - 2 * t))',
      'where t = min(max(x - edge0) / (edge1 - edge0), 0), 1)',
      'and smoothstep(edge0, edge1, x)'
    ].join(' '), () => {
      expect(math.smoothstep(edge0, edge1, x)).almost(expected)
    })

    it('supports element-wise vector and matrix', () => {
      expect(math.smoothstep(edge0, edge1, vector(x)))
        .almost(vector(expected))
      expect(math.smoothstep(vector(edge0), vector(edge1), vector(x)))
        .almost(vector(expected))
      expect(math.smoothstep(edge0, edge1, matrix(x)))
        .almost(matrix(expected))
      expect(math.smoothstep(matrix(edge0), matrix(edge1), matrix(x)))
        .almost(matrix(expected))
    })
  })

  describe('#length', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const z = (Math.random() - 0.5) * 1000
    const w = (Math.random() - 0.5) * 1000

    it('returns sqrt(a1 ** 2 + a2 ** 2 + ...)', () => {
      expect(math.length(x))
        .almost(math.sqrt(x * x))
      expect(math.length([x, y]))
        .almost(math.sqrt(x * x + y * y))
      expect(math.length([x, y, z]))
        .almost(math.sqrt(x * x + y * y + z * z))
      expect(math.length([x, y, z, w]))
        .almost(math.sqrt(x * x + y * y + z * z + w * w))
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

    it('returns sqrt((a1 - b1) ** 2 + (a2 - b2) ** 2 + ...)', () => {
      expect(math.distance(x1, x2))
        .almost(math.sqrt(x * x))
      expect(math.distance([x1, y1], [x2, y2]))
        .almost(math.sqrt(x * x + y * y))
      expect(math.distance([x1, y1, z1], [x2, y2, z2]))
        .almost(math.sqrt(x * x + y * y + z * z))
      expect(math.distance([x1, y1, z1, w1], [x2, y2, z2, w2]))
        .almost(math.sqrt(x * x + y * y + z * z + w * w))
    })
  })

  describe('#dot', () => {
    const x = (Math.random() - 0.5) * 1000
    const y = (Math.random() - 0.5) * 1000
    const expected = x * y

    it('returns dot product', () => {
      expect(math.dot(x, y)).almost(expected)
      expect(math.dot([x, x], [y, y])).almost(expected * 2)
      expect(math.dot([x, y], [y, x])).almost(expected * 2)
    })
  })

  describe('#cross', () => {
    it('returns cross product', () => {
      expect(math.cross([1, 2, 3], [4, 5, 6])).almost([-3, 6, -3])
    })
  })

  describe('#normalize', () => {
    it([
      'returns [0, 1]',
      'where normalize([0, 5])'
    ].join(' '), () => {
      expect(math.normalize([0, 5])).almost([0, 1])
    })

    it([
      'returns [0, 0, 1]',
      'where normalize([0, 0, 5])'
    ].join(' '), () => {
      expect(math.normalize([0, 0, 5])).almost([0, 0, 1])
    })

    it([
      'returns [0, 0, 0, 1]',
      'where normalize([0, 0, 0, 5])'
    ].join(' '), () => {
      expect(math.normalize([0, 0, 0, 5])).almost([0, 0, 0, 1])
    })

    it('returns zeros for zero-length vector and matrix', () => {
      expect(math.normalize([0, 0])).almost([0, 0])
      expect(math.normalize([0, 0, 0])).almost([0, 0, 0])
      expect(math.normalize([0, 0, 0, 0])).almost([0, 0, 0, 0])
    })
  })

  describe('#faceforward', () => {
    it([
      'returns [1, 2, 3]',
      'where faceforward([-1, -2, -3], [-1, -1, -1])'
    ].join(' '), () => {
      expect(math.faceforward([-1, -2, -3], [-1, -1, -1])).almost([1, 2, 3])
    })

    it([
      'returns [1, 2, 3]',
      'where faceforward([1, 2, 3], [-1, -1, -1])'
    ].join(' '), () => {
      expect(math.faceforward([1, 2, 3], [-1, -1, -1])).almost([1, 2, 3])
    })

    it([
      'returns [-1, -2, -3]',
      'where faceforward([1, 2, 3], [1, 1, 1])'
    ].join(' '), () => {
      expect(math.faceforward([1, 2, 3], [1, 1, 1])).almost([-1, -2, -3])
    })
  })

  describe('#reflect', () => {
    it([
      'returns [-1, 1, 0]',
      'where reflect([1, 1, 0], [1, 0, 0])'
    ].join(' '), () => {
      expect(math.reflect([1, 1, 0], [1, 0, 0])).almost([-1, 1, 0])
    })

    it([
      'returns [-1, 1]',
      'where reflect([1, 1], [1, 0])'
    ].join(' '), () => {
      expect(math.reflect([1, 1], [1, 0])).almost([-1, 1])
    })

    it([
      'returns [1, -1, 0, 0]',
      'where reflect([1, 1, 0, 0], [0, 1, 0, 0])'
    ].join(' '), () => {
      expect(math.reflect([1, 1, 0, 0], [0, 1, 0, 0])).almost([1, -1, 0, 0])
    })
  })

  describe('#refract', () => {
    it('returns [1, 1] where refract([1, 1], [-1, -1], 0)', () => {
      expect(math.refract([1, 1], [-1, -1], 0)).almost([1, 1])
    })

    it('returns [0, 0] where refract([0, 0], [0, 0], 1)', () => {
      expect(math.refract([0, 0], [0, 0], 1)).almost([0, 0])
    })
  })
})
