#!/usr/bin/env node

import path from 'path';
import {readFile} from 'fs';
import Bacon from 'baconjs';

import safeRequire from './lib/safe-require';
import formatWithTwoDigits from './lib/format-with-two-digits';
import numericCompareProperty from './lib/numeric-compare-property';

Bacon.constant(process)
    .map(process => process.argv.splice(2))
    .flatMap(args => Bacon.fromArray(args))
    .map(Number)
    .map(formatWithTwoDigits)
    .map(number => ({
        number,
        silverMod: safeRequire(`${__dirname}/${number}/silver`),
        goldMod: safeRequire(`${__dirname}/${number}/gold`),
        inputFilename: path.join(__dirname, number, 'input')
    }))
    .map(({number, silverMod, goldMod, inputFilename}) => ({
        number,
        silverFn: silverMod && silverMod.default,
        goldFn: goldMod && goldMod.default,
        input$: Bacon.fromNodeCallback(readFile, inputFilename, 'utf-8')
    }))
    .flatMap(({number, silverFn, goldFn, input$}) => Bacon.zipAsArray([Bacon.once(number), silverFn && silverFn(input$) || Bacon.once(null), goldFn && goldFn(input$) || Bacon.once(null)]))
    .map(([number, silver, gold]) => ({number, silver, gold}))
    .reduce([], (results, result) => results.concat(result))
    .map(results => results.sort(numericCompareProperty('number')))
    .onValue(console.log);