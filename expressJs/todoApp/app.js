const express = require('express')
const app = express()
app.use(express.json())
const path = require('path')

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const dbPath = path.join(__dirname, 'todoApplication.db')

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

app.get('/todos/', async (req, res) => {
  const {status, priority, search_q = ''} = req.query

  let getTodosQuery = ''

  if (status !== undefined && priority !== undefined) {
    getTodosQuery = `
      SELECT *
      FROM todo
      WHERE status='${status}' AND priority='${priority}';
    `
  } else if (status !== undefined) {
    getTodosQuery = `
      SELECT *
      FROM todo
      WHERE status='${status}';
    `
  } else if (priority !== undefined) {
    getTodosQuery = `
      SELECT *
      FROM todo
      WHERE priority='${priority}';
    `
  } else {
    getTodosQuery = `
      SELECT *
      FROM todo
      WHERE todo LIKE '%${search_q}%';
    `
  }

  const dbResponse = await db.all(getTodosQuery)
  res.send(dbResponse)
})

app.get('/todos/:todoId/', async (req, res) => {
  const {todoId} = req.params

  const priorityQuery = `select * from todo where id ='${todoId}' ;`
  const todoPriority = await db.get(priorityQuery)
  res.send(todoPriority)
})

app.post('/todos/', async (req, res) => {
  const {id, todo, priority, status} = req.body
  const postTodoQuery = `insert into todo (id, todo, priority, status) values ( ${id}, '${todo}', '${priority}', '${status}');`
  await db.run(postTodoQuery)
  res.send('Todo Successfully Added')
})

app.put('/todos/:todoId/', async (req, res) => {
  const {todoId} = req.params
  const {status, priority, todo} = req.body

  let updateQuery = ''
  let responseText = ''

  switch (true) {
    case status !== undefined:
      updateQuery = `
        UPDATE todo
        SET status='${status}'
        WHERE id=${todoId};
      `
      responseText = 'Status Updated'
      break

    case priority !== undefined:
      updateQuery = `
        UPDATE todo
        SET priority='${priority}'
        WHERE id=${todoId};
      `
      responseText = 'Priority Updated'
      break

    case todo !== undefined:
      updateQuery = `
        UPDATE todo
        SET todo='${todo}'
        WHERE id=${todoId};
      `
      responseText = 'Todo Updated'
      break
  }

  await db.run(updateQuery)
  res.send(responseText)
})

app.delete('/todos/:todoId/', async (req,res)=>{
  const {todoId} = req.params 
  const deletQuery = `delete from todo where id = ${todoId};`
  await db.run(deletQuery)
  res.send('Todo Deleted')
})

module.exports = app
