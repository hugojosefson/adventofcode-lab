import common from './common'

export const hasOnlyUniqueWords = line => line
  .split(' ')
  .reduce((acc, word) => {
    if (acc.words[word]) {
      acc.valid = false
    } else {
      acc.words[word] = true
    }
    return acc
  }, {words: {}, valid: true})
  .valid

export default common(hasOnlyUniqueWords)
