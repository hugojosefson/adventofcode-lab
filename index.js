#!/usr/bin/env babel-node

import path from 'path';
import {readFile} from 'fs';
import Bacon from 'baconjs';

Bacon.constant(process)
    .map(process => process.argv.splice(2))
    .flatMap(args => Bacon.fromArray(args))
    .map(Number)
    .map(number => number >= 10 ? '' + number : '0' + number)
    .map(number => ({
        fn: require('./' + number).default,
        inputFilename: number + '-input'
    }))
    .map(({fn, inputFilename}) => ({
        fn,
        inputFilename: path.join(__dirname, inputFilename)
    }))
    .map(({fn, inputFilename}) => ({
        fn,
        input$: Bacon.fromNodeCallback(readFile, inputFilename, 'utf-8')
    }))
    .flatMap(({fn, input$}) => fn(input$))
    .onValue(console.log);