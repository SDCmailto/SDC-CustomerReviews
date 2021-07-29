require('newrelic');
const express = require('express')
const parser = require('body-parser');
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const router = require('../routes.js');
const models = require('../models/index.js');

const app = express()

const mode = process.env.NODE_ENV;
console.log(`hi bebe you are in ${mode}`);

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(parser.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))
app.use(router);

app.post('/newReview/:productid', async (req, res) => {
  let productid = req.params.productid
  let review = req.body.body;
  let result = await models.postgres.reviews.createNewReview(productid, review)
  res.setHeader('content-type', 'application/json');
  res.status(201).send(result)
});

module.exports = app;
