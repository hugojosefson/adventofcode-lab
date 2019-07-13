import { once } from 'baconjs/dist/Bacon.noAssert'

export default cpu =>
  input$ => input$
    .map(input => input.split('\n'))
    .map(lines => lines.filter(line => line.length))
    .map(lines => lines.map(Number))
    .map(cpu)
    .flatMap(result => once(result))
