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

// const neode = require('neode')
//     .fromEnv()
//     .withDirectory(path.join(__dirname, '../database/neo4j/models'));

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

// app.use(session({
//   genid: function() {
//       return require('uuid').v4();
//   },
//   resave: false,
//   saveUninitialized: true,
//   secret: 'faulkner'
// }));

app.use(router);


