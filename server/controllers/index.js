const models = require('../models/index.js');

module.exports = {
  postgres: {
    get: {
      reviews: {
        handler: () => {
          console.log('inside postgres.get.reviews')
        },
        config: {
          description: "Gets all the reviews available for a given product Id"
        }
      },
      averageRating: {
        handler: () => {
          console.log('inside postgres.get.averagerating')
          //invoke model
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
  },
  neo4j: {
    get: {
      reviews: () => {
        console.log('inside neo4j.get.reviews')
      },
      averageRating: () => {
        console.log('inside neo4j.get.averageRating')
      }
    },
    post: () => {
      console.log('inside neo4j.post')
    },
    put: () => {
      console.log('inside neo4j.put')
    },
    delete: () => {
      console.log('inside neo4j.delete')
    }
  },
  mongo: {
    get: {
      reviews: (req, res) => {
        console.log('inside mongo.get.reviews')
        return models.mongo.getReviews()
      },
      averageRating: (req, res) => {
        console.log('inside mongo.get.averageRating')
        return models.mongo.getAvgRating()
      }
    },
    post: (req, res) => {
      console.log('inside mongo.post')
      return models.mongo.createReview()
    },
    put: (req, res) => {
      console.log('inside mongo.put')
      return models.mongo.updateReview()
    },
    delete: (req, res) => {
      console.log('inside mongo.delete')
      return models.mongo.deleteReview()
    }
  }
}