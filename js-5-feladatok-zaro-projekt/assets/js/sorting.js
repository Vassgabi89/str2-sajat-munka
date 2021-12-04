'use strict'

const compare = (userA, userB) => {
    let a = userA.id
    let b = userB.id
    if (a > b) {
      return -1
    }
    if (a < b) {
      return 1
    }
    return 0
  }
  
const sorting = (data = []) => {
    const sortedByID_desc = data.sort(compare)
    return data
  }

export {
    compare,
    sorting
}