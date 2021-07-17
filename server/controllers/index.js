const models = require('../models/index.js');
const parser = require('body-parser');

module.exports = {
  postgres: {
    get: {
      allReviews: {
        handler: async (req, res) => {
          let productid = req.params.productid
          const reviews = await models.postgres.reviews.findAllReviews(productid);
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
          const avgRating = await models.postgres.products.findAvgRating(productid)
          res.setHeader('content-type', 'application/json');
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
    post: {
      handler: (req, res) => {
        console.log('inside postgres.post')
        let productid = req.params.productid
        //get productid and review
        console.log('post req: ', req)
        // models.postgres.reviews.createNewReview()
      },
      config: {
        description: "Creates a new review for given product Id and user Id"
      }
    },
    put: {
      handler: (req, res) => {
      console.log('inside postgres.put')
      //invoke model
      },
      config: {
        description: "Updates a review for given product Id and user Id"
      }
    },
    delete: {
      handler: (req, res) => {
      console.log('inside postgres.delete')
      //invoke model
      },
      config: {
        description: "Deletes a review for given product Id and user Id"
      }
    }
  }
}