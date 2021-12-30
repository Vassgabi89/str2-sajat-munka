'use strict'

const getPictures = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    console.error(error)
  }
}

export {
  getPictures
}