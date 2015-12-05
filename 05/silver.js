import Bacon from 'baconjs';
import _ from 'lodash';

import count from '../lib/count';

export default input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .filter(line => !(/ab/).test(line))
    .filter(line => !(/cd/).test(line))
    .filter(line => !(/pq/).test(line))
    .filter(line => !(/xy/).test(line))
    .filter(line => (/([a-z])\1/).test(line))
    .filter(line => (/.*[aeiou].*[aeiou].*[aeiou].*/).test(line))
    .reduce(0, count);