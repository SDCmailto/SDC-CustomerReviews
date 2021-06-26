const request = require('supertest');
const express = require('express');

const app = require("../server/server.js");

//Create
describe('POST /writeReview/:productid', () => {

  let data = JSON.stringify({
    "_id": "60d4edad3ce29b573e6e1b9a",
    "productId": "1",
    "userName": "Gerry_Weimann",
    "rating": "0",
    "title": "asperiores quaerat quasi",
    "location": "Antarctica (the territory South of 60 deg S)",
    "reviewDate": "2020-07-20T05:21:57.279Z",
    "reviewBody": "Voluptatibus veritatis hic libero et consequatur nobis ab impedit. Optio numquam aut in alias iste facilis. Voluptas temporibus ut nulla odit qui ipsa saepe aut enim. Repellat natus vel eum consectetur reiciendis odit tempore enim voluptatem.",
    "helpfulCount": "1489",
    "abuseReported": "false",
    "__v": "0"
  });

  it('should respond with a status code of 201 when a new review is created', (done) => {
      request(app)
          .post('/writeReview/:productid')
          .send(data)
          .set('Accept', 'application/json')
          .expect("Content-Type", 'application/json')
          .expect(201)
          .end((err) => {
              if (err) return done(err);
              done();
          });
  });
});

//Read
describe('GET /reviews/:productid', () => {
  it('should respond with json containing a list of fake user reviews', function (done) {
      request(app)
          .get('/reviews/:productid')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});

//Update
describe('PUT /editReview/:reviewId', () => {
  it('should respond with the id of the review that was updated', function (done) {
      request(app)
          .put('/editReview/:reviewId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, done);
  });
});


//Delete
describe('DELETE /deleteReview/:reviewId', () => {
  it('should respond with the id of the review that was deleted', function (done) {
      request(app)
          .delete('/deleteReview/:reviewId')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});