#!/usr/bin/env babel-node

import path from 'path';
import {readFile} from 'fs';
import Bacon from 'baconjs';

import safeRequire from './lib/safe-require';
import formatWithTwoDigits from './lib/format-with-two-digits';

Bacon.constant(process)
    .map(process => process.argv.splice(2))
    .flatMap(args => Bacon.fromArray(args))
    .map(Number)
    .map(formatWithTwoDigits)
    .map(number => ({
        number,
        mod: safeRequire(`${__dirname}/${number}`),
        goldMod: safeRequire(`${__dirname}/${number}/gold`),
        inputFilename: path.join(__dirname, number, 'input')
    }))
    .map(({number, mod, goldMod, inputFilename}) => ({
        number,
        fn: mod && mod.default,
        goldFn: goldMod && goldMod.default,
        input$: Bacon.fromNodeCallback(readFile, inputFilename, 'utf-8')
    }))
    .flatMap(({number, fn, goldFn, input$}) => Bacon.zipAsArray([Bacon.once(number), fn && fn(input$) || Bacon.once(null), goldFn && goldFn(input$) || Bacon.once(null)]))
    .map(([number, star, goldStar]) => ({number, star, goldStar}))
    .reduce([], (results, result) => results.concat(result))
    .map(results => results.sort((a, b) => Number(a.number) - Number(b.number)))
    .onValue(console.log);