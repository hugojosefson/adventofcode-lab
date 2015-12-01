#!/usr/bin/env babel-node

import path from 'path';
import {readFileSync} from 'fs';
import Bacon from 'baconjs';

const filename = path.join(__dirname, '01-input');
Bacon.once(readFileSync(filename, 'utf8'))
    .flatMap(fileContents => Bacon.fromArray(fileContents.split('')))
    .filter(char => char === '(' || char === ')')
    .map(char => char === '(' ? 1 : char)
    .map(char => char === ')' ? -1 : char)
    .reduce(0, (acc, value) => acc + value)
    .log();