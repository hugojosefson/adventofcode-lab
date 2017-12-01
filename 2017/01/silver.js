import Bacon from 'baconjs'
import sum from '../../lib/sum'
import lastItem from '../../lib/last-item'

export default input$ => input$
  .map(input => input.replace(/[^0-9]/g, ''))
  .map(input => input.split(''))
  .map(array => [lastItem(array), ...array])
  .flatMap(array => Bacon.fromArray(array))
  .reduce({pairs: []}, ({pairs, prev}, current) => {
    pairs.push([prev, current])
    return {pairs, prev: current}
  })
  .flatMap(({pairs}) => Bacon.fromArray(pairs))
  .filter(([prev, current]) => prev === current)
  .map(([n]) => n)
  .filter(n => !!n)
  .map(Number)
  .reduce(0, sum)
