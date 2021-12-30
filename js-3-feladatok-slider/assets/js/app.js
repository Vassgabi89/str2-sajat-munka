'use strict'

//PARAMETERS:
const carouselHeight = '500';
const toogleDuration = 5000;
const url = 'http://localhost:3000/pictures'

import {
  getPictures
} from './server.js'

const content = document.querySelector('.content')
const counter = document.querySelector('.counter')
let pictures = ''
let numberOfPictures = 0

const fillCarousel = async () => {
  pictures = await getPictures(url)
  if (pictures) {
    pictures.forEach(picture => {
      createContent(picture)
      numberOfPictures++
    })
    createControlButtons()
    createIndicators(numberOfPictures)
    setActive(pictures[0],'next')
    startCarousel()
  } else {
    const error = document.createElement('h3')
    error.innerHTML = 'There is no pictures'
    content.appendChild(error)
  }
}

const createContent = (picture) => {
  const imgDiv = document.createElement('div')
  imgDiv.classList.add(`picture-${picture.id}`)
  content.appendChild(imgDiv)
  const img = document.createElement('img')
  img.src = picture.img
  img.height = carouselHeight - 50
  img.alt = picture.name
  imgDiv.appendChild(img)
}

const createControlButtons = () => {
  const nextBtn = document.createElement('button')
  nextBtn.classList.add('nextBtn')
  nextBtn.innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>'
  nextBtn.style.top = `${(carouselHeight-50)*0.5}px`
  content.appendChild(nextBtn)
  nextBtn.addEventListener('click', function () {
    let nextPicture = document.querySelector(`.next`)
    setActive(pictures[getID(nextPicture) - 1],'next')
  })
  const prevtBtn = document.createElement('button')
  prevtBtn.classList.add('prevBtn')
  prevtBtn.innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>'
  prevtBtn.style.top = `${(carouselHeight-50)*0.5}px`
  content.appendChild(prevtBtn)
  prevtBtn.addEventListener('click', function () {
    let prevPicture = document.querySelector(`.prev`)
    setActive(pictures[getID(prevPicture) - 1],'prev')
    prevPicture.classList.add('right')
  })
}

const createIndicators = (numberOfPictures) => {
  let indicators = document.querySelector('.indicators')
  indicators.style.top = `${carouselHeight-50}px`
  for (let i = 1; i <= numberOfPictures; i++) {
    let indicator = document.createElement('button')
    indicator.classList.add(`indicator-${i}`)
    indicators.appendChild(indicator)
    indicator.addEventListener('click', function () {
      setActive(pictures[i - 1],'indicator')
    })
  }
}

const setActive = (pictureIndex,direction) => {
  let before = document.querySelector('.active')
  clearActiveClasses()
  let activePicture = document.querySelector(`.picture-${pictureIndex.id}`)
  activePicture.classList.add('active')
  if (pictures.length === 1) {
    activePicture.classList.add('next')
    activePicture.classList.add('prev')
  }
  if (pictures.length === 2) {
    let nextAndPrevId = ((pictureIndex.id !== pictures.length) ? (pictureIndex.id) + 1 : (pictureIndex.id) - 1)
    let nextAndPrevPicture = document.querySelector(`.picture-${nextAndPrevId}`)
    nextAndPrevPicture.classList.add('next')
    nextAndPrevPicture.classList.add('prev')
  }
  if (pictures.length >= 3) {
    let nextId = ((pictureIndex.id !== pictures.length) ? (pictureIndex.id) + 1 : 1)
    let prevId = ((pictureIndex.id !== 1) ? (pictureIndex.id) - 1 : (pictures.length))
    let nextPicture = document.querySelector(`.picture-${nextId}`)
    nextPicture.classList.add('next')
    let prevPicture = document.querySelector(`.picture-${prevId}`)
    prevPicture.classList.add('prev')
    if (direction === 'next') {
      prevPicture.classList.add('before')
    }
    else { if (direction === 'prev')
      {nextPicture.classList.add('before')}
      else {
          before.classList.add('before')
      }
    }
  }
  let title = document.querySelector(`.title`)
  title.style.top = `${(carouselHeight-50)*0.8}px`
  title.innerHTML = pictureIndex.name
  let activeIndicator = document.querySelector(`.indicator-${pictureIndex.id}`)
  activeIndicator.classList.add('selected')
  counter.innerHTML = `${getID(activePicture)} / ${numberOfPictures}`
}

const clearActiveClasses = () => {
  let picturesInDOM = document.querySelectorAll('*[class^="picture-"]')
  picturesInDOM.forEach(pictureInDOM => {
    pictureInDOM.classList.remove('active')
    pictureInDOM.classList.remove('next')
    pictureInDOM.classList.remove('prev')
    pictureInDOM.classList.remove('right')
    pictureInDOM.classList.remove('before')
  })
  let indicatorsInDOM = document.querySelectorAll('*[class^="indicator-"]')
  indicatorsInDOM.forEach(indicatorInDOM => {
    indicatorInDOM.classList.remove('selected')
  })
}

const getID = (picture) => {
  return picture.classList[0].slice(8, picture.classList[0].length)
}

const startCarousel = () => {
  setTimeout(() => {
    let nextPicture = document.querySelector(`.next`)
    setActive(pictures[getID(nextPicture) - 1], 'next')
    startCarousel()
  }, toogleDuration)
}

fillCarousel()