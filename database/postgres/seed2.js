const client = require('./index.js')
const faker = require('faker');

const seed = async () => {

  const min = 100;
  for (let i = 0; i <= 10; i++) {
    let totalReviews = faker.datatype.number(3000)
    let random = Math.floor(Math.random() * (totalReviews - min + 1) + min)
    let product = {
      avgRating: faker.datatype.number({
        'min': 1,
        'max': 5,
        precision: .1
      }),
      totalReviews: totalReviews,
      totalRatings: faker.datatype.number((totalReviews - random))
    }

    let q = `INSERT INTO products(avgRating, totalReviews, totalRatings) VALUES(${product.avgRating}, ${product.totalReviews}, ${product.totalRatings})`;

    await client.client.query(q, (err, res) => {
        if (err) {
          throw err
        } else {
          console.log(res)
        }
      });
  }

// COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount);

}

seed()

module.exports.seed = seed;