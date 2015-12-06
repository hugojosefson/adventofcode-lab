import fs from 'fs';
import path from 'path';
import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';

describe('06', () => {
    describeTestCases('silver', silver, [
        ['turn on 0,0 through 999,999', 1000000],
        ['toggle 0,0 through 999,0', 1000],
        ['turn off 499,499 through 500,500', 0],
        ['turn on 499,499 through 500,500', 4],
        [
            [
                'turn on 0,0 through 999,999',
                'toggle 0,0 through 999,0'
            ].join('\n'),
            999000
        ],
        [
            [
                'turn on 0,0 through 999,999',
                'turn off 499,499 through 500,500'
            ].join('\n'),
            999996
        ],
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 377891, 'input']
    ], 30000);
});