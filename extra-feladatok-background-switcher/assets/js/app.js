'use strict'

const getRandomColors = () => {
  let randomColors = []
  for (let i = 0; i < 5; i++) {
    let r = Math.floor(Math.random() * 256) + 1
    let g = Math.floor(Math.random() * 256) + 1
    let b = Math.floor(Math.random() * 256) + 1
    randomColors[i] = {
      R: r,
      G: g,
      B: b
    }
  }
  console.log(randomColors)
  return randomColors
}

const start = () => {
  let colorsDiv = document.querySelector('.colors')
  let colors = getRandomColors()
  for (let i = 0; i < 5; i++) {
    let colorDiv = document.createElement('div')
    let randomBackground = colors[i]
    colorDiv.style.backgroundColor = `rgb(${randomBackground.R},${randomBackground.G},${randomBackground.B})`
    colorDiv.classList.add('color')
    colorsDiv.appendChild(colorDiv)
    colorDiv.addEventListener('click', switcher)
  }
}

const switcher = (event) => {
  let body = document.querySelector('body')
  body.style.backgroundColor = event.target.style.backgroundColor
  let r = (String(event.target.style.backgroundColor).split(', ')[0].split('(')[1])
  let g = (String(event.target.style.backgroundColor).split(', ')[1])
  let b = (String(event.target.style.backgroundColor).split(', ')[2].split(')')[0])
  let strings = document.querySelectorAll('.texts')
  strings.forEach(string => {
    if (colorAnalyst(parseInt(r), parseInt(g), parseInt(b))) { //if the background is too dark, switch the texts to dark color
      string.style.color = 'white'
    } else {
      string.style.color = 'black'
    }
  })
}

const colorAnalyst = (r, g, b) => {
  /*https://awik.io/determine-color-bright-dark-using-javascript/*/
  let hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  )
  if (hsp < 127.5) {
    return true
  } else {
    return false
  }

}

start()