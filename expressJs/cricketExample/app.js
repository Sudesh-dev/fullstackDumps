const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'cricketTeam.db')

let db = null

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}

initializeDbServer()

app.get('/players/', async (request, response) => {
  const getPlayersQuery = `
    select player_id as playerId, player_name as playerName, jersey_number as jerseyNumber, role from cricket_team
  `
  const players = await db.all(getPlayersQuery)
  response.send(players)
})

app.post('/players/', async (request, response) => {
  const playerDetails = request.body;

  const {playerName, jerseyNumber, role} = playerDetails
  const postPlayersQuery = `
    insert into cricket_team (player_name , jersey_number , role ) values ( '${playerName}', ${jerseyNumber}, '${role}');
  `
  await db.run(postPlayersQuery)
  response.send('Player Added to Team');
})

app.get('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const getPlayersQuery = `
    select player_id as playerId, player_name as playerName, jersey_number as jerseyNumber, role from cricket_team where player_id = ${playerId};
  `
  const player = await db.get(getPlayersQuery)
  response.send(player)
})

app.put('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const playerDetails = request.body
  const {playerName, jerseyNumber, role} = playerDetails
  const updatePlayerQuery = `update cricket_team set player_name = '${playerName}', jersey_number = ${jerseyNumber}, role = '${role}' where player_id = ${playerId}`
  await db.run(updatePlayerQuery)
  response.send('Player Details Updated')
})

app.delete('/players/:playerId/', async (request, response) => {
  const {playerId} = request.params
  const deletePlayersQuery = `
    delete from cricket_team where player_id = ${playerId};
  `
  await db.run(deletePlayersQuery)
  response.send('Player Removed')
})

module.exports = app
