//pass data between models and client
const models = require('../models');

module.exports = {
  postgres: {
    get: {
      reviews: () => {
        console.log('inside postgres.get.reviews')
      }
      averageRating: () => {
        console.log('inside postgres.get.averageRating')
      }
    },
    post: () => {
      console.log('inside postgres.post')
    },
    put: () => {
      console.log('inside postgres.put')
    },
    delete: () => {
      console.log('inside postgres.delete')
    }
  }
  neo4j: {
    get: {
      reviews: () => {
        console.log('inside neo4j.get.reviews')
      }
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
      reviews: () => {
        console.log('inside mongo.get.reviews')
      }
      averageRating: () => {
        console.log('inside mongo.get.averageRating')
      }
    },
    post: () => {
      console.log('inside mongo.post')
    },
    put: () => {
      console.log('inside mongo.put')
    },
    delete: () => {
      console.log('inside mongo.delete')
    }
  }
}