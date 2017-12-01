/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'

import silver from './silver'
import gold from './gold'

describe('2015-12-01', () => {
  describeTestCases('silver', silver, [
            ['(())', 0],
            ['()()', 0],
            ['(((', 3],
            ['(()(()(', 3],
            ['))(((((', 3],
            ['())', -1],
            ['))(', -1],
            [')))', -3],
            [')())())', -3]
  ])
  describeTestCases('gold', gold, [
            [')', 1],
            ['()())', 5]
  ])
})
