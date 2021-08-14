const compression = require('compression')
const express = require('express')
const parser = require('body-parser');
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const router = require('../routes.js');
const models = require('../models/index.js');

const app = express()

app.use(compression());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(parser.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))
app.use(router);

const sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
};
app.get('/:dp', sendIndex);
app.get('*/dp/:productId', sendIndex);

app.post('/newReview/:productid', async (req, res) => {
  let productid = req.params.productid;
  let review = req.body.body || req.body;
  let result = await models.reviews.createNewReview(productid, review)
  res.setHeader('content-type', 'application/json');
  res.status(201).send(result)
});

module.exports = app;
