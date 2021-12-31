'use strict'

const team_url = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/teams.json'
const players_url = 'https://raw.githubusercontent.com/jokecamp/FootballData/master/UEFA_European_Championship/Euro%202016/players_json/hungary-players.json'

const start = async (url) => {
  try {
    const response = await fetch(url)
    const result = await response.json()
    fillTeamData(result)
    fillPlayersData(result)
  } catch (error) {
    console.error(error)
    return []
  }
}

const fillTeamData = (datas) => {
  let hungarian_team = []
  if (datas.sheets.Teams) {
    datas.sheets.Teams.forEach(team => {
      if (team.Team === 'Hungary') {
        hungarian_team = team
      }
    })
    const teamDiv = document.querySelector('.team')
    teamDiv.innerHTML = ''
    const table = document.createElement('table')
    table.classList.add('teamTable')
    teamDiv.appendChild(table)
    for (const key in hungarian_team) {
      if (Object.hasOwnProperty.call(hungarian_team, key)) {
        if (!((key === 'Byline') || (key === 'Bio') || (key === 'strengths') || (key === 'weaknesses'))) {
          let row = table.insertRow()
          row.insertCell().innerHTML = key
          row.insertCell().innerHTML = hungarian_team[key]
        }
      }
    }
  }
}

const fillPlayersData = (datas) => {
  if (datas.sheets.Players) {

    let players = datas.sheets.Players.sort(compare).sort(compare2)

    const playersDiv = document.querySelector('.players')
    playersDiv.innerHTML = ''
    const table = document.createElement('table')
    table.classList.add('playersTable')
    playersDiv.appendChild(table)

    players.forEach(player => {
      let row = table.insertRow()
      console.log(player.name)
      row.insertCell().innerHTML = player.name
      row.insertCell().innerHTML = player.position
      row.insertCell().innerHTML = player.club
    })
  }
}

const compare = (a, b) => {
  let clubOne = a.club
  let clubTwo = b.club
  if (clubOne < clubTwo) {
    return -1
  }
  if (clubOne > clubTwo) {
    return 1
  }
  return 0
}

const compare2 = (a, b) => {
  let positionOne = a.position
  let positionTwo = b.position
  if (positionOne < positionTwo) {
    return -1
  }
  if (positionOne > positionTwo) {
    return 1
  }
  return 0
}

start(team_url)
start(players_url)