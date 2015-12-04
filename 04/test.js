import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';

describe('04', () => {
    describeTestCases('silver', silver, [
        ['abcdef', 609043],
        ['pqrstuv', 1048970]
    ], 60000);
});