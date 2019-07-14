import Bacon from 'baconjs'
import _ from 'lodash'

export default input$ => input$
  .flatMap(input => Bacon.fromArray(input.split('')))
  .map(char => {
    if (char === '^') return { x: 0, y: 1 }
    if (char === 'v') return { x: 0, y: -1 }
    if (char === '>') return { x: 1, y: 0 }
    if (char === '<') return { x: -1, y: 0 }
  })
  .reduce([[0, 0], [0, 0], { '0:0': true }], ([[x, y], other, houses], direction) => {
    const newX = x + direction.x
    const newY = y + direction.y
    houses[`${newX}:${newY}`] = true
    return [other, [newX, newY], houses]
  })
  .map(([[x, y], other, houses]) => houses)
  .map(_.toPairs)
  .map('.length')
