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
    .reduce([[0, 0], [0, 0], false, {'0:0': true}], ([[x, y], [xr, yr], robotsTurn, houses], direction) => {
        const newX = x + (robotsTurn ? 0 : direction.x);
        const newY = y + (robotsTurn ? 0 : direction.y);
        const newXr = xr + (robotsTurn ? direction.x : 0);
        const newYr = yr + (robotsTurn ? direction.y : 0);
        houses[`${newX}:${newY}`] = true;
        houses[`${newXr}:${newYr}`] = true;
        return [[newX, newY], [newXr, newYr], !robotsTurn, houses];
    })
    .last()
    .map(([[x, y], [xr, yr], robotsTurn, houses]) => houses)
    .map(_.pairs)
    .map('.length');