'use strict'

let showAll = 'Show'

const start = () => {
  updateDate()
  listing()
  const addBtn = document.querySelector('.addBtn')
  addBtn.addEventListener('click', function () {
    saveTodo()
  })
}

const updateDate = () => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dateNow = new Date()
  const date = document.querySelector('.date')
  date.innerHTML = `<p>${weekday[dateNow.getDay()]}</p><p>${dateNow.getDate()}-${dateNow.getMonth()+1}-${dateNow.getFullYear()}</p>`
}

const listing = () => {
  const pending = document.querySelector('.pending')
  if ((getTodo() !== null) && (getTodo().length > 0)) {
    pending.innerHTML = `<h2>You have ${numberOfTodos()-numberOfCompletedTodos()} pending items</h2>`
    let taskList = getTodo()
    for (let i = taskList.length - 1; i >= 0; i--) {
      if (taskList[i].done === false) {
        const taskDiv = document.createElement('div')
        taskDiv.classList.add(taskList[i].id)
        pending.appendChild(taskDiv)
        taskDiv.innerHTML = `<input type="checkbox" id="check-${taskList[i].id}"><span>${taskList[i].task}</span><button class="delBtn" title="Delete task"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>`
        taskDiv.addEventListener('mouseenter', function () {
          this.lastChild.classList.add('visible')
        })
        taskDiv.addEventListener('mouseleave', function () {
          this.lastChild.classList.remove('visible')
        })
      }
    }
    const buttonsDiv = document.querySelector('.buttons')
    buttonsDiv.innerHTML = `<button>${showAll} Complete</button><button>Clear All</button>`
    listeners()
    if (showAll === 'Hide') {
      listingAll()
    } else {
      const done = document.querySelector('.done')
      done.innerHTML = ''
    }
  }
  if (numberOfTodos() - numberOfCompletedTodos() === 0) {
    pending.innerHTML = `<img src="./assets/img/best-beach-drinks-top-768x512.jpg" alt="Beach with cocktail"><h1>Time to chill! You have no todos.</h1>`
    const done = document.querySelector('.done')
    done.innerHTML = ''
    const buttonsDiv = document.querySelector('.buttons')
    buttonsDiv.innerHTML = ''
  }
}

const listingAll = () => {
  const done = document.querySelector('.done')
  let counter = Math.round((numberOfCompletedTodos() / numberOfTodos()) * 100)
  done.innerHTML = `<h2>Completed tasks: ${counter}%</h2>`
  let taskList = getTodo()
  taskList.forEach(task => {
    if (task.done === 'true') {
      const taskDiv = document.createElement('div')
      done.appendChild(taskDiv)
      taskDiv.innerHTML = `<input type="checkbox" checked disabled="disabled"><span>${task.task}</span>`
    }
  })
}

const listeners = () => {
  const delBtns = document.querySelectorAll('.delBtn')
  delBtns.forEach(delBtn => {
    delBtn.addEventListener('click', function () {
      delTodo(this.parentElement.className)
    })
  })
  const checkBtns = document.querySelectorAll('*[id^="check-"]')
  checkBtns.forEach(checkBtn => {
    checkBtn.addEventListener('change', function () {
      this.parentElement.classList.add('doneTask')
      setTimeout(() => {
        this.parentElement.classList.remove('doneTask')
        doneTodo(this.parentElement.className)
      }, 2000)

    })
  })
  const buttonsDiv = document.querySelector('.buttons')
  buttonsDiv.firstChild.addEventListener('click', function () {
    if (showAll === 'Show') {
      showAll = 'Hide'
    } else {
      showAll = 'Show'
    }
    listing()
  })
  buttonsDiv.lastChild.addEventListener('click', function () {

    if ((getTodo() !== null) && (getTodo().length > 0)) {
      let taskList = getTodo()
      for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].done === false) {
          taskList.splice(i, 1)
          i--
        }
        console.log(taskList)
      }
      localStorage.setItem('task-list', JSON.stringify(taskList))
      listing()
    }
    //localStorage.clear()
  })
}

const saveTodo = () => {
  const addInput = document.querySelector('.addInput')
  const newTaskInput = addInput.value
  addInput.value = ''
  if (newTaskInput.length === 0) {
    return 0
  }
  let newTask = {}
  if ((getTodo() !== null) && (getTodo().length > 0)) {
    newTask = {
      id: highestID() + 1,
      task: newTaskInput,
      done: false
    }
    let taskList = getTodo()
    taskList.push(newTask)
    localStorage.clear()
    localStorage.setItem('task-list', JSON.stringify(taskList))
  } else {
    newTask = {
      id: 0,
      task: newTaskInput,
      done: false
    }
    let taskList = []
    taskList[0] = newTask
    localStorage.setItem('task-list', JSON.stringify(taskList))
  }

  const pending = document.querySelector('.pending')
  const taskDiv = document.createElement('div')
  taskDiv.innerHTML = `<input type="checkbox"><span>${newTask.task}</span><button class="delBtn" title="Delete task"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></button>`
  taskDiv.classList.add(newTask.id)
  taskDiv.classList.add('newTask')
  pending.insertBefore(taskDiv, pending.childNodes[1])

  setTimeout(() => {
    taskDiv.classList.remove('newTask')
    listing()
  }, 2000)
}

const delTodo = (id) => {
  let taskList = getTodo()
  localStorage.clear()
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === parseInt(id)) {
      taskList.splice(i, 1)
      break
    }
  }
  localStorage.setItem('task-list', JSON.stringify(taskList))
  listing()
}

const doneTodo = (id) => {
  let taskList = getTodo()
  localStorage.clear()
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === parseInt(id)) {
      taskList[i].done = 'true'
      break
    }
  }
  localStorage.setItem('task-list', JSON.stringify(taskList))
  listing()
}

const getTodo = () => {
  return JSON.parse(localStorage.getItem('task-list'))
}

const numberOfTodos = () => {
  let taskList = getTodo()
  let numberOfTodos = 0
  taskList.forEach(task => {
    numberOfTodos++
  })
  return numberOfTodos
}

const numberOfCompletedTodos = () => {
  let taskList = getTodo()
  let numberOfCompletedTodos = 0
  taskList.forEach(task => {
    if (task.done === 'true') {
      numberOfCompletedTodos++
    }
  })
  return numberOfCompletedTodos
}

const highestID = () => {
  let taskList = getTodo()
  let highestID = 0
  taskList.forEach(task => {
    if (task.id > highestID) {
      highestID = task.id
    }
  })
  return highestID
}

start()