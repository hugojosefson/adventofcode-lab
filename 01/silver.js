import Bacon from 'baconjs';

export default input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('')))
    .filter(char => char === '(' || char === ')')
    .map(char => char === '(' ? 1 : char)
    .map(char => char === ')' ? -1 : char)
    .reduce(0, (floor, direction) => floor + direction);