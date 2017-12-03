import common from './common'

const minOfArray = array => Math.min.apply(Math, array)
const maxOfArray = array => Math.max.apply(Math, array)

const largestDiff = row => maxOfArray(row) - minOfArray(row)

export default common(largestDiff)
