const mongoose = require('mongoose');
const db = require('./mongoose.js');
const faker = require('faker');

const reviewsSchema = new mongoose.Schema({
  productId: String,
  userName: String,
  rating: Number,
  title: String,
  location: String,
  reviewDate: Date,
  reviewBody: String,
  helpfulCount: Number,
  abuseReported: Boolean
})

const averageRatingSchema = new mongoose.Schema({
  productId: String,
  totalReviews: Number,
  averageRating: Number
})

const averageRating= mongoose.model('AverageRating', averageRatingSchema);
const Review = mongoose.model('Review', reviewsSchema);

let seed = () => {
  for (let i = 0; i <= 3000; i++) {
    let newReview = new Review({
      productId: faker.datatype.number(100),
      userName: faker.internet.userName(),
      rating: faker.datatype.number(5),
      title: faker.lorem.words(),
      location: faker.address.country(),
      reviewDate: faker.date.past(),
      reviewBody: faker.lorem.paragraph(),
      helpfulCount: faker.datatype.number(2000),
      abuseReported: faker.datatype.boolean()
    })
    newReview.save(function(err, success) {
      if (err) {
        console.log('error saving to the database')
      }
    })
  }

  for (let i =1; i <= 100; i++) {
    let newAverageRating = new averageRating({
      productId: i,
      totalReviews: faker.datatype.number(3000),
      averageRating: faker.datatype.number({
        'min': 1,
        'max': 5,
        precision: .1
    }),
    })
    newAverageRating.save(function(err, success){
      if (err) {
        console.log('error saving to the database')
      }
    })

  }
}

const getReviews = (product) => {
  console.log('get reviews is running');
  console.log(product);
  return Review.find({productId : product})
}

const getAverageRating = (product) => {
  return averageRating.findOne({productId : product})
}

const createReview = (product, cb) => {
  let newReview = new Review({
    productId: faker.datatype.number(100),
    userName: faker.internet.userName(),
    rating: faker.datatype.number(5),
    title: faker.lorem.words(),
    location: faker.address.country(),
    reviewDate: faker.date.past(),
    reviewBody: faker.lorem.paragraph(),
    helpfulCount: faker.datatype.number(2000),
    abuseReported: faker.datatype.boolean()
  })
  newReview.save(function(err, success) {
    if (err) {
      console.log('err: ', err);
      cb(err)
    } else {
      cb()
    }
  })
}

const deleteReview = async (reviewid, cb) => {
  await Review.findById(reviewid).exec()
    .then(data => {
      console.log('data: ', data)
      Review.deleteOne(data).exec()
      cb();
    })
    .catch((err) => {
      cb(err);
    });
}

const editReview = async (id, cb) => {
  await Review.findOneAndUpdate(id).exec()
  .then(data => {
    cb();
  })
  .catch((err) => {
    cb(err);
  });
}

seed();

module.exports.getReviews = getReviews;
module.exports.getAverageRating = getAverageRating;
module.exports.createReview = createReview;
module.exports.deleteReview = deleteReview;
module.exports.editReview = editReview;
module.exports.seed = seed;
