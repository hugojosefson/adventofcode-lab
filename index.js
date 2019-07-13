#!/usr/bin/env node

import path from 'path'
import { readFile } from 'fs'
import { constant, fromArray, fromNodeCallback, zipAsArray, once } from 'baconjs/dist/Bacon.noAssert'

import safeRequire from './lib/safe-require'
import formatWithTwoDigits from './lib/format-with-two-digits'
import numericCompareProperty from './lib/numeric-compare-property'

const year = process.argv[2]

constant(process)
  .map(process => process.argv.splice(3))
  .flatMap(args => fromArray(args))
  .map(Number)
  .map(formatWithTwoDigits)
  .map(number => ({
    number,
    silverMod: safeRequire(`${__dirname}/${year}/${number}/silver`),
    goldMod: safeRequire(`${__dirname}/${year}/${number}/gold`),
    inputFilename: path.join(__dirname, year, number, 'input')
  }))
  .map(({ number, silverMod, goldMod, inputFilename }) => ({
    number,
    silverFn: silverMod && silverMod.default,
    goldFn: goldMod && goldMod.default,
    input$: fromNodeCallback(readFile, inputFilename, 'utf-8')
  }))
  .flatMap(
    ({ number, silverFn, goldFn, input$ }) => zipAsArray([
      once(number),
      (silverFn && silverFn(input$)) || once(null),
      (goldFn && goldFn(input$)) || once(null)
    ])
  )
  .map(([number, silver, gold]) => ({ year, number, silver, gold }))
  .reduce([], (results, result) => results.concat(result))
  .map(results => results.sort(numericCompareProperty('number')))
  .onValue(console.log)
