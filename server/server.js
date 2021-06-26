const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const db = require('../db/seed')
const cors = require('cors')

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

app.get('/reviews/:productid', function(req, res) {
  return db.getReviews(req.params.productid)
    .then((reviews) => {
      console.log('reviews: ', reviews);
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(reviews));
    })
})

app.get('/averagereview/:productid', function(req, res) {
  return db.getAverageReviews(req.params.productid)
    .then((score) => {
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(score));
    })
})

app.get('/dp/:productid', function(req, res) {
  res.setHeader('content-type', 'application/json');
  res.sendFile(path.join(__dirname, '/../public/index.html'))
})

app.post('/writeReview/:productid', (req, res) => {
  console.log('inside post')
  return db.createReview(req.params.productid, (err, data) => {
    if (err) {
      res.status(400).send();
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(201).send(JSON.stringify(data));
    }
  });
})

app.put('/editReview/:reviewId', (req, res) => {
  console.log('in edit')
  return db.editReview(req.params.reviewId, (err, data) => {
    if (err) {
      res.setHeader('content-type', 'application/json');
      res.status(400).send();
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(201).send(JSON.stringify(`${req.params.reviewId} edited`));
    }
  });
})

app.delete('/deleteReview/:reviewId', (req, res) => {
  return db.deleteReview(req.params.reviewId, (err, data) => {
    if (err) {
      res.setHeader('content-type', 'application/json');
      res.status(400).send();
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(200).send(JSON.stringify(`${req.params.reviewId} deleted`));
    }
  });
})

module.exports = app;