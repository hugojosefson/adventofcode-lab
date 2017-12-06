/* eslint-env mocha */

import {deepEqual} from 'assert'
import describeTestCases from '../../lib/describe-test-cases'
import s from '../../lib/s'
import inputFile from '../../lib/input-file'

import {
  SEPARATOR,
  indexWithMaxValue,
  default as silver
} from './silver'

const SILVER_TEST_DATA = '0, 2, 7, and 0'
const input = inputFile(__dirname)

describe('2017-12-06', () => {
  describe('SEPARATOR', () => {
    it('separates numbers', () => {
      deepEqual(SILVER_TEST_DATA.split(SEPARATOR), ['0', '2', '7', '0'])
    })
  })
  describe('indexWithMaxValue', () => {
    [
      [[1, 2, 3], 2],
      [[3, 2, 3], 0],
      [[0, 2, 7, 0], 2]
    ].forEach(([input, expected]) => {
      it(`${s(input)} => ${expected}`, () => deepEqual(indexWithMaxValue(input), expected))
    })
  })
  describeTestCases('silver', silver, [
    [SILVER_TEST_DATA, 5],
    ['0 5 10 0 11 14 13 4 11 8 8 7 1 4 12 11', 7864],
    [input, 7864]
  ])
})
