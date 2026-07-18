const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'covid19India.db')

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

app.get('/states/', async (request, response) => {
  const getStatesQuery = `select state_id as stateId, state_name as stateName, population from state;`
  const moviesList = await db.all(getStatesQuery)
  response.send(moviesList)
})

app.get('/states/:stateId/', async (request, response) => {
  const {stateId} = request.params
  const getStateQuery = `select state_id as stateId, state_name as stateName, population from state where state_id = ${stateId};`
  const singleState = await db.get(getStateQuery)
  response.send(singleState)
})

app.post('/districts/', async (request, response) => {
  const stateDetails = request.body

  const {districtName, stateId, cases, cured, active, deaths} = stateDetails

  const postDistrictQuery = `
    insert into district (district_name , state_id , cases, cured, active, deaths ) values ( '${districtName}', ${stateId}, ${cases}, ${cured}, ${active}, ${deaths});
  `
  await db.run(postDistrictQuery)
  response.send('District Successfully Added')
})

app.get('/districts/:districtId/', async (request, response) => {
  const { districtId } = request.params;

  const getDistrictQuery = `
    SELECT
      district_id AS districtId,
      district_name AS districtName,
      state_id AS stateId,
      cases,
      cured,
      active,
      deaths
    FROM district
    WHERE district_id = ${districtId};
  `;

  const singleDistrict = await db.get(getDistrictQuery);
  response.send(singleDistrict);
});

app.delete('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const deleteMovieQuery = `
    delete from district where district_id  = ${districtId};
  `
  await db.run(deleteMovieQuery)
  response.send('District Removed')
})

app.put('/districts/:districtId/', async (request, response) => {
  const {districtId} = request.params
  const distDetails = request.body
  const {districtName, stateId, cases, cured, active, deaths} = distDetails
   const updateDistrictQuery = `
    UPDATE district
    SET
      district_name = '${districtName}',
      state_id = ${stateId},
      cases = ${cases},
      cured = ${cured},
      active = ${active},
      deaths = ${deaths}
    WHERE district_id = ${districtId};
  `;
  await db.run(updateDistrictQuery)
  response.send('District Details Updated')
})



app.get('/states/:stateId/stats/', async (request, response) => {
  const {stateId} = request.params
  const getStateInfo = `select SUM(cases) as totalCases, sum(cured) as totalCured, sum(active) as totalActive, sum(deaths) as totalDeaths from district where state_id = ${stateId};`
  const stateStats = await db.get(getStateInfo)
  response.send(stateStats)
})

app.get('/districts/:districtId/details/', async (request, response) => {
  const {districtId} = request.params
  const getStateInfo = `select state_name as stateName from district inner join state on district.state_id = state.state_id where district.district_id = ${districtId};`
  const stateStats = await db.get(getStateInfo)
  response.send(stateStats)
})
module.exports = app
