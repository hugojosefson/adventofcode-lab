/* eslint-env mocha */

import assert from 'assert'

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver, {
  widthOfSquare,
  snakeLengthSinceSquareCorner,
  snakeLengthSinceAnyCorner,
  movingTowardsMiddle,
  isMaxInSquare
} from './silver'

import gold, { intermediate as intermediateGold } from './gold'

const input = inputFile(__dirname)

describe('2017-12-03', () => {
  describe('widthOfSquare', () => {
    [
      [1, 1],
      [2, 1],
      [8, 1],
      [9, 3],
      [47, 5],
      [48, 5],
      [49, 7],
      [50, 7]
    ].forEach(([n, expected]) => it(`widthOfSquare(${n}) === ${expected}`, () => assert.strictEqual(widthOfSquare(n), expected)))
  })

  describe('snakeLengthSinceAnyCorner', () => {
    [
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 1],
      [5, 0],
      [6, 1],
      [7, 0],
      [8, 1],

      [9, 0],
      [10, 1],
      [11, 2],
      [12, 3],
      [13, 0],
      [14, 1],
      [15, 2],
      [16, 3],
      [17, 0],
      [18, 1],
      [19, 2],
      [20, 3],
      [21, 0],
      [22, 1],
      [23, 2],
      [24, 3],

      [25, 0],
      [26, 1],
      [27, 2],
      [28, 3],
      [29, 4],
      [30, 5],
      [31, 0],
      [32, 1],
      [33, 2],
      [34, 3],
      [35, 4],
      [36, 5],
      [37, 0],
      [38, 1],
      [39, 2],
      [40, 3],
      [41, 4],
      [42, 5],
      [43, 0],
      [44, 1],
      [45, 2],
      [46, 3],
      [47, 4],
      [48, 5],
      [49, 0],

      [50, 1],
      [51, 2],
      [52, 3],
      [53, 4],
      [54, 5],
      [55, 6],
      [56, 7]
    ].forEach(([n, expected]) => it(`snakeLengthSinceAnyCorner(${n}) === ${expected}`, () => assert.strictEqual(snakeLengthSinceAnyCorner(n), expected)))
  })

  describe('movingTowardsMiddle', () => {
    [
      [1, true],
      [2, true],
      [3, true],
      [4, true],
      [5, true],
      [6, true],
      [7, true],
      [8, true],

      [9, true],
      [10, true],
      [11, true],
      [12, false],
      [13, true],
      [14, true],
      [15, true],
      [16, false],
      [17, true],
      [18, true],
      [19, true],
      [20, false],
      [21, true],
      [22, true],
      [23, true],
      [24, false],

      [25, true],
      [26, true],
      [27, true],
      [28, true],
      [29, false],
      [30, false],
      [31, true],
      [32, true],
      [33, true],
      [34, true],
      [35, false],
      [36, false],
      [37, true],
      [38, true],
      [39, true],
      [40, true],
      [41, false],
      [42, false],
      [43, true],
      [44, true],
      [45, true],
      [46, true],
      [47, false],
      [48, false],
      [49, true],

      [50, true],
      [51, true],
      [52, true],
      [53, true],
      [54, false],
      [55, false],
      [56, false]
    ].forEach(([n, expected]) => it(`movingTowardsMiddle(${n}) === ${expected}`, () => assert.strictEqual(movingTowardsMiddle(n), expected)))
  })

  describe('snakeLengthSinceSquareCorner', () => {
    [
      [1, 0],
      [2, 1],
      [3, 2],
      [4, 3],
      [5, 4],
      [6, 5],
      [7, 6],
      [8, 7],

      [9, 0],
      [10, 1],
      [11, 2],
      [12, 3],
      [13, 4],
      [14, 5],
      [15, 6],
      [16, 7],
      [17, 8],
      [18, 9],
      [19, 10],
      [20, 11],
      [21, 12],
      [22, 13],
      [23, 14],
      [24, 15],

      [25, 0],
      [26, 1],
      [27, 2],
      [28, 3],
      [29, 4],
      [30, 5],
      [31, 6],
      [32, 7],
      [33, 8],
      [34, 9],
      [35, 10],
      [36, 11],
      [37, 12],
      [38, 13],
      [39, 14],
      [40, 15],
      [41, 16],
      [42, 17],
      [43, 18],
      [44, 19],
      [45, 20],
      [46, 21],
      [47, 22],
      [48, 23],

      [49, 0],
      [50, 1],
      [51, 2],
      [52, 3],
      [53, 4],
      [54, 5],
      [55, 6],
      [56, 7]
    ].forEach(([n, expected]) => it(`snakeLengthSinceSquareCorner(${n}) === ${expected}`, () => assert.strictEqual(snakeLengthSinceSquareCorner(n), expected)))
  })

  describe('isMaxInSquare', () => {
    [
      [1, true],
      [2, false],
      [3, false],
      [4, false],
      [5, false],
      [6, false],
      [7, false],
      [8, false],

      [9, true],
      [10, false],
      [11, false],
      [12, false],
      [13, false],
      [14, false],
      [15, false],
      [16, false],
      [17, false],
      [18, false],
      [19, false],
      [20, false],
      [21, false],
      [22, false],
      [23, false],
      [24, false],

      [25, true],
      [26, false],
      [27, false],
      [28, false],
      [29, false],
      [30, false],
      [31, false],
      [32, false],
      [33, false],
      [34, false],
      [35, false],
      [36, false],
      [37, false],
      [38, false],
      [39, false],
      [40, false],
      [41, false],
      [42, false],
      [43, false],
      [44, false],
      [45, false],
      [46, false],
      [47, false],
      [48, false],

      [49, true],
      [50, false],
      [51, false],
      [52, false],
      [53, false],
      [54, false],
      [55, false],
      [56, false]
    ].forEach(([n, expected]) => it(`isMaxInSquare(${n}) === ${expected}`, () => assert.strictEqual(isMaxInSquare(n), expected)))
  })

  describeTestCases('silver', silver, [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 1],
    [5, 2],
    [6, 1],
    [7, 2],
    [8, 1],

    [9, 2],
    [10, 3],
    [11, 2],
    [12, 3],
    [13, 4],
    [14, 3],
    [15, 2],
    [16, 3],
    [17, 4],
    [18, 3],
    [19, 2],
    [20, 3],
    [21, 4],
    [22, 3],
    [23, 2],
    [24, 3],

    [25, 4],
    [26, 5],
    [27, 4],
    [28, 3],
    [29, 4],
    [30, 5],
    [31, 6],
    [32, 5],
    [33, 4],
    [34, 3],
    [35, 4],
    [36, 5],
    [37, 6],
    [38, 5],
    [39, 4],
    [40, 3],
    [41, 4],
    [42, 5],
    [43, 6],
    [44, 5],
    [45, 4],
    [46, 3],
    [47, 4],
    [48, 5],

    [49, 6],
    [50, 7],
    [51, 6],
    [52, 5],
    [53, 4],
    [54, 5],
    [55, 6],
    [56, 7],

    [74, 7],
    [75, 6],
    [79, 6],

    [114, 7],
    [115, 6],
    [116, 5],
    [117, 6],
    [118, 7],
    [119, 8],
    [120, 9],
    [121, 10],

    [161, 8],
    [162, 7],
    [163, 6],
    [164, 7],
    [165, 8],
    [166, 9],
    [167, 10],
    [168, 11],
    [169, 12],

    [1024, 31],

    [input, 419, 'input']
  ]
    .map(([input, expected, name]) => [String(input), expected, name])
  )

  describeTestCases('intermediateGold', intermediateGold, [
    [1, 1],
    [2, 1],
    [3, 2],
    [4, 4],
    [5, 5],
    [6, 10],
    [7, 11],
    [8, 23],

    [9, 25],
    [10, 26],
    [11, 54],
    [12, 57],
    [13, 59],
    [14, 122],
    [15, 133],
    [16, 142],
    [17, 147],
    [18, 304],
    [19, 330],
    [20, 351],
    [21, 362],
    [22, 747],
    [23, 806]
  ]
    .map(([input, expected]) => [String(input), expected])
  )

  describeTestCases('gold', gold, [
    [input, 295229, 'input']
  ])
})
