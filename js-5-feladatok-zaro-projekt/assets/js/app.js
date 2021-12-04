'use strict'

const url = 'http://localhost:3000/users'

import {showMessage} from './message.js'
import {sendToServer} from './server.js'
import {compare, sorting} from './sorting.js'
import {validate} from './validate.js'

let editing = false
let freshData = []
let modifID = 0
let oriValues = {}
let tds = []
let newUser = 1

const getUsers = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    let sortedResult = sorting(result)
    return sortedResult
  } catch (error) {
    console.error(error)
    return []
  }
}

const createTable = () => {
  const tableDiv = document.querySelector('.tableDiv')
  tableDiv.innerHTML = ''
  const table = document.createElement('table')
  table.classList.add('table')
  tableDiv.appendChild(table)
  table.insertRow().insertCell().outerHTML = '<th>ID</th><th>Name</th><th>Email</th><th>Address</th><th><button class="add" title="Add user"><i class="fa fa-plus" aria-hidden="true"></i></button><button class="refresh"" title="Refresh"><i class="fa fa-refresh" aria-hidden="true"></i></button></th>'
  const noData = table.insertRow().insertCell()
  noData.innerHTML = '{^_^} Waiting for data... {^_^}'
  noData.classList.add('noData')
  fillTable()
}

const fillTable = () => {
  const table = document.querySelector('.table')
  getUsers(url).then(users => {
    freshData = users
    const noData = document.querySelector('.noData')
    noData.innerHTML = ''
    for (const user of users) {
      let row = table.insertRow()
      let rowClass = (user.id % 2 ? 'evenRow' : 'oddRow')
      row.classList.add(rowClass)
      row.setAttribute('id', `row_${user.id}`)
      row.insertCell().innerHTML = user.id
      row.insertCell().innerHTML = `${user.first_name} ${user.last_name}`
      row.insertCell().innerHTML = user.email
      row.insertCell().innerHTML = user.address
      row.insertCell().innerHTML = `<button class="edit" id="edit_${user.id}" title="Edit user"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" id="del_${user.id}" title="Delete user"><i class="fa fa-trash-o" aria-hidden="true"></i></button>`
    }
    clickSwitch()
  })
}

const delRow = (event) => {
  //get id from target
  let target = event.target
  if (event.target.innerHTML === '') {
    target = event.target.parentNode
  }
  modifID = target.getAttribute('id').split('_')[1]
  //send delete request
  let toDelete = freshData.find(user => user.id == modifID)
  sendToServer('delete', toDelete)
  showMessage('successDiv', 'deleteUser')
  //delete DOM row
  const table = document.querySelector('.table')
  const delRow = document.querySelector(`#row_${modifID}`)
  table.children[0].removeChild(delRow)
}

const editRow = (event) => {
  //get id from target
  let target = event.target
  if (event.target.innerHTML === '') {
    target = event.target.parentNode
  }
  modifID = target.getAttribute('id').split('_')[1]
  //get data from id for global value
  oriValues = freshData.find(user => user.id == modifID)
  //get row from id for switch DOM to text input 
  const editRow = document.querySelector(`#row_${modifID}`)
  tds = editRow.children
  //switch DOM to text input 
  switchRowData()
  //switch buttonfunctions
  editing = true
  clickSwitch()
  //click listeners for confirm/cancel buttons
  const confirmBtn = document.querySelector('.confirm')
  confirmBtn.addEventListener('click', modifyRow)
  const cancelBtn = document.querySelector('.cancel')
  cancelBtn.addEventListener('click', cancelModify)
}


const modifyRow = (event) => {
  //select inputs
  const editTd = document.querySelectorAll(`.editTd`)
  //if there is no modification after edit, no need to upload
  if ((editTd[0].value === `${oriValues.first_name} ${oriValues.last_name}`) && (editTd[1].value === oriValues.email) && (editTd[2].value) === oriValues.address) {
    cancelModify()
  } else {
    //if the modifications are valids, upload them!
    if (validate(editTd)) {
      let updateData = {}
      updateData.id = modifID
      updateData.first_name = editTd[0].value.split(' ')[0].trim()
      let last_name_pieces = editTd[0].value.split(' ')
      updateData.last_name = last_name_pieces[1]
      for (let i = 2; i < last_name_pieces.length; i++) {
        updateData.last_name += ` ${last_name_pieces[i]}`
      }
      updateData.email = editTd[1].value.toLowerCase().trim()
      updateData.address = editTd[2].value.trim()
      sendToServer('put', updateData)
      //switch DOM row text inputs to texts and the buttonlisteners
      switchRowData(editTd)
      editing = false
      clickSwitch()
      showMessage('successDiv', 'updateUser')
    } else {
      showMessage('errorDiv', 'validation')
      showMessage('infoDiv', 'validationInfo')
    }
  }
}

const cancelModify = () => {
  //switch DOM row inputs to texts and the buttonlisteners
  switchRowData()
  editing = false
  clickSwitch()
  showMessage('infoDiv', 'cancelModif')
}

