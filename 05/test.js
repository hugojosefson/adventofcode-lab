import fs from 'fs';
import path from 'path';
import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';
import gold from './gold';

describe('05', () => {
    describeTestCases('silver', silver, [
        ['ugknbfddgicrmopn', 1],
        ['aaa', 1],
        ['jchzalrnumimnmhp', 0],
        ['haegwjzuvuyypxyu', 0],
        ['dvszwmarrgswjxmb', 0],
        ['aquqoqiqeqyqssf', 1],
        ['aqiqeqssf', 1],
        ['aqqeqssf', 0],
        ['aquqoqiqeqyqsf', 0],
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 258, 'input']
    ]);
    describeTestCases('gold', gold, [
        ['qjhvhtzxzqqjkmpb', 1],
        ['xxyxx', 1],
        ['uurcxstgmygtbstg', 0],
        ['ieodomkazucvgmuy', 0]
    ]);
});