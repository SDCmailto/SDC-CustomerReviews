const express = require('express')
const parser = require('body-parser');
const path = require('path')
const cors = require('cors')
const router = require('./routes.js');

const app = express()
  api = express();
  couchDb = express();
module.exports = app;
module.exports = api;

app.use(express.static(path.join(__dirname, "..", "public")))

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

