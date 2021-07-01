const controllers = require('../controllers')
const mongo = require('../../database/mongo/index.js')
const postgres = require('../../database/postgres/index.js')

module.exports = {
  postgres: {
    products: {},
    reviews: {
      findAllReviews: (productId, cb) => {
        const query = {
          text: 'SELECT * FROM reviews WHERE id = $1'
          // values = [productId],
        };
        postgres.query(query, (err, res) => {
          if (err) {
            console.log(err.stack)
            cb(err)
          } else {
            console.log(res)
            cb(res)
          }
        })
      },
      findAvgRating: (productId) => {
        const query = {
          text: 'SELECT avgRating FROM products WHERE id = $1'
          // values: [productId]
        };
        postgres.query(query, (err, res) => {
          if (err) {
            console.log(err.stack)
            cb(err)
          } else {
            console.log(res)
            cb(res)
          }
        })
      }
    },
    users: {},
    features: {}
  },
  neo4j: {
    products: {},
    reviews: {},
    users: {},
    features: {}
  },
  mongo: {
    getReviews: () => {
      console.log('inside mongo getReviews')
      return db.getReviews(req.params.productid)
      .then((reviews) => {
        console.log('reviews: ', reviews);
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(reviews));
      })
      .catch((err) => {
        throw err;
      });
    },
    getAvgRating: () => {
      console.log('inside mongo getAvgRating')
      return db.getAverageRating(req.params.productid)
      .then((score) => {
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(score));
      })
    },
    createReview: () => {
      console.log('inside mongo createReview')
      return db.createReview(req.params.productid, (err, data) => {
        if (err) {
          res.setHeader('content-type', 'application/json');
          res.status(400).send();
        } else {
          res.setHeader('content-type', 'application/json');
          res.status(201).send(JSON.stringify(data));
        }
      });
    },
    updateReview: () => {
      console.log('inside mongo updateReview')
      return db.editReview(req.params.reviewId, (err, data) => { //model code
        if (err) {
          res.setHeader('content-type', 'application/json');
          res.status(400).send();
        } else {
          res.setHeader('content-type', 'application/json');
          res.status(201).send(JSON.stringify(`${req.params.reviewId} edited`));
        }
      });
    },
    deleteReview: () => {
      console.log('inside mongo deleteReview')
      return db.deleteReview(req.params.reviewId, (err, data) => {
        if (err) {
          res.setHeader('content-type', 'application/json');
          res.status(400).send();
        } else {
          res.setHeader('content-type', 'application/json');
          res.status(200).send(JSON.stringify(`${req.params.reviewId} deleted`));
        }
      });
    }
  },
}