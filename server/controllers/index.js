const models = require('../models/index.js');

module.exports = {
  postgres: {
    get: {
      reviews: {
        handler: (req, res) => {
          // console.log('inside postgres.get.reviews: ', req)
          // console.log('inside postgres.get.reviews: ', Number(req.params))
          // models.postgres.reviews.findAllReviews(productId, (err, data) => {
          //   if (err) {
          //     res.status(201).send('error retrieving reviews')
          //   } else {
          //     res.setHeader('content-type', 'application/json');
          //     res.status(200).send(JSON.stringify(data))
          //   }
          // })
        },
        config: {
          description: "Gets all the reviews available for a given product Id"
        }
      },
      averageRating: {
        handler: () => {
          console.log('inside postgres.get.averagerating')
          //get productId from req
          // models.postgres.reviews.findAvgRating(productId)
        },
        config: {
          description: "Gets the average rating for a given product Id"
        }
      }
    },
    post: {
      handler: () => {
        console.log('inside postgres.post')
        //invoke model
      },
      config: {
        description: "Creates a new review for given product Id and user Id"
      }
    },
    put: {
      handler: () => {
      console.log('inside postgres.put')
      //invoke model
      },
      config: {
        description: "Updates a review for given product Id and user Id"
      }
    },
    delete: {
      handler: () => {
      console.log('inside postgres.delete')
      //invoke model
      },
      config: {
        description: "Deletes a review for given product Id and user Id"
      }
    }
  }
}