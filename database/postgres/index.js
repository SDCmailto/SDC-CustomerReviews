const { Pool } = require('pg')
const { host, user, database, password, port } = require('../../config');

// const copyTo = require('pg-copy-streams').from
// const fs = require('fs');
// const csv = require('./src/output.csv')
// const seed = require('./seed.js')
// const config = require('../../config.js')

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    },
};