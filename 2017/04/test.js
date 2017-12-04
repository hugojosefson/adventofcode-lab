/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'
import gold from './gold'

const input = inputFile(__dirname)

describe('2017-12-04', () => {
  describeTestCases('silver', silver, [
    ['aa bb cc dd ee', 1],
    ['aa bb cc dd aa', 0],
    ['aa bb cc dd aaa', 1],
    [input, 386, 'input']
  ])
  describeTestCases('gold', gold, [
    ['abcde fghij', 1],
    ['abcde xyz ecdab', 0],
    ['a ab abc abd abf abj', 1],
    ['iiii oiii ooii oooi oooo', 1],
    ['oiii ioii iioi iiio', 0],
    [input, 208, 'input']
  ])
})
