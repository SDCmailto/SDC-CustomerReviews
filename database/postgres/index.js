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

// pool.query(`COPY users FROM '../../users.csv' WITH (FORMAT csv)`, (err, res) => {
//     console.log(err, res)
// })

// pool.query(`COPY products FROM '../../products.csv' WITH (FORMAT csv)`, (err, res) => {
//     console.log(err, res)
// })

// const reviews = ['../../reviews.csv', '../../reviews1.csv', '../../reviews2.csv', '../../reviews3.csv', '../../reviews.csv4', '../../reviews.csv5', '../../reviews.csv6', '../../reviews.csv7', '../../reviews.csv8', '../../reviews.csv9', '../../reviews.csv10']

// reviews.forEach((reviewCsv, i) => {
//     pool.query(`COPY reviews FROM ${reviews[i]} WITH (FORMAT csv)`, (err, res) => {
//         console.log(err, res)
//     })
// })

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    },
};

