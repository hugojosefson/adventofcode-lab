import { fromArray } from 'baconjs/dist/Bacon.noAssert'

import sum from '../../lib/sum'

export default input$ => input$
  .flatMap(input => fromArray(input.split('\n')))
  .map(line => [line.length, line.match(/^"(.*?)"$/)])
  .filter(([originalLength, matches]) => !!matches)
  .map(([originalLength, matches]) => [originalLength, matches.splice(1)])
  .map(([originalLength, [s]]) => [originalLength, s])
  .map(([originalLength, s]) => [originalLength, s.replace(/\\\\/g, '\\')])
  .map(([originalLength, s]) => [originalLength, s.replace(/\\"/g, '"')])
  .map(([originalLength, s]) => [originalLength, s.replace(/\\x([0-9a-fA-F]{2})/g, 'X')])
  .map(([originalLength, s]) => [originalLength, s.length])
  .map(([originalLength, shorterLength]) => originalLength - shorterLength)
  .reduce(0, sum)
