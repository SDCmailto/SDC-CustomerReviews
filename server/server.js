const express = require('express')
const parser = require('body-parser');
const path = require('path')
const morgan = require('morgan');
const cors = require('cors')
const router = require('./routes.js');
const nconf = require('../config');

const app = express()
  api = express();
module.exports = app;
module.exports = api;

app.use(nconf.get("api_path"), api);
app.use(require('../database/neo4j/index.js'));
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(morgan('dev'));

api.use(parser.json());
api.use(parser.urlencoded({ extended: true }));
api.use(express.json())
api.use(cors());
api.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

api.use(router);


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