export const LINE_REGEX = /([a-z]+) \((\d+)\)( -> ([a-z]+(, [a-z]+)*))?/
const parseChildrenStringToChildren = childrenString => (childrenString && childrenString.split(', ')) || []

export const parseLineToNode = s => {
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

export const joinToTree = (tree, currentNode) => {
  const ensureNodeExists = ensureNodeExistsInTree(tree)
  ensureNodeExists(currentNode)

  tree[currentNode.key].children.forEach(childKey => {
    ensureNodeExists({key: childKey, parent: currentNode.key})
  })

  return tree
}

export const getRootKey = tree => Object.keys(tree).filter(key => !tree[key].parent)[0]
