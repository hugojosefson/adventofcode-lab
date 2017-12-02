import Bacon from 'baconjs'
import sum from '../../lib/sum'

const TABS_OR_SPACES = /[ \t]+/g

const minOfArray = array => Math.min.apply(Math, array)
const maxOfArray = array => Math.max.apply(Math, array)

export default input$ => input$
  .map(input => input.split('\n'))
  .map(rowStrings => rowStrings.map(rowString => rowString.split(TABS_OR_SPACES)))
  .map(rowsOfStringArray => rowsOfStringArray.map(stringArray => stringArray.map(Number)))
  .map(rowsOfNumberArray => rowsOfNumberArray.map(numberArray => maxOfArray(numberArray) - minOfArray(numberArray)))
  .flatMap(checksums => Bacon.fromArray(checksums))
  .reduce(0, sum)
