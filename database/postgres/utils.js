const faker = require('faker');
const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const fastcsv = require('fast-csv');
const postgresDb = require('./index');
const contains = require('validator/lib/contains');

module.exports = {
  createProducts: () => {
    let products = [];
    const min = 100
    for (let i = 0; i < 1000000; i++) {
      let totalReviews = faker.datatype.number(3000)
      let random = Math.floor(Math.random() * (totalReviews - min + 1) + min)
      let product = {
        id: i,
        avgRating: faker.datatype.number({
          'min': 1,
          'max': 5,
          precision: .1
        }),
        totalReviews: totalReviews,
        totalRatings: faker.datatype.number((totalReviews - random))
      }
      products.push(product)
    }
    return products
  },
  createReviews: () => {
    let reviews = [];
    for (let i = 0; i < 1000000; i++) {
      let review = {
        id: i,
        title: faker.lorem.words(),
        abuseReported: faker.datatype.boolean(),
        rating: faker.datatype.number(5),
        location_: faker.address.country(),
        userId: i,
        productId: i,
        reviewDate: faker.date.past(),
        reviewBody: faker.lorem.paragraph(),
        helpfulCount: faker.datatype.number(2000),
      }
      reviews.push(review)
    }
    return reviews
  },
  createFeatures: () => {
    let features = ['Value for money', 'Blending power', 'Mobile App',  'Easy to use', 'Freshness', 'Comfort', 'Light weight', 'Easy to spread', 'Fingerprint reader', 'Airtight storage', 'Scent', 'For traveling', 'Sturdiness', 'Zoom', 'Flavor', 'Easy to clean', 'Durability', 'Easy to hold', 'Portability', 'Picture quality', 'Quality of material', 'Sheerness', 'Easy to clean', 'Maneuverability', 'Adhesion' ]
  },
  createUsers: () => {
    let users = [];
    for (let i = 0; i < 1000000; i++) {
      let user = {
        id: i,
        name_: faker.name.findName(),
        userrating: Math.floor(faker.datatype.number({
          'min': 1,
          'max': 15000,
          precision: .1
        })),
        totalreviews: faker.datatype.number(10000)
      }
      users.push(user)
    }
    return users
  },
  createProductFeatures: () => {
    let productFeatures = [];
    for (let j = 0; j < 1000000; j++) {
      let range = []
      for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * (25 - 0 + 1) + 0)
      range.push(random)
      }
      let productFeature = {
        id: j,
        productid: j,
        featureid: range
      }
      productFeatures.push(productFeature)
    }
    return productFeatures
  }
};