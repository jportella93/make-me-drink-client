/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 */
export default function getRandomInt (min, max) {
  const roundedMin = Math.ceil(min)
  const roundedMax = Math.floor(max)
  return Math.floor(Math.random() * (roundedMax - roundedMin + 1)) + roundedMin
}
