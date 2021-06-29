import config from '../config.js';

const { Pool } = require('pg')
const pool = new Pool()
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}

const { Client } = require('pg')

const client = new Client()

await client.connect()

const res = await client.query('SELECT $1::text as message', ['Hello world!'])

console.log(res.rows[0].message) // Hello world!

await client.end()