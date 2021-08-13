const models = require('../models/index.js');
const http = require('http');
const parser = require('body-parser');

module.exports = {
  postgres: {
    get: {
      allReviews: {
        handler: async (req, res) => {
          console.log('in: ', in)
          let productid = req.params.productid
          const reviews = await models.reviews.findAllReviews(productid);
          console.log('reviews: ', reviews);
          res.setHeader('content-type', 'application/json');
          if (!reviews.length) {
            res.status(500).send('ERROR, there are no existing reviews for this product')
          } else {
            res.status(200).send(reviews)
          }
        },
        config: {
          description: "Gets all the reviews available for a given product Id"
        }
      },
      products: {
        handler: async (req, res) => {
          let productid = req.params.productid
          let review = req.body.body;
          const avgRating = await models.products.findAvgRating(productid)
          res.setHeader('content-type', 'application/json');
          // res.setHeader('Access-Control-Allow-Origin:',  '*')
          if (!avgRating) {
            res.send('ERROR, this product has not yet been rated!')
          } else {
            res.status(200).send(avgRating)
          }
        },
        config: {
          description: "Gets the average rating for a given product Id"
        }
      }
    },
    put: {
      handler: async (req, res) => {
        console.log('inside postgres.put')
        let productid = req.params.productid
        let reviewid = req.body.body;
        console.log('reviewid: ', reviewid)
        const updatedReview = await models.reviews.updateReview(productid, reviewid);
        res.setHeader('content-type', 'application/json');
        // res.setHeader('Access-Control-Allow-Origin:',  '*')
        res.status(200).send('updated')
      },
      config: {
        description: "Updates a review for given product Id and user Id"
      }
    },
    delete: {
      handler: async (req, res)  => {
        console.log('inside postgres.delete')
        let productid = req.params.productid
        let reviewid = req.body.body;
        const deletedReview = await models.reviews.deleteReview(productid, reviewid);
        res.setHeader('content-type', 'application/json');
        // res.setHeader('Access-Control-Allow-Origin:',  '*')
        res.status(200).send('deleted')
      },
      config: {
        description: "Deletes a review for given product Id and user Id"
      }
    }
  }
}