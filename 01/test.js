import Bacon from 'baconjs';
import s from '../lib/s';
import check from '../lib/check';

import silver from './silver';
import gold from './gold';

describe('01', () => {
    describe('silver', () => {
        Bacon.fromArray([
                ['(())', 0],
                ['()()', 0],
                ['(((', 3],
                ['(()(()(', 3],
                ['))(((((', 3],
                ['())', -1],
                ['))(', -1],
                [')))', -3],
                [')())())', -3]
            ])
            .onValue(([input, expected]) => {
                it(`${s(input)} => ${s(expected)}`, check.bind({}, silver, input, expected));
            });
    });

    describe('gold', () => {
        Bacon.fromArray([
                [')', 1],
                ['()())', 5]
            ])
            .onValue(([input, expected]) => {
                it(`${s(input)} => ${s(expected)}`, check.bind({}, gold, input, expected));
            });
    });
});
