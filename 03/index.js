import Bacon from 'baconjs';
import _ from 'lodash';

const OK_CHAR = /[\^v<>]/;

export default input => input
    .flatMap(fileContents => Bacon.fromArray(fileContents.split('')))
    .filter(char => OK_CHAR.test(char))
    .decode({
        '^': {x: 0, y: 1},
        'v': {x: 0, y: -1},
        '>': {x: 1, y: 0},
        '<': {x: -1, y: 0}
    })
    .reduce([0, 0, {'0:0': true}], ([x, y, houses], direction) => {
        const newX = x + direction.x;
        const newY = y + direction.y;
        houses[`${newX}:${newY}`] = true;
        return [newX, newY, houses];
    })
    .last()
    .map(([x, y, houses]) => houses)
    .map(_.pairs)
    .map('.length');