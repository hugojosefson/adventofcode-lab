/* eslint-env mocha */
import s from './s'
import { expect } from 'chai'

export default (name, fn, inputExpectedPairs, timeout = 100) => {
  describe(name, function () {
    this.timeout(timeout)
    inputExpectedPairs
      .map(([input, expected, inputName = s(input)]) => {
        it(`${inputName} => ${s(expected)}`, () => {
          const actual = fn(input)
          expect(actual).to.equal(expected)
        })
      })
  })
}
