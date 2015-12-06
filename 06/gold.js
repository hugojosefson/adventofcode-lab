import Bacon from 'baconjs';
import _ from 'lodash';

import count from '../lib/count';

const validNumber = number => Number(number) || 0;

const lightOperations = {
    'turn on': light => Math.max(0, validNumber(light) + 1),
    'turn off': light => Math.max(0, validNumber(light) - 1),
    'toggle': light => Math.max(0, validNumber(light) + 2)
};

function operateOnLights(lights, [operation, fromX, fromY, toX, toY]) {
    if (toX < fromX) {
        throw new Error(`${operation} ${fromX},${fromY} through ${toX},${toY}`)
    }
    if (toY < fromY) {
        throw new Error(`${operation} ${fromX},${fromY} through ${toX},${toY}`)
    }
    for (let x = fromX; x <= toX; x++) {
        for (let y = fromY; y <= toY; y++) {
            const coordinates = `${x},${y}`;
            lights[coordinates] = lightOperations[operation](lights[coordinates]);
            lights[coordinates] || delete lights[coordinates];
        }
    }
    return lights;
}

export default input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .map(line => line.match(/^(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/))
    .filter(matches => matches)
    .filter(matches => typeof matches === 'object')
    .filter(matches => (typeof matches.slice === 'function'))
    .map(matches => matches.slice(1, 7))
    .map(([operation, fromX, fromY, toX, toY]) => [operation, Number(fromX), Number(fromY), Number(toX), Number(toY)])
    .reduce({}, operateOnLights)
    .map(_.sum);