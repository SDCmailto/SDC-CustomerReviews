const express = require('express')
const parser = require('body-parser');
const path = require('path')
// const db = require('../database/mongo/seed')
// const db = require('../database/postgres/seed')
const morgan = require('morgan');
const cors = require('cors')
const router = require('./routes.js');

const app = express()
module.exports = app;

const neode = require('neode')
    .fromEnv()
    .withDirectory(path.join(__dirname, '../database/neo4j/models'));

app.use(require('../database/neo4j/index.js'));
app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

app.use(router);


// app.get('/', (req, res) => {
//   // Create Driver session
//   const session = req.driver.session();

//   // Run Cypher query
//   const cypher = 'MATCH (n) RETURN count(n) as count';

//   session.run(cypher)
//       .then(result => {
//           // On result, get count from first record
//           const count = result.records[0].get('count');

//           // Send response
//           res.send({count: count.toNumber()});
//       })
//       .catch(e => {
//           // Output the error
//           res.status(500).send(e);
//       })
//       .then(() => {
//           // Close the session
//           return session.close();
//       });
// });