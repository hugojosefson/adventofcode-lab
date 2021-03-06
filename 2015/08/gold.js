import Bacon from 'baconjs'
import _ from 'lodash'

import sum from '../../lib/sum'

export default input$ => input$
  .flatMap(input => Bacon.fromArray(input.split('\n')))
  .filter(_.identity)
  .map(line => [line.length, line])
  .map(([originalLength, s]) => [originalLength, s.replace(/\\/g, '\\\\')])
  .map(([originalLength, s]) => [originalLength, s.replace(/"/g, '\\"')])
  .map(([originalLength, s]) => [originalLength, `"${s}"`])
  .map(([originalLength, s]) => [originalLength, s.length])
  .map(([originalLength, longerString]) => longerString - originalLength)
  .reduce(0, sum)
