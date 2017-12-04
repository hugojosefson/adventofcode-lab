import Bacon from 'baconjs'
import sum from '../../lib/sum'

const isValidPassphrase = line => line
  .split(' ')
  .reduce((acc, word) => {
    if (acc[word]) {
      acc.valid = false
    } else {
      acc[word] = true
    }
    return acc
  }, {words: {}, valid: true})
  .valid

export default input$ => input$
  .map(input => input.split('\n'))
  .map(lines => lines.filter(line => line.length))
  .flatMap(lines => Bacon.fromArray(lines))
  .filter(isValidPassphrase)
  .map(() => 1)
  .reduce(0, sum)
