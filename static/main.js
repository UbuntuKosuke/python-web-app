// const {HandwritingCanvas} = require("handwriting-canvas")

const canvasElement = document.getElementById("draw-area")
const canvas = new HandwritingCanvas(canvasElement)

const clearButtonElement = document.getElementById("clear-button")
clearButtonElement.addEventListener('click', () => {
  canvas.clear()
})

const predictButtonElement = document.getElementById("predict-button")
predictButtonElement.addEventListener("click", async() => {
  const response = await fetch('/api/predict')
  const responseData = await response.json()
  console.log(responseData);
})
