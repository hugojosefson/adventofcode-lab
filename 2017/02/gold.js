import common from './common'

const same = (a, b) => a === b
export const evenlyDivisible = (a, b) => a / b === Math.trunc(a / b)

export const evenDivisor = dividend => possibleDivisor => !same(dividend, possibleDivisor) && evenlyDivisible(dividend, possibleDivisor)

export const evenQuotient = row => row.reduce((result, currDividend) => {
  if (result) {
    return result
  }

  const divisor = row.find(evenDivisor(currDividend))
  if (divisor) {
    return currDividend / divisor
  }
  return undefined
}, undefined)

export default common(evenQuotient)