const addUser = () => {
  //make new row for text inputs
  const table = document.querySelector('.table')
  let row = table.children[0].insertRow()
  table.children[0].insertBefore(row, table.children[0].children[1])
  row.classList.add('newUser')
  //set global values
  tds = row.children

  modifID = (isNaN(parseInt(table.children[0].children[2].children[0].innerHTML))) ? (parseInt(table.children[0].children[3].children[0].innerHTML)) + 1 : (parseInt(table.children[0].children[2].children[0].innerHTML)) + 1

  //make text inputs
  row.setAttribute('id', `row_${modifID}`)
  row.insertCell().innerHTML = modifID
  row.insertCell().innerHTML = `<input type="text" class="editTd" placeholder="John Doe e.g.">`
  row.insertCell().innerHTML = `<input type="text" class="editTd" placeholder="JD@example.com e.g.">`
  row.insertCell().innerHTML = `<input type="text" class="editTd" placeholder="99 Java Street e.g.">`
  row.insertCell().innerHTML = `<button class="confirm" title="Confirm"><i class="fa fa-check" aria-hidden="true"></i></button><button class="cancel" title="Cancel"><i class="fa fa-times" aria-hidden="true"></i></button>`
  //switch buttonlisteners
  editing = true
  clickSwitch()
  //confirm button:
  const confirmBtn = document.querySelector('.confirm')
  confirmBtn.addEventListener('click', function () {
    let editTd = document.querySelectorAll(`.editTd`)

    if (validate(editTd)) {
      //if the modifications are valids, upload them!
      let updateData = {}
      updateData.id = modifID
      updateData.first_name = editTd[0].value.split(' ')[0].trim()
      let last_name_pieces = editTd[0].value.split(' ')
      updateData.last_name = last_name_pieces[1]
      for (let i = 2; i < last_name_pieces.length; i++) {
        updateData.last_name += ` ${last_name_pieces[i]}`
      }
      updateData.email = editTd[1].value.toLowerCase().trim()
      updateData.address = editTd[2].value.trim()
      console.log(freshData)
      freshData.push(updateData)
      console.log(freshData)
      sendToServer('post', updateData)
      //switch DOM row text inputs to texts and the buttonlisteners     
      switchRowData(editTd)
      editing = false
      clickSwitch()
      showMessage('successDiv', 'newUser')
    } else {
      showMessage('errorDiv', 'validation')
      showMessage('infoDiv', 'validationInfo')
    }
  })

  //cancel button:
  const cancelBtn = document.querySelector('.cancel')
  cancelBtn.addEventListener('click', function () {
    //delete the row and switch the buttonlisteners
    table.children[0].removeChild(row)
    editing = false
    clickSwitch()
    showMessage('infoDiv', 'cancelNewUser')
  })
}

//if click disabled buttons(while editing), we get error message
const errorFunc = () => {
  showMessage('errorDiv', 'edit')
}

const clickSwitch = () => {
  const editBtns = document.querySelectorAll('.edit')
  const delBtns = document.querySelectorAll('.del')
  const addBtn = document.querySelector('.add')
  const refreshBtn = document.querySelector('.refresh')

  if (editing) {
    //while editing, confirm and cancel buttons are actives, other buttons are inactives (get errormessage)
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', errorFunc)
    })
    delBtns.forEach(delBtn => {
      delBtn.addEventListener('click', errorFunc)
    })
    addBtn.addEventListener('click', errorFunc)
    refreshBtn.addEventListener('click', errorFunc)
    editBtns.forEach(editBtn => {
      editBtn.removeEventListener('click', editRow)
    })
    delBtns.forEach(delBtn => {
      delBtn.removeEventListener('click', delRow)
    })
    addBtn.removeEventListener('click', addUser)
    refreshBtn.removeEventListener('click', createTable)
  } else {
    //while not editing, update and delete buttons are actives ,confirm and cancel buttons are inactives
    editBtns.forEach(editBtn => {
      editBtn.addEventListener('click', editRow)
    })
    delBtns.forEach(delBtn => {
      delBtn.addEventListener('click', delRow)
    })
    addBtn.addEventListener('click', addUser)
    refreshBtn.addEventListener('click', createTable)
    editBtns.forEach(editBtn => {
      editBtn.removeEventListener('click', errorFunc)
    })
    delBtns.forEach(delBtn => {
      delBtn.removeEventListener('click', errorFunc)
      addBtn.removeEventListener('click', errorFunc)
      refreshBtn.removeEventListener('click', errorFunc)
    })
  }
}

const switchRowData = (editTd) => {
  if (!editing) { //while editing, switch textss for text inputs:
    tds[1].innerHTML = `<input type="text" class="editTd" value="${tds[1].innerHTML}">`
    tds[2].innerHTML = `<input type="text" class="editTd" value="${tds[2].innerHTML}">`
    tds[3].innerHTML = `<input type="text" class="editTd" value="${tds[3].innerHTML}">`
    tds[4].innerHTML = `<button class="confirm" id ="confirm_${tds[0].innerHTML}" title="Confirm"><i class="fa fa-check" aria-hidden="true"></i></button><button class="cancel" id="cancel_${tds[0].innerHTML}" title="Cancel"><i class="fa fa-times" aria-hidden="true"></i></button>`
  } else { //after editing, we accept the valid datas:
    if (editTd) {
      tds[0].innerHTML = modifID
      tds[1].innerHTML = editTd[0].value
      tds[2].innerHTML = editTd[1].value
      tds[3].innerHTML = editTd[2].value
      tds[4].innerHTML = `<button class="edit" id="edit_${modifID}" title="Edit user"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" id="del_${modifID}" title="Delete user"><i class="fa fa-trash-o" aria-hidden="true"></i></button>`
    } else { //cancel editing, we restore the original texts:
      tds[1].innerHTML = `${oriValues.first_name} ${oriValues.last_name}`
      tds[2].innerHTML = oriValues.email
      tds[3].innerHTML = oriValues.address
      tds[4].innerHTML = `<button class="edit" id="edit_${modifID}" title="Edit user"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="del" id="del_${modifID}" title="Delete user"><i class="fa fa-trash-o" aria-hidden="true"></i></button>`
    }
  }
}

createTable()