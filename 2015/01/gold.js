import { fromArray } from 'baconjs/dist/Bacon.noAssert'

export default input$ => input$
  .flatMap(input => fromArray(input.split('')))
  .filter(char => char === '(' || char === ')')
  .map(char => char === '(' ? 1 : char)
  .map(char => char === ')' ? -1 : char)
  .scan(0, (floor, direction) => floor + direction)
  .takeWhile(floor => floor > -1)
  .reduce(0, (pos, floor) => pos + 1)
