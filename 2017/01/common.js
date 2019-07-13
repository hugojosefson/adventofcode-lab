import { fromArray } from 'baconjs/dist/Bacon.noAssert'

import sum from '../../lib/sum'

export default offsetCalculator =>
  input$ => input$
    .map(input => input.replace(/[^0-9]/g, ''))
    .map(input => input.split(''))
    .map(array => array.reduce((pairs, current, index) => {
      pairs.push([current, array[offsetCalculator(index, array) % array.length]])
      return pairs
    }, []))
    .flatMap(pairs => fromArray(pairs))
    .filter(([a, b]) => a === b)
    .map(([a]) => a)
    .filter(a => !!a)
    .map(Number)
    .reduce(0, sum)
