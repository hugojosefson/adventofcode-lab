import fs from 'fs';
import path from 'path';
import describeTestCases from '../lib/describe-test-cases';

import silver from './silver';

describe('04', () => {
    describeTestCases('silver', silver, [
        ['abcdef', 609043],
        ['pqrstuv', 1048970],
        [fs.readFileSync(path.join(__dirname, 'input'), 'utf8'), 117946]
    ], 60000);
});