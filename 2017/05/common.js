import Bacon from 'baconjs'

export default cpu =>
  input$ => input$
    .map(input => input.split('\n'))
    .map(lines => lines.filter(line => line.length))
    .map(lines => lines.map(Number))
    .map(cpu)
    .flatMap(result => Bacon.once(result))
