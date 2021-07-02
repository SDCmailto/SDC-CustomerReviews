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

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

app.use(router);

// app.get('/reviews/:productid', function(req, res) {
//   return db.getReviews(req.params.productid)
//     .then((reviews) => {
//       console.log('reviews: ', reviews);
//       res.setHeader('content-type', 'application/json');
//       res.send(JSON.stringify(reviews));
//     })
// })

// app.get('/averagerating/:productid', function(req, res) {
//   return db.getAverageRating(req.params.productid)
//     .then((score) => {
//       res.setHeader('content-type', 'application/json');
//       res.send(JSON.stringify(score));
//     })
// })

// app.post('/newReview/:productid', (req, res) => {
//   console.log('inside post')
//   return db.createReview(req.params.productid, (err, data) => {
//     if (err) {
//       res.setHeader('content-type', 'application/json');
//       res.status(400).send();
//     } else {
//       res.setHeader('content-type', 'application/json');
//       res.status(201).send(JSON.stringify(data));
//     }
//   });
// })

// app.put('/editedReview/:reviewId', (req, res) => {
//   console.log('in edit')
//   return db.editReview(req.params.reviewId, (err, data) => {
//     if (err) {
//       res.setHeader('content-type', 'application/json');
//       res.status(400).send();
//     } else {
//       res.setHeader('content-type', 'application/json');
//       res.status(201).send(JSON.stringify(`${req.params.reviewId} edited`));
//     }
//   });
// })

// app.delete('/deletedReview/:reviewId', (req, res) => {
//   return db.deleteReview(req.params.reviewId, (err, data) => {
//     if (err) {
//       res.setHeader('content-type', 'application/json');
//       res.status(400).send();
//     } else {
//       res.setHeader('content-type', 'application/json');
//       res.status(200).send(JSON.stringify(`${req.params.reviewId} deleted`));
//     }
//   });
// })

