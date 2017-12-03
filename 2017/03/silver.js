import Bacon from 'baconjs'

import common from './common'

export const calculateValueSilver = ({pos}) => Math.abs(pos.x) + Math.abs(pos.y)

export default input$ => input$
    .map(Number)
    .map(common({
      calculateValue: calculateValueSilver
    }))
  .map(({value}) => value)
    .flatMap(result => Bacon.once(result))
