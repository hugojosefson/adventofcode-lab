import { fromArray } from 'baconjs/dist/Bacon.noAssert'

import sum from '../../lib/sum'

const TABS_OR_SPACES = /[ \t]+/g

export default rowChecksum =>
  input$ => input$
    .map(input => input.split('\n'))
    .map(rowStrings => rowStrings.filter(rowString => rowString.length))
    .map(rowStrings => rowStrings.map(rowString => rowString.split(TABS_OR_SPACES)))
    .map(rowsOfStringArray => rowsOfStringArray.map(stringArray => stringArray.map(Number)))
    .map(rowsOfNumberArray => rowsOfNumberArray.map(rowChecksum))
    .flatMap(checksums => fromArray(checksums))
    .reduce(0, sum)
