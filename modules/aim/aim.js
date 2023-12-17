const startButton = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const header = document.querySelector('.header')
let time = 0
let score = 0
const colors = [
  'blueviolet',
  '#2146a4',
  '#ff9900',
  '#76db09',
  '#e50a2b',
  '#7FFFD4',
]

startButton.addEventListener('click', (event) => {
  event.preventDefault()
  screens[0].classList.add('up')
  header.classList.add('up')
})

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = Number(event.target.getAttribute('data-time'))
    screens[1].classList.add('up')
    header.classList.add('up')
    startGame()
  }
})

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++
    event.target.remove()
    createRandomCircle()
  }
})

function startGame() {
  setInterval(decreaseTime, 1000)
  createRandomCircle()
  setTime(time)
}

function decreaseTime() {
  if (time === 0) {
    finishGame()
  } else {
    let current = --time
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current)
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  timeEl.parentNode.classList.add('hide')
  board.innerHTML = `<h1>Cчёт: <span class ="primary">${score}</span></h1>`
}

function createRandomCircle() {
  const circle = document.createElement('div')
  const sizeCircle = getRandomSizeCircle(10, 50)
  const { width, height } = board.getBoundingClientRect()
  const x = getRandomSizeCircle(0, width - sizeCircle)
  const y = getRandomSizeCircle(0, height - sizeCircle)
  const color = getRandomColor()
  circle.classList.add('circle')
  circle.style.width = `${sizeCircle}px`
  circle.style.height = `${sizeCircle}px`
  circle.style.top = `${y}px`
  circle.style.left = `${x}px`
  circle.style.background = color
  circle.style.boxShadow = `0 0 10px ${color}, 0 0 20px ${color}`
  board.append(circle)
}

function getRandomSizeCircle(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)]
}
