'use strict'

//PARAMETERS
let gameDifficulty = 64

const audio = new Audio('./assets/sounds/pop.mp3');
let mute = true
let message = document.querySelector('#message')
let area = document.querySelector('.balloons')
let popped = 0

const difficultyMenu = () => {
  let dropdownContent = document.querySelector('.dropdown-content')
  let difficulties = dropdownContent.querySelectorAll('p')
  difficulties.forEach(difficulty => {
    difficulty.addEventListener('click', function () {
      gameDifficulty = parseInt(difficulty.textContent.split(' ')[0])
      fillArea(gameDifficulty)
    })
  })
}

const sound = () => {
  let audioBtn = document.querySelector('#audioBtn')
  audioBtn.addEventListener('click', function () {
    if (audioBtn.innerHTML === '<i class="fa fa-volume-off" aria-hidden="true"></i>') {
      audioBtn.innerHTML = '<i class="fa fa-volume-up" aria-hidden="true"></i>'
      mute = false
    } else {
      audioBtn.innerHTML = '<i class="fa fa-volume-off" aria-hidden="true"></i>'
      mute = true
    }
  })
}

const getRandomColors = () => {
  let colors = []
  for (let i = 0; i < 5; i++) {
    let r = Math.floor(Math.random() * 256) + 1
    let g = Math.floor(Math.random() * 256) + 1
    let b = Math.floor(Math.random() * 256) + 1
    colors[i] = {
      R: r,
      G: g,
      B: b
    }
  }
  return colors
}

const fillArea = (numberOfBallons = 64) => {
  popped = 0
  message.innerHTML = 'Pop the balloons by moving your mouse over them!'
  area.innerHTML = ''
  let colors = getRandomColors()
  for (let i = 0; i < 8; i++) {
    let ballonRow = document.createElement('div')
    area.appendChild(ballonRow)
    for (let j = 0; j < numberOfBallons / 8; j++) {
      let balloon = document.createElement('div')
      let randomBackground = colors[Math.floor(Math.random() * 4)]
      balloon.style.backgroundColor = `rgb(${randomBackground.R},${randomBackground.G},${randomBackground.B})`
      balloon.innerHTML = `<p style="color: rgb(${randomBackground.R},${randomBackground.G},${randomBackground.B});">POP!</p>`
      ballonRow.appendChild(balloon)
      balloon.addEventListener('mouseenter', popping)
    }
  }
}

const checkWin = () => {
  if (popped === gameDifficulty) {
    message.innerHTML = 'Wow! All balloons popped! New start in... 5'
    counter(4)
  }
}

const counter = (i) => {
  setTimeout(() => {
    message.innerHTML = `Wow! All balloons popped! New game starts in... ${i}`
    if (i === 0) {
      fillArea()
    } else {
      counter(i - 1)
    }
  }, 1000)
}

const popping = (event) => {
  if (!mute) {
    audio.play()
  }
  event.target.style.background = 'none'
  event.target.firstChild.classList.add('visible')
  setTimeout(() => {
    event.target.firstChild.classList.remove('visible')
  }, 1000);
  event.target.removeEventListener('mouseenter', popping)
  popped++
  checkWin()
}

difficultyMenu()
sound()
fillArea()