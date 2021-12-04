'use strict'

const sendToServer = async (method, data) => {
  let link = (method === 'post') ? ('') : (data.id)
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
    const response = await fetch(`http://localhost:3000/users/${link}`, fetchOptions)
    const result = await response.json()
  } catch (error) {
    console.error(error)
    return []
  }
}

export {
  sendToServer
}