'use strict'

const screen = document.querySelector('.screen')
let inputs = [0]

const addClickListener = () => {
    let buttons = document.querySelectorAll('*[id^="C"]');
    for (let i = 0; i < buttons.length; i += 1) {
        buttons[i].addEventListener('click', function () {
            main(this.innerHTML)
        })
    }
}

const main = (selected) => {
    //replace innerHTML characters for operational symbols
    if (selected === 'x') {
        selected = '*'
    }
    if (selected === '÷') {
        selected = '/'
    }

    //if there is already decimal separator, don't accept another one, throw error
    if (selected === '.') {
        for (let i = inputs.length; i > 0; i--) {
            if (isOperator(inputs[i])) {
                break
            }
            if ((inputs[i]) === '.') {
                error()
                return 0
            }
        }
    }

    //if there is already operational symbol next to the new one, throw error
    if (isOperator(selected) && (
            isOperator(inputs[inputs.length - 1]) ||
            inputs.length === 1)) {
        error()
    } else {
        //otherwise call functions
        if (selected === 'C') {
            clearScreen()
        } else {
            if (selected === '=') {
                execute()
            } else {
                display(selected)
                inputs.push(selected)
                console.log(`On screen: ${inputs}`)
            }
        }
    }

    //if there is too many number on the screen, reduce the font size
    if (inputs.length > 22) {
        screen.classList.add('tooLongNumber')
        screen.classList.remove('normalNumber')
    } else {
        screen.classList.add('normalNumber')
        screen.classList.remove('tooLongNumber')
    }

}

//put numbers on screen, with green color after calculate
const display = (selected, final) => {
    if (final) {
        screen.innerHTML = selected
        green()
    } else {
        if (screen.innerHTML === '0' && selected !== '.') {
            screen.innerHTML = selected
        } else {
            screen.innerHTML += selected
        }
    }
}


const execute = () => {
    //if the last input is an operational symbol or an decimal separator, throw error
    if (isOperator(inputs[inputs.length - 1]) || (inputs[inputs.length - 1]) === '.') {
        error()
        return 0
    }

    //otherwise slice the inputs array at operational symbols, make the calc and display the result
    let number = false
    let tmpNumber = []
    let operatorPosition = -1
    let result = 0

    for (let i = 0; i < inputs.length; i++) {
        if (isOperator(inputs[i])) {
            tmpNumber = inputs.slice(operatorPosition + 1, i)
            number = convertToNumber(tmpNumber)
            if (operatorPosition === -1) {
                result = number
            } else {
                result = calc(result, number, operatorPosition)
            }
            operatorPosition = i
        }
        if (i === inputs.length - 1) {
            if (operatorPosition !== -1) {
                tmpNumber = inputs.slice(operatorPosition + 1, i + 1)
                number = convertToNumber(tmpNumber)
                result = calc(result, number, operatorPosition)
            } else {
                result = convertToNumber(inputs)
            }
        }
    }
    display(result, 1)
    //refresh the inputs array
    inputs = Array.from(result.toString())
    inputs.unshift(0)
}

//calculate the result, from partial result and number
const calc = (result, number, operatorPosition) => {
    let operator = inputs[operatorPosition]
    console.log(`Partial result: ${result} operator: ${operator} number: ${number}`)
    switch (operator) {
        case '+':
            result += number
            break
        case '-':
            result -= number
            break
        case '*':
            result *= number
            break
        case '/':
            result /= number
            break
        default:
            result
            break;
    }
    console.log(`Result: ${result}`)
    return result
}

//convert string-array to float number
const convertToNumber = (arrayOfNumbers = []) => {
    let newString = ''
    arrayOfNumbers.map(number => newString += number)
    let newFloatNumber = parseFloat(newString)
    return newFloatNumber
}

//clear the screen
const clearScreen = () => {
    screen.innerHTML = '0'
    inputs = [0]
    console.log(`On screen: ${inputs}`)
}

//make the result green
const green = () => {
    screen.classList.add('green')
    setTimeout(() => {
        screen.classList.remove('green')
    }, 1000);
}

//throw error for 1 sec with red color
const error = () => {
    let tmp = screen.innerHTML
    screen.innerHTML = 'ERROR'
    screen.classList.add('red')
    setTimeout(() => {
        screen.innerHTML = tmp
        screen.classList.remove('red')
    }, 1000);
}

//test if the the sign is an operator
const isOperator = (sign) => {
    const operators = ['+', '-', '*', '/']
    if (operators.find(element => element === sign)) {
        return true
    } else {
        return false
    }
}

//test if the the sign is a number
const isNumber = (sign) => {
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    if (numbers.find(element => element === sign)) {
        return true
    } else {
        return false
    }
}

addClickListener()