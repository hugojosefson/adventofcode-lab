/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'

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
})
