/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'
import gold from './gold'

const input = inputFile(__dirname)

describe('2017-12-05', () => {
  describeTestCases('silver', silver, [
    [`0
3
0
1
-3`, 5],
    [input, 374269, 'input']
  ])
  describeTestCases('gold', gold, [
    [`0
3
0
1
-3`, 10],
    [input, 27720699, 'input']
  ])
})
