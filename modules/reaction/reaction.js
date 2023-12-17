const mainWindow = document.querySelector('.main_window')
const scenes = document.querySelectorAll('.scene')
let statusTest = 'start'
let timerId
let startTime
let endTime

mainWindow.addEventListener('click', (event) => {
  if (statusTest === 'start' || statusTest === 'fail' || statusTest === 'end') {
    startTest()
  } else if (statusTest === 'wait') {
    failTest()
  } else if (statusTest === 'ready') {
    endTest()
  }
})

function startTest() {
  statusTest = 'wait'
  mainWindow.style.background = '#b81d1d'
  mainWindow.append(
    createContent('Ждите зелёного цвета...', 'h1', 'heading_test', true)
  )
  timerId = setTimeout(viewGreenScreen, Math.random() * 10000)
}
function failTest() {
  clearTimeout(timerId)
  statusTest = 'fail'
  mainWindow.style.background = '#1d51b8'
  mainWindow.append(
    createContent('', 'i', 'fa-solid fa-triangle-exclamation', true)
  )
  mainWindow.append(createContent('Слишком рано!', 'h1', 'heading_test', false))
  mainWindow.append(
    createContent(
      'Нажмите, чтобы попробовать ещё раз',
      'p',
      'inform_test',
      false
    )
  )
}
function viewGreenScreen() {
  startTime = new Date()
  statusTest = 'ready'
  mainWindow.style.background = '#1db81d'
  mainWindow.append(createContent('Нажимайте!', 'h1', 'heading_test', true))
}
function endTest() {
  endTime = new Date()
  statusTest = 'end'
  mainWindow.style.background = '#1d51b8'
  mainWindow.append(createContent('', 'i', 'fa-regular fa-clock', true))
  mainWindow.append(
    createContent(`${endTime - startTime} м.с.`, 'h1', 'heading_test', false)
  )
  mainWindow.append(
    createContent(
      'Нажмите, чтобы попробовать ещё раз',
      'p',
      'inform_test',
      false
    )
  )
}
function createContent(text, type, nameclass, status) {
  const content = document.createElement(type)
  content.textContent = text
  content.className = nameclass
  if (status) {
    mainWindow.innerHTML = ' '
  }
  return content
}
