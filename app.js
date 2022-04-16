// Ця програма має малювати найменше описане коло навколо довільних N точок
const arrayX = []
const arrayY = []
var centerLength = 0
const tabulationForCanvas = 1000
var centerX
var centerY
var chekedPoint1
var chekedPoint2
var radiusX
var radiusY
var radius

function pushCoordinates(array) {
  arrayX.push(array[0] + tabulationForCanvas)
  arrayY.push(array[1] + tabulationForCanvas)
}

function createCoordinates() {
  const point1 = [120, 22]
  const point2 = [-130, 59]
  const point3 = [95, 65]
  const point4 = [77, 200]
  const point5 = [10, 10]
  const point6 = [-90, 100]
  const point7 = [-300, 100]
  const point8 = [39, 10]
  const point9 = [44, 600]
  const point10 = [91, 90]
  const point11 = [108, 180]

  pushCoordinates(point1)
  pushCoordinates(point2)
  pushCoordinates(point3)
  pushCoordinates(point4)
  pushCoordinates(point5)
  pushCoordinates(point6)
  pushCoordinates(point7)
  pushCoordinates(point8)
  pushCoordinates(point9)
  pushCoordinates(point10)
  pushCoordinates(point11)
}

function maxLength(arr1, arr2) {
  var maxLengthPointX1
  var maxLengthPointX2
  var maxLengthPointY1
  var maxLengthPointY2
  var lengthCoord

  for (let i = 0; i < arr1.length; i++) {
    for (let j = i + 1; j < arr2.length; j++) {
      lengthCoord = Math.sqrt(Math.pow(arr1[i] - arr1[j], 2) + Math.pow(arr2[i] - arr2[j], 2))
      if (lengthCoord > centerLength) {
        centerX = (arr1[i] + arr1[j]) / 2
        centerY = (arr2[i] + arr2[j]) / 2
        centerLength = lengthCoord
        maxLengthPointX1 = arr1[i]
        maxLengthPointX2 = arr1[j]
        maxLengthPointY1 = arr2[i]
        maxLengthPointY2 = arr2[j]
        chekedPoint1 = i //позиції точок найбільшої довжини між ними
        chekedPoint2 = j
      }
    }
  }
}

function radiusPoint(arr1, arr2) {
  // якщо в нас радіус > за відстань до любої точки то крапка якщо ні шукаєм найбільш і описуєм навколо 3кутника, і не перевіряти з точками що ніби діагональ
  var lengthCheck
  var thirdPointX
  var thirdPointY
  for (let q = 0; q < arr1.length; q++) {
    if (q != chekedPoint1 && q != chekedPoint2) {
      // не перевіряємо з нашими точками яких вже перевіряли
      lengthCheck = Math.sqrt(Math.pow(arr1[q] - centerX, 2) + Math.pow(arr2[q] - centerY, 2))
      if (lengthCheck > centerLength / 2) {
        centerLength = lengthCheck * 2
        thirdPointX = arr1[q]
        thirdPointY = arr2[q]
      }
    }
  }

  if (thirdPointX != null) {
    // console.log(thirdPointX, thirdPointY)
    var A1 = arr2[chekedPoint2] - arr2[chekedPoint1]
    var B1 = arr1[chekedPoint1] - arr1[chekedPoint2]

    var A2 = arr2[chekedPoint2] - thirdPointY
    var B2 = thirdPointX - arr1[chekedPoint2]

    var X01 = (arr1[chekedPoint1] + arr1[chekedPoint2]) / 2
    var Y01 = (arr2[chekedPoint1] + arr2[chekedPoint2]) / 2

    var X02 = (arr1[chekedPoint2] + thirdPointX) / 2
    var Y02 = (arr2[chekedPoint2] + thirdPointY) / 2

    radiusX = ((Y02 - Y01) * A1 * A2 + A2 * B1 * X01 - A1 * B2 * X02) / (A2 * B1 - A1 * B2)
    radiusY = ((radiusX - X01) * B1) / A1 + Y01
    radius = Math.sqrt(Math.pow(radiusX - thirdPointX, 2) + Math.pow(radiusY - thirdPointY, 2))
  } else {
    radiusX = centerX
    radiusY = centerY
    radius = centerLength / 2
  }
}

var c = document.getElementById('myCanvas')
var ctx = c.getContext('2d') //створюємо 2d в canvas

function drawCircle(x, y, r) {
  ctx.beginPath() //створюємо новий шлях
  //малюємо дугу передаючи центр, радіус і кут
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.stroke()
}

function drawPoints(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    ctx.beginPath()
    ctx.arc(arr1[i], arr2[i], 2, 0, 2 * Math.PI)
    ctx.stroke()
  }
}

function writePoints(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    console.log(
      `Point${i + 1}:  (`,
      arr1[i] - tabulationForCanvas,
      ',',
      arr2[i] - tabulationForCanvas,
      ')'
    )
  }
}

createCoordinates()
maxLength(arrayX, arrayY)
radiusPoint(arrayX, arrayY)
writePoints(arrayX, arrayY)
console.log(
  'RadiusX: ',
  radiusX - tabulationForCanvas,
  ' RadiusY: ',
  radiusY - tabulationForCanvas,
  ' RadiusLength: ',
  radius - tabulationForCanvas
)
drawCircle(radiusX, radiusY, radius)
drawPoints(arrayX, arrayY)
drawCircle(radiusX, radiusY, 1) // малюємо центр кола
