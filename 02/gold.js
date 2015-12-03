import Bacon from 'baconjs';
import sum from '../lib/sum';
import lengthOfRibbon from './length-of-ribbon';

const OK_LINE = /\d+x\d+x\d+/;

export default input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .filter(line => OK_LINE.test(line))
    .map(line => line.split('x'))
    .map(dimensions => dimensions.map(Number))
    .map(dimensions => dimensions.sort((a, b) => a - b))
    .map(sides => lengthOfRibbon(...sides))
    .reduce(0, sum);