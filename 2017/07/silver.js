import Bacon from 'baconjs'
import {
  LINE_REGEX,
  parseLineToNode,
  joinToTree,
  getRootKey
} from './common'

export default input$ => input$
  .map(input => input.split('\n'))
  .map(ss => ss.filter(s => s.length))
  .map(ss => ss.filter(s => LINE_REGEX.test(s)))
  .map(ss => ss.map(parseLineToNode))
  .map(ss => ss.reduce(joinToTree, {}))
  .map(tree => getRootKey(tree))
  .flatMap(result => Bacon.once(result))
