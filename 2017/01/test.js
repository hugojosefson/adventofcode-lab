/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'

import silver from './silver'
import gold from './gold'

describe('2017-12-01', () => {
  describeTestCases('silver', silver, [
            ['1122', 3],
            ['1111', 4],
            ['1234', 0],
            ['91212129', 9]
  ])
  describeTestCases('gold', gold, [
            ['1212', 6],
            ['1221', 0],
            ['123425', 4],
            ['123123', 12],
            ['12131415', 4]
  ])
})
