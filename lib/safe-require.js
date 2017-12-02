export default path => {
  try {
    return require(path)
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND' || err.code === 'ERR_MISSING_MODULE') {
      return undefined
    } else {
      throw err
    }
  }
}
