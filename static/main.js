// const {HandwritingCanvas} = require("handwriting-canvas")

const canvasElement = document.getElementById("draw-area")
const canvas = new HandwritingCanvas(canvasElement)

const clearButtonElement = document.getElementById("clear-button")
clearButtonElement.addEventListener('click', () => {
  canvas.clear()
})

const predictButtonElement = document.getElementById("predict-button")
predictButtonElement.addEventListener("click", async() => {

  if(canvas.isEmpty){
    return
  }

  //推論を実行する

  const blob = await canvas.toBlob('image/png')
  const formData = new FormData()
  formData.append('image', blob, 'number.png')

  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData
  })
  const responseData = await response.json()
  console.log(responseData);

  // 推論結果の画像を表示
  const imageURL = URL.createObjectURL(blob)
  const imageElement = document.createElement('img')
  imageElement.src = imageURL

  const resultImageElement = document.getElementById('result-image')

  if ( resultImageElement.firstChild ){
    resultImageElement.removeChild(resultImageElement.firstChild)
  }
  resultImageElement.appendChild(imageElement)

  canvas.clear()

  // 推論結果をtbodyに表示
  const tablebodyElement = document.getElementById('result-table-body')

  while(tablebodyElement.firstChild){
    tablebodyElement.removeChild(tablebodyElement.firstChild)
  }

  const probabilities = responseData.probabilities
  let count = 0
  probabilities.forEach(element => {
    const tr = document.createElement('tr')

    // 数字
    const tdNumber = document.createElement('td')
    tdNumber.textContent = count
    tr.appendChild(tdNumber)

    // 確率
    const tdProbability = document.createElement('td')
    tdProbability.textContent = (element * 100).toFixed(1)
    tr.appendChild(tdProbability)

    tablebodyElement.appendChild(tr)
    count++
  });

})


