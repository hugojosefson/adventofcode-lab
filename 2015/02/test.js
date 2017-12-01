/* eslint-env mocha */
import describeTestCases from '../../lib/describe-test-cases'

import silver from './silver'
import gold from './gold'

describe('2015-12-02', () => {
  describeTestCases('silver', silver, [
        ['2x3x4', 58],
        ['1x1x10', 43]
  ])
  describeTestCases('gold', gold, [
        ['2x3x4', 34],
        ['1x1x10', 14]
  ])
})
