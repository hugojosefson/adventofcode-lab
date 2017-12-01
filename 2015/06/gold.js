import _ from 'lodash'

import algorithm from './algorithm'

const validNumber = number => Number(number) || 0
const atLeastZero = number => Math.max(0, number)

const lightOperations = {
  'turn on': light => atLeastZero(validNumber(light) + 1),
  'turn off': light => atLeastZero(validNumber(light) - 1),
  'toggle': light => atLeastZero(validNumber(light) + 2)
}

export default input$ => algorithm(lightOperations)(input$)
    .map(_.sum)
