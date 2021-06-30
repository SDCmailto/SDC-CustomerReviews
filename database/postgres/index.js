const { Pool, Client } = require('pg')
const seed = require('./seed.js')

const pool = new Pool()
const connectPool = async () => {
const res = await pool.query('SELECT NOW()')
await pool.end()
}

connectPool();

const client = new Client()
let db;

const connection = async () => {
  db = await client.connect(() => {
    console.log('Postgres connected')
  })
  const res = await client.query('SELECT NOW()')
  // await client.end()
}

connection()

module.exports = {db}
