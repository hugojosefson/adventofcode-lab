export const FOUR_DIRECTIONS = ['up', 'down', 'left', 'right']

export const movePosFrom = pos => direction => ({
  right: ({ x: pos.x + 1, y: pos.y }),
  up: ({ x: pos.x, y: pos.y + 1 }),
  left: ({ x: pos.x - 1, y: pos.y }),
  down: ({ x: pos.x, y: pos.y - 1 }),
  upright: ({ x: pos.x + 1, y: pos.y + 1 }),
  upleft: ({ x: pos.x - 1, y: pos.y + 1 }),
  downright: ({ x: pos.x + 1, y: pos.y - 1 }),
  downleft: ({ x: pos.x - 1, y: pos.y - 1 })
}[direction])

export const getValueFrom = state => pos => state[pos2key(pos)]
export const hasValueInState = state => pos => Object.prototype.hasOwnProperty.call(state, pos2key(pos))

const pos2key = pos => `${pos.x},${pos.y}`

export const mustHaveKey = (state, pos) => direction => {
  const positionInDirection = movePosFrom(pos)(direction)
  const hasValue = hasValueInState(state)

  return !!hasValue(positionInDirection)
}

export const mustBeEmpty = (state, pos) => direction => !mustHaveKey(state, pos)(direction)

export const onlyValueInStateAt = (state, pos) => directions => {
  const directionsWhichMustNot = FOUR_DIRECTIONS.filter(d => !directions.includes(d))

  const mustHavesHave = directions.reduce(
    (result, currentDirection) => result && mustHaveKey(state, pos)(currentDirection),
    true
  )

  const mustNotHavesAreEmpty = directionsWhichMustNot.reduce(
    (result, currentDirection) => result && mustBeEmpty(state, pos)(currentDirection),
    true
  )

  return mustHavesHave && mustNotHavesAreEmpty
}

export const calculateResult = ({ calculateValue, state, pos, n, shouldStop = () => false }) => {
  while (n > 1) {
    if (shouldStop({ state, pos, n, value: calculateValue({ state, pos, n }) })) {
      break
    }

    const onlyValueAt = onlyValueInStateAt(state, pos)

    const mutateMoving = direction => {
      pos = movePosFrom(pos)(direction)
      state[pos2key(pos)] = calculateValue({ state, pos, n })
      n--
    }

    if (onlyValueAt(['left'])) {
      mutateMoving('up')
      continue
    }
    if (onlyValueAt(['left', 'down'])) {
      mutateMoving('up')
      continue
    }
    if (onlyValueAt(['down'])) {
      mutateMoving('left')
      continue
    }
    if (onlyValueAt(['down', 'right'])) {
      mutateMoving('left')
      continue
    }
    if (onlyValueAt(['right'])) {
      mutateMoving('down')
      continue
    }
    if (onlyValueAt(['up', 'right'])) {
      mutateMoving('down')
      continue
    }
    if (onlyValueAt(['up'])) {
      mutateMoving('right')
      continue
    }
    if (onlyValueAt(['up', 'left'])) {
      mutateMoving('right')
      continue
    }
    if (onlyValueAt([])) {
      mutateMoving('right')
      continue
    }

    throw new Error(JSON.stringify({ n, pos, value: calculateValue({ state, pos, n }), state }, null, 2))
  }

  return { state, pos, n, value: calculateValue({ state, pos, n }) }
}

const initPos = { x: 0, y: 0 }
const initState = calculateValue => ({ [pos2key(initPos)]: calculateValue({ state: {}, pos: initPos }) })

export default ({ calculateValue, shouldStop }) => n => calculateResult({
  calculateValue,
  state: initState(calculateValue),
  pos: initPos,
  n,
  shouldStop
})
