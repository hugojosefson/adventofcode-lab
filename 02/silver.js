import Bacon from 'baconjs';
import areaOfBox from './area-of-box';

const OK_LINE = /\d+x\d+x\d+/;

export default input => input
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .filter(line => OK_LINE.test(line))
    .map(line => line.split('x'))
    .map(dimensions => dimensions.map(Number))
    .map(dimensions => dimensions.sort((a, b) => a - b))
    .map(([s1, s2, s3]) => areaOfBox(s1, s2, s3) + s1 * s2)
    .reduce(0, (acc, value) => acc + value);