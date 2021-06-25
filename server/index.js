const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3004
const path = require('path')
const db = require('../db/seed')
console.log('db: ', db)
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")))
app.use(cors());

app.listen(port, ()=>{
  console.log(`Server now listening at http://52.55.99.35:${port}`)
})

app.get('/reviews/:productid', function(req, res) {
  return db.getReviews(req.params.productid)
    .then((reviews) => {
      res.send(reviews);
    })
})

app.get('/averagereview/:productid', function(req, res) {
  return db.getAverageReviews(req.params.productid)
    .then((score) => {
      res.send(score);
    })
})

app.get('/dp/:productid', function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/index.html'))
})

app.put('/writeReview/:productid', (req, res) => {
  console.log('inside put')
  return db.createReview(req.params.productid, (err, data) => {
    if (err) {
      res.status(400).send();
    } else {
      res.send('new review added');
    }
  });

})

app.delete('/deleteReview/:reviewId', (req, res) => {
  return db.deleteReview(req.params.reviewId, (err, data) => {
    if (err) {
      res.status(400).send();
    } else {
      res.send(`${req.params.reviewId} deleted`);
    }
  });
})
