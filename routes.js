var controller = require('./controllers/index.js');
var router = require('express').Router();

router.get('/reviews/:productid', controller.postgres.get.allReviews.handler);

router.get('/averagerating/:productid', controller.postgres.get.products.handler);

router.put('/editedReview/:reviewId', controller.postgres.put.handler);

router.delete('/deletedReview/:reviewId', controller.postgres.delete.handler);

module.exports = router;