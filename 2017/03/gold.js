import Bacon from 'baconjs'

import common, {
  FOUR_DIRECTIONS,
  getValueFrom,
  movePosFrom
} from './common'

import sum from '../../lib/sum'

const ALL_DIRECTIONS = [...FOUR_DIRECTIONS, 'upright', 'upleft', 'downleft', 'downright']

const calculateValueGold = ({ state, pos }) =>
  ALL_DIRECTIONS
    .map(direction => getValueFrom(state)(movePosFrom(pos)(direction)) || 0)
    .reduce(sum) || 1

export const intermediate = input$ => input$
  .map(Number)
  .map(common({
    calculateValue: calculateValueGold
  }))
  .map(({ value }) => value)
  .flatMap(result => Bacon.once(result))

export default input$ => input$
  .map(Number)
  .map(input => common({
    calculateValue: calculateValueGold,
    shouldStop: ({ value }) => value > input
  })(Number.MAX_SAFE_INTEGER))
  .map(({ value }) => value)
  .flatMap(result => Bacon.once(result))
