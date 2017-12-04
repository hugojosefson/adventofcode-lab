import Bacon from 'baconjs'
import sum from '../../lib/sum'

export default isValidPassphrase =>
  input$ => input$
    .map(input => input.split('\n'))
    .map(lines => lines.filter(line => line.length))
    .flatMap(lines => Bacon.fromArray(lines))
    .filter(isValidPassphrase)
    .map(() => 1)
    .reduce(0, sum)
