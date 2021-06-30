const { Pool, Client } = require('pg')

const pool = new Pool()
const connectPool = async () => {
const res = await pool.query('SELECT NOW()')
await pool.end()
}

connectPool();

const client = new Client()
const connection = async () => {
  await client.connect(() => {
    console.log('Postgres connected')
  })
  const res = await client.query('SELECT NOW()')
  await client.end()
}

connection()
