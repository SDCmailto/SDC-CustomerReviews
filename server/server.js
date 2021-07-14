const express = require('express')
const parser = require('body-parser');
const path = require('path')
const cors = require('cors')
const router = require('./routes.js');

const app = express()
module.exports = app;

app.use(express.static(path.join(__dirname, "..", "public")))

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());
app.use(function (req, res, next) {
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

app.use(router);

