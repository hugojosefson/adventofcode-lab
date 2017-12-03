/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'
import {intermediate as intermediateGold, default as gold} from './gold'

const input = inputFile(__dirname)

describe('2017-12-03', () => {
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

    [input, 419, 'input', {skip: true}]
  ].map(([input, expected, name, opts]) => [String(input), expected, name, opts]), 10000)

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
  ].map(([input, expected]) => [String(input), expected]))

  describeTestCases('gold', gold, [
    [input, 295229, 'input']
  ])
})
