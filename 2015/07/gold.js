import Bacon from 'baconjs'
import _ from 'lodash'
import _eval from 'eval'

import jsExpression from './js-expression'

export default input$ => input$
  .flatMap(input => Bacon.fromArray(input.split('\n')))
  .map(line => line.match(/^(.+?)->(.+)$/))
  .filter(_.identity)
  .map(matches => matches.splice(1))
  .map(([expression, name]) => [expression.trim(), name.trim()])
  .map(([expression, name]) => [jsExpression(expression), name])
  .map(([jsExpression, name]) => `var _${name} = memoize(function() { return (${jsExpression}) & 0xffff;});`)
  .reduce([], (array, statement) => {
    array.push(statement)
    return array
  })
  .map(array => {
    array.unshift(`var memoize = require('lodash').memoize;`)
    array.push('_b = function(){return 46065;};')
    array.push('module.exports = _a()')
    return array
  })
  .map(array => array.join('\n'))
  .map(js => _eval(js, 'day07', { require }))
