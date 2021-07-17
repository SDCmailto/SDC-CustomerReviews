const controllers = require('../controllers')
const db = require('../../database/postgres/index.js')

module.exports = {
  postgres: {
    products: {
      findAvgRating: async (productId) => {
        const avgRating = await db.findAvgRating(productId)
        return avgRating;
      },
    },
    reviews: {
      findAllReviews: async (productId) => {
        const reviews = await db.findAllReviews(productId)
        return reviews[0];
      },
      createNewReview: async (productid, review) => {
        console.log('inside create new review')
        const mssg = await db.createReview(productid, review)
        return mssg;
      }
    },
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
  }
}