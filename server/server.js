const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')

//switch between dbs based on env vars???
// const db = require('../database/mongo/seed')
const db = require('../database/postgres/seed')

const cors = require('cors')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

let usr = process.env.USER
console.log('usr: ', usr)

//how do i route all requests through controllers?
app.get('/reviews/:productid', function(req, res) {
  return db.getReviews(req.params.productid)
    .then((reviews) => {
      console.log('reviews: ', reviews);
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(reviews));
    })
})

//retrieves a product's average rating from db
app.get('/averagerating/:productid', function(req, res) {
  return db.getAverageRating(req.params.productid)
    .then((score) => {
      res.setHeader('content-type', 'application/json');
      res.send(JSON.stringify(score));
    })
})

// app.get('/dp/:productid', function(req, res) {
//   res.setHeader('content-type', 'application/json');
//   res.sendFile(path.join(__dirname, '/../public/index.html'))
// })

//insert productid into
app.post('/newReview/:productid', (req, res) => {
  console.log('inside post')
  return db.createReview(req.params.productid, (err, data) => {
    if (err) {
      res.setHeader('content-type', 'application/json');
      res.status(400).send();
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(201).send(JSON.stringify(data));
    }
  });
})

app.put('/editedReview/:reviewId', (req, res) => {
  console.log('in edit')
  return db.editReview(req.params.reviewId, (err, data) => { //model code
    if (err) {
      res.setHeader('content-type', 'application/json');
      res.status(400).send();
    } else {
      res.setHeader('content-type', 'application/json');
      res.status(201).send(JSON.stringify(`${req.params.reviewId} edited`));
    }
  });
})

app.delete('/deletedReview/:reviewId', (req, res) => {
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