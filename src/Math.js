// The MIT License
// Copyright (C) 2016-Present Shota Matsuda

export function lerp (start, stop, amount) {
  return start + (stop - start) * amount
}

export function constrain (value, min, max) {
  return (value < min ? min : (value > max ? max : value))
}

export function map (value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1))
}

export function wrap (value, min, max) {
  if (value < min) {
    return max - ((min - value) % (max - min))
  }
  return min + ((value - min) % (max - min))
}

// GLSL-fravored functions

const degreesToRadians = Math.PI / 180
const radiansToDegrees = 180 / Math.PI

export function radians (degrees) {
  return degrees * degreesToRadians
}

export function degrees (radians) {
  return radians * radiansToDegrees
}

export function fract (value) {
  return value - Math.floor(value)
}

export function mod (value, divisor) {
  return value - divisor * Math.floor(value / divisor)
}

export const clamp = constrain
export const mix = lerp

export function step (edge, value) {
  return value < edge ? 0 : 1
}

export function smoothstep (edge0, edge1, value) {
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
  clamp,
  mix,
  step,
  smoothstep
}
