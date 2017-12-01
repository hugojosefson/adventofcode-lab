import Bacon from 'baconjs'
import _ from 'lodash'

export default (template = {}) => Bacon.fromBinder(sink => {
  let number = 0
  const intervalId = setInterval(() => {
    for (let i = 1000000; i; i--) {
      sink(_.assign({}, template, {number}))
      number++
    }
  }, 0)
  return () => {
    clearInterval(intervalId)
  }
})
