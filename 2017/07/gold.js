import Bacon from 'baconjs'

import sum from '../../lib/sum'

import {
  LINE_REGEX,
  parseLineToNode,
  joinToTree,
  getRootKey
} from './common'

const totalWeightOfNodeInTree = tree => {
  const totalWeightOfNode = key => {
    const node = tree[key]

    if (!node.totalWeight) {
      node.totalWeight = node.childKeys
        .map(totalWeightOfNode)
        .concat([node.weight])
        .reduce(sum)
    }

    return node.totalWeight
  }
  return totalWeightOfNode
}

// eslint-disable-next-line no-unused-vars
const findDifferingProp = propName => arr => {
  if (arr.length < 2) {
    return undefined
  }

  const propValues = arr.map(item => item[propName])

  const propValueCounts = propValues.reduce((counts, propValue) => {
    if (!Object.prototype.hasOwnProperty.call(counts, propValue)) {
      counts[propValue] = 0
    }
    counts[propValue]++
    return counts
  }, {})

  const allEqual = Object.keys(propValueCounts).length === 1
  if (allEqual) {
    return undefined
  }

  // eslint-disable-next-line no-unused-vars, no-empty-pattern
  const differingIndex = propValueCounts.map(({}, index) => {})
}

const findUnbalancedNodeKeyInTree = tree => {
  const totalWeightOfNode = totalWeightOfNodeInTree(tree)

  const findUnbalancedNodeKey = fromKey => {
    const node = tree[fromKey]
    const totalWeights = node.childKeys.map(totalWeightOfNode)
    const firstWeight = totalWeights[0]
    const differentWeights = totalWeights
      .map((weight, index) => ({ weight, index }))
      .filter(({ weight }) => weight !== firstWeight)

    if (node.childKeys < 2 || differentWeights.length === 0) {
      return undefined
    }

    if (differentWeights.length === 1) {
      const { index } = differentWeights[0]
      return { key: node.childKeys[index], weightChange: tree[node.childKeys[index]].weight - differentWeights[0] }
    }

    return { key: node.childKeys[0], weightChange: tree[node.childKeys[0]].weight - differentWeights[1] }
  }

  return findUnbalancedNodeKey
}

const gold = tree => {
  const rootKey = getRootKey(tree)
  return findUnbalancedNodeKeyInTree(tree)(rootKey)
}

export default input$ => input$
  .map(input => input.split('\n'))
  .map(ss => ss.filter(s => s.length))
  .map(ss => ss.filter(s => LINE_REGEX.test(s)))
  .map(ss => ss.map(parseLineToNode))
  .map(ss => ss.reduce(joinToTree, {}))
  .map(tree => gold(tree))
  .flatMap(result => Bacon.once(result))
