import fs from 'fs';
import path from 'path';
import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';

describe.only('05', () => {
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
    ], 2000);
});