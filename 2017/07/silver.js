import Bacon from 'baconjs'

const LINE_REGEX = /([a-z]+) \((\d+)\)( -> ([a-z]+(, [a-z]+)*))?/
const parseChildrenStringToChildren = childrenString => (childrenString && childrenString.split(', ')) || []

const parseLineToNode = s => {
  // eslint-disable-next-line no-unused-vars
  const [_1, key, weight, _2, childrenString] = s.match(LINE_REGEX)
  const children = parseChildrenStringToChildren(childrenString)
  return {key, children}
}

const ensureNodeExistsInTree = tree => node => {
  if (tree.hasOwnProperty(node.key)) {
    Object.assign(tree[node.key], node)
  } else {
    tree[node.key] = node
  }
}

const joinToTree = (tree, currentNode) => {
  const ensureNodeExists = ensureNodeExistsInTree(tree)
  ensureNodeExists(currentNode)

  tree[currentNode.key].children.forEach(childKey => {
    ensureNodeExists({key: childKey, parent: currentNode.key})
  })

  return tree
}

const getRootKey = tree => Object.keys(tree).filter(key => !tree[key].parent)[0]

export default input$ => input$
  .map(input => input.split('\n'))
  .map(ss => ss.filter(s => s.length))
  .map(ss => ss.filter(s => LINE_REGEX.test(s)))
  .map(ss => ss.map(parseLineToNode))
  .map(ss => ss.reduce(joinToTree, {}))
  .map(tree => getRootKey(tree))
  .flatMap(result => Bacon.once(result))
