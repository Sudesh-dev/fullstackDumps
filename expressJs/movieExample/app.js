const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'moviesData.db')

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

app.get('/movies/', async (request, response) => {
  const getMoviesQuery = `select movie_name as movieName from movie;`
  const moviesList = await db.all(getMoviesQuery)
  response.send(moviesList)
})

app.post('/movies/', async (request, response) => {
  const movieDetails = request.body

  const {directorId, movieName, leadActor} = movieDetails

  const postMovieQuery = `
    insert into movie (director_id , movie_name , lead_actor ) values ( ${directorId}, '${movieName}', '${leadActor}');
  `
  await db.run(postMovieQuery)
  response.send('Movie Successfully Added')
});

app.get('/movies/:movieId/', async(request,response)=>{
  const {movieId} = request.params;
  const getMoviesById = `select movie_id as movieId, director_id as directorId, movie_name as movieName, lead_actor as leadActor from movie where movie_id = ${movieId};`
  const singleMovie = await db.get(getMoviesById);
  response.send(singleMovie);
});

app.put('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params;
  const movieDetails = request.body;
  const {directorId, movieName, leadActor} = movieDetails;
  const updateMovieQuery = `update movie set director_id = ${directorId}, movie_name = '${movieName}', lead_actor = '${leadActor}' where movie_id = ${movieId};`
  await db.run(updateMovieQuery);
  response.send('Movie Details Updated');
});

app.delete('/movies/:movieId/', async (request, response) => {
  const {movieId} = request.params;
  const deleteMovieQuery = `
    delete from movie where movie_id = ${movieId};
  `
  await db.run(deleteMovieQuery)
  response.send('Movie Removed')
});

app.get('/directors/', async (request, response) => {
  const getDirecortsQuery = `select director_id as directorId, director_name as directorName from director;`
  const directorList = await db.all(getDirecortsQuery);
  response.send(directorList);
})

app.get('/directors/:directorId/movies/', async (request, response) => {
  const {directorId} = request.params;
  const getDirecortsMovie = `select movie_name as movieName from movie where director_id = ${directorId};`
  const directormovieList = await db.all(getDirecortsMovie);
  response.send(directormovieList);
})

module.exports = app
