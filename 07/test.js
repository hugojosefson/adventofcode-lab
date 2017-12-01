/* eslint-env mocha */
import fs from 'fs'
import path from 'path'
import describeTestCases from '../lib/describe-test-cases'
import describeSimpleTestCases from '../lib/describe-simple-test-cases'

import jsExpression from './js-expression'
import silver from './silver'
import gold from './gold'

describe('07', () => {
  describeSimpleTestCases('js-expression', jsExpression, [
        ['123', '123'],
        ['x', '_x()'],
        ['xy', '_xy()'],
        ['x yd', '_x() _yd()'],
        ['x AND y', '_x() & _y()'],
        ['x OR y', '_x() | _y()'],
        ['x RSHIFT 2', '_x() >> 2'],
        ['x RSHIFT y', '_x() >> _y()'],
        ['x LSHIFT 13', '_x() << 13'],
        ['NOT x', '~ _x()']
  ])

  describeTestCases('silver', silver, [
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 46065, 'input']
  ])

  describeTestCases('gold', gold, [
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 14134, 'input']
  ])
})
