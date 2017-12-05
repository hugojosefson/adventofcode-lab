import Bacon from 'baconjs'

const LOOP_DETECTOR = 10 * 1000 * 1000

const cpu = jumpInstructions => {
  let ip = 0
  let steps = 0
  let upperBound = jumpInstructions.length
  while (ip < upperBound) {
    const jumpInstruction = jumpInstructions[ip]
    jumpInstructions[ip]++
    steps++
    ip += jumpInstruction

    if (steps > LOOP_DETECTOR) {
      throw new Error(`I think we caught a loop. ${JSON.stringify({
        ip, steps, upperBound, jumpInstruction
      })}`)
    }
  }
  return steps
}

export default input$ => input$
  .map(input => input.split('\n'))
  .map(lines => lines.filter(line => line.length))
  .map(lines => lines.map(Number))
  .map(cpu)
  .flatMap(result => Bacon.once(result))
