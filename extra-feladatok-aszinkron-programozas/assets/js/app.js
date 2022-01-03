'use strict'

const url1 = './MOCK_DATA-1.json'
const url2 = './MOCK_DATA-2.json'
const url3 = './MOCK_DATA-3.json'
let tryToConnectCounter = 0

const commToServer = async (url, method, data) => {
  const fetchOptions = {
    method: method,
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  try {
    const response = await fetch(url, fetchOptions)
    const result = await response.json()
    tryToConnectCounter = 0
    return result
  } catch (error) {
    if (tryToConnectCounter < 3) {
      setTimeout(() => {
        commToServer(url, method)
      }, 5000)
      tryToConnectCounter++
    }
    console.error(error)
  }
}

const serial = async () => {
  let result = {}
  let result1 = await commToServer(url1, 'GET')
  let result2 = await commToServer(url2, 'GET')
  let result3 = await commToServer(url3, 'GET')
  result.user1 = result1
  result.user2 = result2
  result.user3 = result3
  console.log('serial running')
  return result
}

const parallel = async () => {
  let result = {}
  let result1 = commToServer(url1, 'GET')
  let result2 = commToServer(url2, 'GET')
  let result3 = commToServer(url3, 'GET')
  result.user1 = await result1
  result.user2 = await result2
  result.user3 = await result3
  console.log('parallel running')
  return result
}

const executionTime = async (func) => {
  const start = Date.now()
  await func()
  const end = Date.now()
  return end - start
}

const looper = async (counter, func) => {
  let fullTime = 0
  for (let i = 0; i < counter; i++) {
    let time = await executionTime(func)
    fullTime += time
  }
  return fullTime / 1000
}

const log = async () => {
  let serial1 = await looper(1, serial)
  let parallel1 = await looper(1, parallel)
  let serial10 = await looper(10, serial)
  let parallel10 = await looper(10, parallel)
  let serial100 = await looper(100, serial)
  let parallel100 = await looper(100, parallel)
  let serial1000 = await looper(1000, serial)
  let parallel1000 = await looper(1000, parallel)
  // let serial10000 = await looper(10000, serial)
  // let parallel10000 = await looper(10000, parallel)

  let performance = {}
  performance.oneTime = {
    "Első eset (másodperc)": serial1,
    "Második eset (másodperc)": parallel1
  }
  performance.tenTimes = {
    "Első eset (másodperc)": serial10,
    "Második eset (másodperc)": parallel10
  }
  performance.hundredTimes = {
    "Első eset (másodperc)": serial100,
    "Második eset (másodperc)": parallel100
  }
  performance.thousandTimes = {
    "Első eset (másodperc)": serial1000,
    "Második eset (másodperc)": parallel1000
  }
  // performance.tenThousandTimes = {
  //   "Első eset (másodperc)": serial10000,
  //   "Második eset (másodperc)": parallel10000
  // }

  console.table(performance)
}

log()