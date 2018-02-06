// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

function lerp(start, stop, amount) {
  return start + (stop - start) * amount
}

function constrain(value, min, max) {
  return (value < min ? min : (value > max ? max : value))
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
}

function wrap(value, min, max) {
  if (value < min) {
    return max - ((min - value) % (max - min))
  }
  return min + ((value - min) % (max - min))
}

// GLSL functions

const RADIANS = Math.PI / 180
const DEGREES = 180 / Math.PI

function radians(degrees) {
  return degrees * RADIANS
}

function degrees(radians) {
  return radians * DEGREES
}

function fract(value) {
  return value - Math.floor(value)
}

function mod(value, divisor) {
  return value - divisor * Math.floor(value / divisor)
}

function step(edge, value) {
  return value < edge ? 0 : 1
}

function smoothstep(edge0, edge1, value) {
  const t = constrain((value - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

export default {
  lerp,
  constrain,
  map,
  wrap,
  radians,
  degrees,
  fract,
  mod,
  step,
  smoothstep,
}
