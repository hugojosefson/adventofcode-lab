/* eslint-env mocha */

import describeTestCases from '../../lib/describe-test-cases'
import inputFile from '../../lib/input-file'

import silver from './silver'
import gold from './gold'

const PUZZLE_INPUT = `
pbga (66)
xhth (57)
ebii (61)
havc (66)
ktlj (57)
fwft (72) -> ktlj, cntj, xhth
qoyq (66)
padx (45) -> pbga, havc, qoyq
tknk (41) -> ugml, padx, fwft
jptl (61)
ugml (68) -> gyxo, ebii, jptl
gyxo (61)
cntj (57)    
    `
const input = inputFile(__dirname)

describe('2017-12-07', () => {
  describeTestCases('silver', silver, [
    [PUZZLE_INPUT, 'tknk'],
    [input, 'svugo', 'input']
  ])
  describeTestCases.skip('gold', gold, [
    [PUZZLE_INPUT, { key: 'ugml', weightChange: -8 }]
  ])
})
