import Bacon from 'baconjs';
import _ from 'lodash';

import count from '../lib/count';

export default input$ => input$
    .flatMap(input => Bacon.fromArray(input.split('\n')))
    .filter(line => (/([a-z]{2,}).*\1/).test(line))
    .filter(line => (/([a-z])[a-z]\1/).test(line))
    .reduce(0, count);