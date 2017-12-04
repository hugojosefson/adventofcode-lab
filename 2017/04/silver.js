import common from './common'

const isValidPassphrase = line => line
  .split(' ')
  .reduce((acc, word) => {
    if (acc[word]) {
      acc.valid = false
    } else {
      acc[word] = true
    }
    return acc
  }, {words: {}, valid: true})
  .valid

export default common(isValidPassphrase)
