import Bacon from 'baconjs';
import _ from 'lodash';
import md5 from 'md5';
import counter from './counter';

export default filter => input$ => input$
    .flatMap(input => counter({input}))
    .map(({number, input}) => ({number, hash: md5(input + number)}))
    .filter(({hash}) => filter(hash))
    .map(({number}) => number)
    .first();