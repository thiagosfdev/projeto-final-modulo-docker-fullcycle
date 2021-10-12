const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
}
const con = mysql.createConnection(config)

con.connect((err) => {
  if (err) return console.log('Erro connecting to database...', err)

  console.log('Connection OK!')
})

con.query('TRUNCATE TABLE people;', (err, rows) => {
  if (err) return console.log('Error truncate to database...', err)

  return console.log('Truncate OK!')
})

con.query(`INSERT INTO people(name) values('Hello World')`, (err, rows) => {
  if (err) return console.log('Erro insert query to database...', err)

  return console.log('Insert OK!')
})

let people = []
con.query('SELECT * FROM people', (err, rows) => {
  if (err) return console.log('Erro select query to database...', err)

  people = rows

  return console.log('Select OK!')
})

con.end((err) => {
  if (err) return console.log('Erro to finish connection...', err)

  console.log('Connection finish OK!')
})

app.get('/', (_req, res) => {
  return res.json({ api: 'started' })
})

app.get('/peoples', (_req, res) => {
  return res.json({ people })
})

app.listen(port, () => {
  console.log(`🖐️  Server running in 👉 http://localhost:${port} 👍`);
})
