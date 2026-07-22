const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'goodreads.db')

let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
    process.exit(1)
  }
}
initializeDBAndServer()

// Get Books API
app.get('/books/', async (request, response) => {
  const getBooksQuery = `
  SELECT
    *
  FROM
    book
  ORDER BY
    book_id;`
  const booksArray = await db.all(getBooksQuery)
  response.send(booksArray)
})

app.post('/users/', async (req, res) => {
  const {username, name, password, gender, location} = req.body
  const passwordHash = await bcrypt.hash(password, 10)
  const selectUserQuery = `select * from user where username = '${username}';`
  const dbUser = await db.get(selectUserQuery)
  if (dbUser === undefined) {
    // create new user
    const createUserQuery = `
  INSERT INTO
    user (username, name, password, gender, location)
  VALUES
    (
      '${username}',
      '${name}',
      '${passwordHash}',
      '${gender}',
      '${location}'  
    );`
    await db.run(createUserQuery)
    res.send('User Created Successfully')
  } else {
    // user already exist
    res.status(400)
    res.send('User already exist.')
  }
})

app.post('/login/', async (req, res) => {
  const {username, password} = req.body
  const selectUserQuery = `select * from user where username = '${username}';`
  const dbUsed = await db.get(selectUserQuery)

  if (dbUsed === undefined) {
    res.status(400)
    res.send('Invalid User')
  } else {
    const passwordMatch = await bcrypt.compare(password, dbUsed.password)
    if (passwordMatch) {
        res.send('Login Successful')
    } else {
      res.status(400)
      res.send('Invalid Password')
    }
  }
})
