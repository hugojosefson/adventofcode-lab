import Bacon from 'baconjs';
import s from './s';

export default (fn, input, expected) => {
    return new Promise((resolve, reject) => {
        typeof fn === 'function' || reject(new Error(`fn is not a function, it's a(n) ${typeof fn}`));
        typeof input === 'string' || reject(new Error(`input is not a string, it's a(n) ${typeof input}`));
        typeof expected === 'number' || reject(new Error(`expected is not a number, it's a(n) ${typeof expected}`));
        fn(Bacon.once(input))
            .onValue(actual => {
                if (actual === expected) {
                    resolve();
                } else {
                    reject(`actual ${s(actual)} differs from expected ${s(expected)}`);
                }
            });
    });
};