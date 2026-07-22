const express = require('express')
const path = require('path')
const {open} = require('sqlite')
const sqlite3 = require('sqlite3')
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
const dbPath = path.join(__dirname, 'userData.db')

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

app.post('/register', async (req, res) => {
  const {username, name, password, gender, location} = req.body
  if (password.length < 5) {
    res.status(400)
    return res.send('Password is too short')
  }
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
    res.send('User created successfully')
  } else {
    // user already exist
    res.status(400)
    res.send('User already exists')
  }
})

app.post('/login', async (req, res) => {
  const {username, password} = req.body
  const selectUserQuery = `select * from user where username = '${username}';`
  const dbUsed = await db.get(selectUserQuery)

  if (dbUsed === undefined) {
    res.status(400)
    res.send('Invalid user')
  } else {
    const passwordMatch = await bcrypt.compare(password, dbUsed.password)
    if (passwordMatch) {
      res.send('Login success!')
    } else {
      res.status(400)
      res.send('Invalid password')
    }
  }
})

app.put('/change-password', async (req, res) => {
  const {username, oldPassword, newPassword} = req.body

  const selectUserQuery = `select * from user where username = '${username}';`
  const dbUser = await db.get(selectUserQuery)

  const correctOldPassword = await bcrypt.compare(oldPassword, dbUser.password)
  if (correctOldPassword) {
    if (newPassword.length < 5) {
      res.status(400)
      return res.send('Password is too short')
    }
    const newPassHash = await bcrypt.hash(newPassword, 10)
    const updatePassQuery = `update user set password = '${newPassHash}' where username = '${username}'`
    await db.run(updatePassQuery)
    res.send('Password updated')
  } else {
    res.status(400)
    res.send('Invalid current password')
  }
})

module.exports = app
