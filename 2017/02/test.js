/* eslint-env mocha */

import assert from 'assert'

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import {
  evenlyDivisible,
  evenDivisor,
  evenQuotient,
  default as gold
} from './gold'
import silver from './silver'

const input = inputFile(__dirname)

describe('2017-12-02', () => {
  describe('evenlyDivisible', () => {
    [
      [[4, 2], true],
      [[6, 2], true],
      [[6, 3], true],
      [[2, 3], false],
      [[2, 4], false]
    ].forEach(([[a, b], expected]) => it(`evenlyDivisible(${a}, ${b}) === ${expected}`, () => assert.equal(evenlyDivisible(a, b), expected)))
  })

  describe('evenDivisor', () => {
    [
      [[4, 2], true],
      [[6, 2], true],
      [[6, 3], true],
      [[2, 3], false],
      [[2, 4], false],
      [[2, 2], false],
      [[4, 4], false],
      [[3, 3], false]
    ].forEach(([[a, b], expected]) => it(`evenDivisor(${a})(${b}) === ${expected}`, () => assert.equal(evenDivisor(a)(b), expected)))
  })

  describe('evenQuotient', () => {
    [
      [[5, 9, 2, 8], 4],
      [[9, 4, 7, 3], 3],
      [[2, 4, 6, 8], 2]
    ].forEach(([row, expected]) => it(`evenQuotient(${row}) === ${expected}`, () => assert.equal(evenQuotient(row), expected)))
  })
  describeTestCases('silver', silver, [
    [`5 1 9 5
7 5 3
2 4 6 8`, 18],
    [input, 42378, 'input']
  ])

  describeTestCases('gold', gold, [
    [`5 9 2 8
9 4 7 3
3 8 6 5`, 9],
    [input, 246, 'input']
  ])
})
