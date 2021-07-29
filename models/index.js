const controllers = require('../controllers')
const db = require('../database/postgres/index.js')

module.exports = {
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
    },
    updateReview: async (productid, review) => {
      console.log('inside create updateReview')
      const mssg = await db.updateReview(productid, review)
      return mssg;
    },
    deleteReview: async (productid, review) => {
      console.log('inside create deleteReview')
      const mssg = await db.deleteReview(productid, review)
      return mssg;
    }
  }
}