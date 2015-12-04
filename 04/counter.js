import Bacon from 'baconjs';
import _ from 'lodash';

export default ({start = 0, step = 1, interval = 0, template = {}} = {}) => Bacon.fromBinder(sink => {
    let number = start;
    const intervalId = setInterval(() => {
        for (let i = 1000000; i; i--) {
            sink(_.assign({}, template, {number}));
            number += step;
        }
    }, interval);
    return () => {
        clearInterval(intervalId);
    };
});