const request = require('supertest');
const express = require('express');
const app = require("./server.js");

//Create
app.post('/writeReview/:productid', (req, res) => {
  res.status(200);
})

request(app)
  .post('/writeReview/:productid')
  .set('Accept', 'application/json')
  .send({productId: '60d4ed4fe6d175567053163e', userName: "Tony15", rating: '2', title: "ea sit enim", location: "India", reviewDate: "2021-05-25T16:43:45.152Z", reviewBody: "Minus impedit voluptatibus quisquam conseq", helpfulCount: 1402, abuseReported: true})
  .expect('Content-Type', /json/)
  .expect(201)
  .end(function(err, res) {
    if (err) throw err;
  });

//Read
app.get('/reviews/:productid', (req, res) => {
  res.status(200);
})

request(app)
  .get('/reviews/:productid')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

//Update
app.put('/editReview/:reviewId', (req, res) => {
  res.status(200);
})

request(app)
  .put('/editReview/:reviewId')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });

//Delete
app.delete('/deleteReview/:reviewId', (req, res) => {
  res.status(200);
})

request(app)
  .put('/deleteReview/:reviewId')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
  });