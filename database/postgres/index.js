const { Client } = require('pg')
const config = require('../../config.js')

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'hannahmanfredi',
  password: config.postgres.password,
})

const db = await client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!'])
console.log(res.rows[0].message) // Hello world!

// await client.end()

module.exports = {db};