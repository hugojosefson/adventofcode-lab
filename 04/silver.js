import Bacon from 'baconjs';
import _ from 'lodash';
import md5 from 'md5';
import counter from './counter';

export default input$ => input$
    .flatMap(input => counter({template: {input}}))
    .map(({number, input}) => ({number, hash: md5(input + number)}))
    .filter(({hash}) => hash.substring(0, 5) === '00000')
    .map(({number}) => number)
    .first();