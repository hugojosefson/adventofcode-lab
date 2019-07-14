export default wireExpression => wireExpression
  .replace(/([a-z]+)/g, '_$1()')
  .replace(/\bAND\b/g, '&')
  .replace(/\bOR\b/g, '|')
  .replace(/\bLSHIFT\b/g, '<<')
  .replace(/\bRSHIFT\b/g, '>>')
  .replace(/\bNOT\b/g, '~')
