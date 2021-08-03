const express = require('express')
const parser = require('body-parser');
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const router = require('../routes.js');
const models = require('../models/index.js');

const app = express()

const mode = process.env.NODE_ENV;

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(parser.urlencoded({ extended: true}))
app.use(express.json())
app.use(cors());
app.use(morgan('dev'))
app.use(router);

// const allowedOrigins = [
//   'http://localhost:3000/',
//   'http://67.160.218.95:3004',
//   'http://67.160.218.95:3000',
//   'http://67.160.218.95:80',
//   'http://67.160.218.95',
// ];

// app.use(cors({ origin: allowedOrigins }));

const sendIndex = (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
};

app.get('/:dp', sendIndex);
app.get('*/dp/:productId', sendIndex);

app.post('/newReview/:productid', async (req, res) => {
  let productid = req.params.productid
  let review = req.body.body;
  let result = await models.reviews.createNewReview(productid, review)
  res.setHeader('content-type', 'application/json');
  // res.setHeader('Access-Control-Allow-Origin:',  '*')
  res.status(201).send(result)
});

module.exports = app;
