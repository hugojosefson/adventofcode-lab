/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'
// import gold from './gold'

const input = inputFile(__dirname)

describe('2017-12-02', () => {
  describeTestCases('silver', silver, [
    [`5 1 9 5
7 5 3
2 4 6 8`, 18],
    [input, 42378, 'input']
  ])
})
