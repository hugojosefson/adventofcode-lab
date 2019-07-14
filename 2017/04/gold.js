import common from './common'
import both from '../../lib/both'
import { hasOnlyUniqueWords } from './silver'

const sortWord = word => word.split('').sort().join('')

const hasOnlyUnanagramableWords = line => line
  .split(' ')
  .map(sortWord)
  .reduce((acc, sortedWord) => {
    if (acc.words[sortedWord]) {
      acc.valid = false
    } else {
      acc.words[sortedWord] = true
    }
    return acc
  }, { words: {}, valid: true })
  .valid

const isValidPassphrase = both(hasOnlyUniqueWords)(hasOnlyUnanagramableWords)

export default common(isValidPassphrase)
