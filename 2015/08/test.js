/* eslint-env mocha */
import fs from 'fs'
import path from 'path'
import describeTestCases from '../../lib/describe-test-cases'

import silver from './silver'
import gold from './gold'

describe('2015-12-08', () => {
  describeTestCases('silver', silver, [
        ['""', 2 - 0],
        ['"abc"', 5 - 3],
        ['"aaa\\"aaa"', 10 - 7],
        ['"\\x27"', 6 - 1],
    [
      [
        '""',
        '"abc"',
        '"aaa\\"aaa"',
        '"\\x27"'
      ].join('\n'),
      12
    ],
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 1371, 'input']
  ])

  describeTestCases('gold', gold, [
        ['""', 6 - 2],
        ['"abc"', 9 - 5],
        ['"aaa\\"aaa"', 16 - 10],
        ['"\\x27"', 11 - 6],
    [
      [
        '""',
        '"abc"',
        '"aaa\\"aaa"',
        '"\\x27"'
      ].join('\n'),
      19
    ]
  ])
})
