const { Pool, Client} = require('pg')
const { host, user, database, password, port } = require('../../config');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

pool.connect()

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    }
};

