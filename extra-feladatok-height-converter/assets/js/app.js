'use strict'

let feet = document.querySelector('#feetInput')
let inch = document.querySelector('#inchInput')
let convertBtn = document.querySelector('#convertBtn')
let output = document.querySelector('#output')
let result = document.querySelector('#result')

convertBtn.addEventListener('click', function () {
  if (check()) {
    let feetValue = (feet.value.length < 1) ? 0 : parseInt(feet.value)
    let inchValue = (inch.value.length < 1) ? 0 : parseInt(inch.value)
    calculate(feetValue, inchValue)
  }
})

const check = () => {
  if ((feet.value.length < 1) && (inch.value.length < 1)) {
    output.textContent = 'Please enter a value!'
    return 0
  } else {
    let feetValue = (feet.value.length < 1) ? 0 : parseInt(feet.value)
    let inchValue = (inch.value.length < 1) ? 0 : parseInt(inch.value)
    if ((isNaN(feetValue)) || (isNaN(inchValue)) || (feetValue < 0) || (inchValue) < 0) {
      output.textContent = 'Please enter valid values!'
      return 0
    } else {
      return 1
    }
  }
}

const calculate = (feet, inch) => {
  let cmresult = (((feet * 12) + inch) * 2.54)
  output.textContent = `${feet} feet and ${inch} inch is:`
  result.textContent = `${cmresult} cm`
  document.querySelector('#feetInput').value = ''
  document.querySelector('#inchInput').value = ''
}