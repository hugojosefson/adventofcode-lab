import algorithm from './algorithm'

const lightOperations = {
  'turn on': light => true,
  'turn off': light => false,
  'toggle': light => !light
}

export default input$ => algorithm(lightOperations)(input$)
    .map(lights => Object.keys(lights).length)
