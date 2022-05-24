const timeLeftDisplay = document.getElementById('time-left')
const startPause = document.getElementById('start-pause')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carsLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

const width = 9
let currentPosition = 76
let timer = null
let outcomeTimer
let currentTimer = 10

function moveFrog(e) {
  squares[currentPosition].classList.remove('frog')

  switch(e.key) {
    case 'ArrowLeft' :
    if (currentPosition % width !== 0) currentPosition -= 1
      break
    case 'ArrowRight' :
    if (currentPosition % width < width - 1) currentPosition += 1
      break
    case 'ArrowUp' :
    if (currentPosition - width >= 0) currentPosition -= width
      break
    case 'ArrowDown' :
    if (currentPosition + width < width * width) currentPosition += width
      break
  }
  squares[currentPosition].classList.add('frog')
}

function autoMoveElements() {
  currentTimer--
  timeLeftDisplay.textContent = currentTimer
  logsLeft.forEach(logleft => moveLogLeft(logleft))
  logsRight.forEach(logright => moveLogRight(logright))
  carsLeft.forEach(carleft => moveCarLeft(carleft))
  carsRight.forEach(carright => moveCarRight(carright))
}

function outcome() {
  lose()
  win()
}

function moveLogLeft(logleft) {
  switch(true) {
    case logleft.classList.contains('l1') :
    logleft.classList.remove('l1')
    logleft.classList.add('l2')
    break
    case logleft.classList.contains('l2') :
    logleft.classList.remove('l2')
    logleft.classList.add('l3')
    break
    case logleft.classList.contains('l3') :
    logleft.classList.remove('l3')
    logleft.classList.add('l4')
    break
    case logleft.classList.contains('l4') :
    logleft.classList.remove('l4')
    logleft.classList.add('l5')
    break
    case logleft.classList.contains('l5') :
    logleft.classList.remove('l5')
    logleft.classList.add('l1')
    break
  }
}

function moveLogRight(logright) {
  switch(true) {
    case logright.classList.contains('l1') :
    logright.classList.remove('l1')
    logright.classList.add('l5')
    break
    case logright.classList.contains('l5') :
    logright.classList.remove('l5')
    logright.classList.add('l4')
    break
    case logright.classList.contains('l4') :
    logright.classList.remove('l4')
    logright.classList.add('l3')
    break
    case logright.classList.contains('l3') :
    logright.classList.remove('l3')
    logright.classList.add('l2')
    break
    case logright.classList.contains('l2') :
    logright.classList.remove('l2')
    logright.classList.add('l1')
    break
  }
}

function moveCarLeft(carleft) {
  switch(true) {
    case carleft.classList.contains('c1'):
    carleft.classList.remove('c1')
    carleft.classList.add('c2')
    break
    case carleft.classList.contains('c2'):
    carleft.classList.remove('c2')
    carleft.classList.add('c3')
    break
    case carleft.classList.contains('c3'):
    carleft.classList.remove('c3')
    carleft.classList.add('c1')
    break
  }
}

function moveCarRight(carright) {
  switch(true) {
    case carright.classList.contains('c3'):
    carright.classList.remove('c3')
    carright.classList.add('c2')
    break
    case carright.classList.contains('c2'):
    carright.classList.remove('c2')
    carright.classList.add('c4')
    break
    case carright.classList.contains('c4'):
    carright.classList.remove('c4')
    carright.classList.add('c3')
    break
  }
}

function lose() {
  if (
    squares[currentPosition].classList.contains('c1') ||
    squares[currentPosition].classList.contains('c4') ||
    squares[currentPosition].classList.contains('l4') ||
    squares[currentPosition].classList.contains('l5') ||
    currentTimer <= 0
    ) {
    resultDisplay.textContent = 'You lose !'
  startPause.textContent = 'Game over.'
  clearInterval(timer)
  squares[currentPosition].classList.remove('frog')
  document.removeEventListener('keyup', moveFrog)
}
}

function win() {
  if (squares[currentPosition].classList.contains('goal-block')) {
    startPause.textContent = 'You win !'
    clearInterval(timer)
    clearInterval(outcomeTimer)
    document.removeEventListener('keyup', moveFrog)
  }
}

// window instead of document (that acts only on HTML)
// keypress instead of keyup ?
// Start, pause and resume game with spacebar
document.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    if (timer) {
      clearInterval(timer)
      clearInterval(outcomeTimer)
      timer = null
      document.removeEventListener('keyup', moveFrog)
      startPause.textContent = 'Press Space to Resume game.'
    } else {
      timer = setInterval(autoMoveElements, 1000)
      outcomeTimer = setInterval(outcome, 50)
      document.addEventListener('keyup', moveFrog)
      startPause.textContent = 'Press Space to Pause game.'
    }
  }
})
