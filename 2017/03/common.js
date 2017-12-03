import Bacon from 'baconjs'
const {sqrt, floor, pow} = Math

export const widthOfSquare = n => (floor(sqrt(n) / 2 + 0.5) - 1) * 2 + 1
export const maxInSquare = n => pow(widthOfSquare(n), 2)
export const isMaxInSquare = n => n === maxInSquare(n)
export const taxiDistanceOfMaxInSquare = n => widthOfSquare(n) - 1
export const snakeLengthSinceSquareCorner = n => n - maxInSquare(n)
export const snakeLengthSinceAnyCorner = n => snakeLengthSinceSquareCorner(n) % (widthOfSquare(n) + 1)
export const middleOfSquare = n => (widthOfSquare(n) + 1) / 2
export const movingTowardsMiddle = n => snakeLengthSinceAnyCorner(n) <= middleOfSquare(n)

const taxiDistance = n => {
  if (isMaxInSquare(n)) {
    return taxiDistanceOfMaxInSquare(n)
  }

  if (movingTowardsMiddle(n)) {
    return taxiDistanceOfMaxInSquare(n) + 2 - snakeLengthSinceAnyCorner(n)
  } else {
    return taxiDistanceOfMaxInSquare(n) + snakeLengthSinceAnyCorner(n) - middleOfSquare(n) - floor((widthOfSquare(n) - 3) / 2)
  }
}

export default () =>
  input$ => input$
    .map(Number)
    .map(taxiDistance)
    .flatMap(result => Bacon.once(result))
