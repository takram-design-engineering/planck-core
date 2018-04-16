// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export function lerp (start, stop, amount) {
  return start + (stop - start) * amount
}

export function constrain (x, min, max) {
  return x < min ? min : (x > max ? max : x)
}

export function map (x, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((x - min1) / (max1 - min1))
}

export function wrap (x, min, max) {
  if (x < min) {
    return max - ((min - x) % (max - min))
  }
  return min + ((x - min) % (max - min))
}

// GLSL functions

export function radians (degrees) {
  if (Array.isArray(degrees)) {
    return degrees.map(radians)
  }
  return degrees * 0.017453292519943295
}

export function degrees (radians) {
  if (Array.isArray(radians)) {
    return radians.map(degrees)
  }
  return radians * 57.29577951308232
}

export function sin (angle) {
  if (Array.isArray(angle)) {
    return angle.map(sin)
  }
  return Math.sin(angle)
}

export function cos (angle) {
  if (Array.isArray(angle)) {
    return angle.map(cos)
  }
  return Math.cos(angle)
}

export function tan (angle) {
  if (Array.isArray(angle)) {
    return angle.map(tan)
  }
  return Math.tan(angle)
}

export function asin (x) {
  if (Array.isArray(x)) {
    return x.map(asin)
  }
  return Math.asin(x)
}

export function acos (x) {
  if (Array.isArray(x)) {
    return x.map(acos)
  }
  return Math.acos(x)
}

export function atan (y, x) {
  if (x != null) {
    if (Array.isArray(y)) {
      return y.map((y, i) => atan(y, x[i]))
    }
    return Math.atan2(y, x)
  }
  if (Array.isArray(y)) {
    return y.map(y => atan(y))
  }
  return Math.atan(y)
}

export function pow (x, y) {
  if (Array.isArray(x)) {
    return x.map((x, i) => pow(x, y[i]))
  }
  return Math.pow(x, y)
}

export function exp (x) {
  if (Array.isArray(x)) {
    return x.map(exp)
  }
  return Math.exp(x)
}

export function log (x) {
  if (Array.isArray(x)) {
    return x.map(log)
  }
  return Math.log(x)
}

export function exp2 (x) {
  if (Array.isArray(x)) {
    return x.map(exp2)
  }
  return Math.pow(2, x)
}

export function log2 (x) {
  if (Array.isArray(x)) {
    return x.map(log2)
  }
  return Math.log2(x)
}

export function sqrt (x) {
  if (Array.isArray(x)) {
    return x.map(sqrt)
  }
  return Math.sqrt(x)
}

export function inversesqrt (x) {
  if (Array.isArray(x)) {
    return x.map(inversesqrt)
  }
  return 1 / Math.sqrt(x)
}

export function abs (x) {
  if (Array.isArray(x)) {
    return x.map(abs)
  }
  return Math.abs(x)
}

export function sign (x) {
  if (Array.isArray(x)) {
    return x.map(sign)
  }
  return Math.sign(x)
}

export function floor (x) {
  if (Array.isArray(x)) {
    return x.map(floor)
  }
  return Math.floor(x)
}

export function ceil (x) {
  if (Array.isArray(x)) {
    return x.map(ceil)
  }
  return Math.ceil(x)
}

export function fract (x) {
  if (Array.isArray(x)) {
    return x.map(fract)
  }
  return x - Math.floor(x)
}

export function mod (x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map((x, i) => mod(x, y[i]))
    }
    return x.map(x => mod(x, y))
  }
  return x % y
}

export function min (x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map((x, i) => min(x, y[i]))
    }
    return x.map(x => min(x, y))
  }
  return Math.min(x, y)
}

export function max (x, y) {
  if (Array.isArray(x)) {
    if (Array.isArray(y)) {
      return x.map((x, i) => max(x, y[i]))
    }
    return x.map(x => max(x, y))
  }
  return Math.max(x, y)
}

export function clamp (x, min, max) {
  if (Array.isArray(x)) {
    if (Array.isArray(min)) {
      return x.map((x, i) => clamp(x, min[i], max[i]))
    }
    return x.map(x => clamp(x, min, max))
  }
  return Math.min(Math.max(x, min), max)
}

export function mix (x, y, a) {
  if (Array.isArray(x)) {
    if (Array.isArray(a)) {
      return x.map((x, i) => mix(x, y[i], a[i]))
    }
    return x.map((x, i) => mix(x, y[i], a))
  }
  return x * (1 - a) + y * a
}

export function step (edge, x) {
  if (Array.isArray(x)) {
    if (Array.isArray(edge)) {
      return x.map((x, i) => step(edge[i], x))
    }
    return x.map(x => step(edge, x))
  }
  return x < edge ? 0 : 1
}

export function smoothstep (edge0, edge1, x) {
  if (Array.isArray(x)) {
    if (Array.isArray(edge0)) {
      return x.map((x, i) => smoothstep(edge0[i], edge1[i], x))
    }
    return x.map(x => smoothstep(edge0, edge1, x))
  }
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

export function length (x) {
  if (!Array.isArray(x)) {
    return Math.abs(x)
  }
  return Math.sqrt(x.reduce((sum, x) => sum + x * x, 0))
}

export function distance (x, y) {
  if (!Array.isArray(x)) {
    return Math.abs(x - y)
  }
  return Math.sqrt(x.reduce((sum, x, i) => sum + (x - y[i]) * (x - y[i]), 0))
}

export function dot (x, y) {
  if (!Array.isArray(x)) {
    return x * y
  }
  return x.reduce((sum, x, i) => sum + x * y[i], 0)
}

export function cross (x, y) {
  const [x0, x1, x2] = x
  const [y0, y1, y2] = y
  return [
    x1 * y2 - x2 * y1,
    x2 * y0 - x0 * y2,
    x0 * y1 - x1 * y0
  ]
}

export function normalize (x) {
  const length = x.reduce((sum, x) => sum + x * x, 0)
  if (length > 0) {
    const coeff = 1 / Math.sqrt(length)
    return x.map(x => x * coeff)
  }
  return Array(x.length).fill(0)
}

export function faceforward (N, I, Nref) {
  if (Nref == null) {
    Nref = N
  }
  const dot = Nref.reduce((sum, x, i) => sum + x * I[i], 0)
  return dot < 0 ? N : N.map(x => -x)
}

export function reflect (I, N) {
  const dot = N.reduce((sum, x, i) => sum + x * I[i], 0)
  return N.map((x, i) => I[i] - 2 * dot * x)
}

export function refract (I, N, eta) {
  const dot = N.reduce((sum, x, i) => sum + x * I[i], 0)
  const k = 1 - eta * eta * (1 - dot * dot)
  if (k > 0) {
    const coeff = eta * dot + Math.sqrt(k)
    return N.map((x, i) => eta * I[i] - coeff * x)
  }
  return Array(N.length).fill(0)
}

export default {
  lerp,
  constrain,
  map,
  wrap,
  radians,
  degrees,
  sin,
  cos,
  tan,
  asin,
  acos,
  atan,
  pow,
  exp,
  log,
  exp2,
  log2,
  sqrt,
  inversesqrt,
  abs,
  sign,
  floor,
  ceil,
  fract,
  mod,
  min,
  max,
  clamp,
  mix,
  step,
  smoothstep,
  length,
  distance,
  dot,
  cross,
  normalize,
  faceforward,
  reflect,
  refract
}
