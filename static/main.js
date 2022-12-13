// const {HandwritingCanvas} = require("handwriting-canvas")

const canvasElement = document.getElementById("draw-area")
const canvas = new HandwritingCanvas(canvasElement)

const clearButtonElement = document.getElementById("clear-button")
clearButtonElement.addEventListener('click', () => {
  canvas.clear()
})
