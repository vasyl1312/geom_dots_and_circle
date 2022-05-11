// Ця програма має малювати найменше описане коло навколо довільних N точок
const arrayX = []
const arrayY = []
var centerLength = 0
const tabulationForCanvas = 500
const lengthArr = 200
const pointsLimit = 500
var centerX
var centerY
var chekedPoint1
var chekedPoint2
var radiusX
var radiusY
var radius

function pushCoordinates(array1, array2) {
  for (var i = 0; i < array1.length; i++) {
    arrayX.push(array1[i] + tabulationForCanvas)
    arrayY.push(array2[i] + tabulationForCanvas)
  }
}

function randomLengthArray(max) {
  return Math.floor(Math.random() * max)
}
//створення рандомну кількість точок (<200)
var len = randomLengthArray(lengthArr)
console.log(`Points are: ${len}`)
var randomsX = [...Array(len)].map(() => Math.floor(Math.random() * pointsLimit))
var randomsY = [...Array(len)].map(() => Math.floor(Math.random() * pointsLimit))
pushCoordinates(randomsX, randomsY)

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

maxLength(arrayX, arrayY)
radiusPoint(arrayX, arrayY)
writePoints(arrayX, arrayY)
console.log(
  'RadiusX: ',
  radiusX - tabulationForCanvas,
  ' RadiusY: ',
  radiusY - tabulationForCanvas,
  ' RadiusLength: ',
  radius
)
drawCircle(radiusX, radiusY, radius)
drawPoints(arrayX, arrayY)
drawCircle(radiusX, radiusY, 1) // малюємо центр кола
