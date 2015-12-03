import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';
import gold from './gold';

describe('03', () => {
    describeTestCases('silver', silver, [
        ['>', 2],
        ['^>v<', 4],
        ['^v^v^v^v^v', 2]
    ]);
    describeTestCases('gold', gold, [
        ['^v', 3],
        ['^>v<', 3],
        ['^v^v^v^v^v', 11]
    ]);
});