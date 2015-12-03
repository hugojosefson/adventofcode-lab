import Bacon from 'baconjs';

export default input => input
    .flatMap(fileContents => Bacon.fromArray(fileContents.split('')))
    .filter(char => char === '(' || char === ')')
    .map(char => char === '(' ? 1 : char)
    .map(char => char === ')' ? -1 : char)
    .reduce(0, (acc, value) => acc + value);