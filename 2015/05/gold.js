import { fromArray } from 'baconjs/dist/Bacon.noAssert'

import count from '../../lib/count'

export default input$ => input$
  .flatMap(input => fromArray(input.split('\n')))
  .filter(line => (/([a-z]{2,}).*\1/).test(line))
  .filter(line => (/([a-z])[a-z]\1/).test(line))
  .reduce(0, count)
