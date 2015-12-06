import Bacon from 'baconjs';
import _ from 'lodash';
import numericCompare from '../lib/numeric-compare';

function error(msg, x1, y1, x2, y2, fromX, fromY, toX, toY) {
    console.error(msg, [{x1, y1, x2, y2}, {fromX, fromY, toX, toY}]);
    throw new Error(msg);
}

const operateOnLights = (lights, [operation, x1, y1, x2, y2]) => {
    if (typeof operation !== 'function') {
        throw new Error(`${operation} is not a function.`)
    }
    const [fromX, toX] = [x1, x2].sort(numericCompare);
    const [fromY, toY] = [y1, y2].sort(numericCompare);

    if (fromX !== x1) {
        error('fromX !== x1', x1, y1, x2, y2, fromX, fromY, toX, toY);
    }
    if (toX !== x2) {
        error('toX !== x2', x1, y1, x2, y2, fromX, fromY, toX, toY);
    }
    if (fromY !== y1) {
        error('fromY !== y1', x1, y1, x2, y2, fromX, fromY, toX, toY);
    }
    if (toY !== y2) {
        error('toY !== y2', x1, y1, x2, y2, fromX, fromY, toX, toY);
    }

    for (let x = fromX; x <= toX; x++) {
        for (let y = fromY; y <= toY; y++) {
            const coordinates = `${x},${y}`;
            lights[coordinates] = operation(lights[coordinates]);
            lights[coordinates] || delete lights[coordinates];
        }
    }
    return lights;
};

export default lightOperations => input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .map(line => line.match(/^(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/))
    .filter(_.isArray)
    .map(matches => matches.slice(1, 7))
    .map(([operation, x1, y1, x2, y2]) => [lightOperations[operation], Number(x1), Number(y1), Number(x2), Number(y2)])
    .reduce({}, operateOnLights);