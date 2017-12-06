import Bacon from 'baconjs'

const LOOP_DETECTOR = 1000 * 1000
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
  let steps = 0

  const one = () => {
    const index = indexWithMaxValue(banks)
    distribute(banks, index)
  }

  while (!seenBankConfigurations.has(banks.join())) {
    seenBankConfigurations.add(banks.join())

    one()
    steps++

    if (steps > LOOP_DETECTOR) {
      throw new Error(`I think we caught a loop. ${JSON.stringify({
        steps, banks, upperBound
      })}`)
    }
  }

  const bankConfigurationToLookFor = banks.join()
  const steps2 = steps

  while (steps2 === steps || banks.join() !== bankConfigurationToLookFor) {
    one()
    steps++

    if (steps > LOOP_DETECTOR) {
      throw new Error(`I think we caught a loop. ${JSON.stringify({
        steps, banks, upperBound
      })}`)
    }
  }
  return steps - steps2
}

export default input$ => input$
  .map(input => input.split(SEPARATOR))
  .map(ss => ss.filter(s => s.length))
  .map(s => s.map(x => parseInt(x, 10)))
  .map(reallocate)
  .flatMap(result => Bacon.once(result))
