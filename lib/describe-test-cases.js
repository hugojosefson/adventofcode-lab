/* eslint-env mocha */
import Bacon from 'baconjs'
import s from './s'
import check from './check'

const declareIt = (fn, inputExpectedPairs, timeout = 2000) => function () {
  this.timeout(timeout)
  Bacon.fromArray(inputExpectedPairs)
    .onValue(([input, expected, inputName = s(input), opts = {skip: false}]) => {
      if (opts.skip) {
        it.skip(`${inputName} => ${s(expected)}`, check.bind({}, fn, input, expected))
      } else {
        it(`${inputName} => ${s(expected)}`, check.bind({}, fn, input, expected))
      }
    })
}

const describeTestCases = (name, fn, inputExpectedPairs, timeout) =>
  describe(name, declareIt(fn, inputExpectedPairs, timeout))

describeTestCases.only = (name, fn, inputExpectedPairs, timeout) =>
  describe.only(name, declareIt(fn, inputExpectedPairs, timeout))

describeTestCases.skip = (name, fn, inputExpectedPairs, timeout) =>
  describe.skip(name, declareIt(fn, inputExpectedPairs, timeout))

export default describeTestCases
