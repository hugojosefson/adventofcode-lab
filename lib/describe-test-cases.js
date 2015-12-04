import Bacon from 'baconjs';
import s from './s';
import check from './check';

export default (name, fn, inputExpectedPairs, timeout = 2000) => {
    describe(name, function () {
        this.timeout(timeout);
        Bacon.fromArray(inputExpectedPairs)
            .onValue(([input, expected]) => {
                it(`${s(input)} => ${s(expected)}`, check.bind({}, fn, input, expected));
            });
    });
};
