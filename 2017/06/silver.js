import Bacon from 'baconjs'

const LOOP_DETECTOR = 10 * 1000 * 1000
export const SEPARATOR = new RegExp('[^0-9]+')

export const indexWithMaxValue = arr => arr
  .reduce((max, currValue, currIndex) => {
    if (currValue > max.value) {
      max.value = currValue
      max.index = currIndex
    }
    return max
  }, {value: arr[0], index: 0}).index

const distribute = (banks, index) => {
  let value = banks[index]
  banks[index] = 0

  while (value > 0) {
    index = (index + 1) % banks.length
    banks[index]++
    value--
  }

  return banks
}

const reallocate = banks => {
  const upperBound = banks.length
  const seenBankConfigurations = new Set()

  while (!seenBankConfigurations.has(banks.join())) {
    seenBankConfigurations.add(banks.join())

    const index = indexWithMaxValue(banks)
    const value = banks[index]
    distribute(banks, index)

    if (seenBankConfigurations.size > LOOP_DETECTOR) {
      throw new Error(`I think we caught a loop. ${JSON.stringify({
        steps: seenBankConfigurations.size, banks, index, value, upperBound
      })}`)
    }
  }
  return seenBankConfigurations.size
}

export default input$ => input$
  .map(input => input.split(SEPARATOR))
  .map(ss => ss.filter(s => s.length))
  .map(s => s.map(x => parseInt(x, 10)))
  .map(reallocate)
  .flatMap(result => Bacon.once(result))
