const client = require('./index.js')
const faker = require('faker');

const seed = () => {

  for (let i = 0; i <= 23; i++) {

    let date = JSON.stringify(faker.date.past()).slice(1, 11);

    let review = {
      title: faker.lorem.words().replace(/,/g, ""),
      abuseReported: faker.datatype.boolean(),
      rating: faker.datatype.number(5),
      location_: faker.address.country().replace(/,/g, ""),
      productid: Math.floor((Math. random() * 1000000) + 1),
      reviewDate: date,
      reviewBody: faker.lorem.paragraph().replace(/,/g, ""),
      helpfulCount: faker.datatype.number(2000)
    }

    let text = 'INSERT INTO reviews(title, abuseReported, rating, location_, productid, reviewDate, reviewBody, helpfulCount) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';

    let values = [review.title, review.abuseReported, review.rating, review.location_, review.productid, review.reviewDate, review.reviewBody, review.helpfulCount];

    client.client.query(text, values, (err, res) => {
        if (err) {
          throw err
          console.log(err.stack)
        } else {
          console.log(res)
        }
      });
  }

}

seed()

module.exports.seed = seed;

//seed products
  // const min = 100;
  // for (let i = 0; i <= 100000; i++) {
  //   let totalReviews = faker.datatype.number(3000)
  //   let random = Math.floor(Math.random() * (totalReviews - min + 1) + min)
  //   let product = {
  //     avgRating: faker.datatype.number({
  //       'min': 1,
  //       'max': 5,
  //       precision: .1
  //     }),
  //     totalReviews: totalReviews,
  //     totalRatings: faker.datatype.number((totalReviews - random))
  //   }

  //   let q = `INSERT INTO products(avgRating, totalReviews, totalRatings) VALUES(${product.avgRating}, ${product.totalReviews}, ${product.totalRatings})`;

  //   await client.client.query(q, (err, res) => {
  //       if (err) {
  //         throw err
  //       } else {
  //         console.log(res)
  //       }
  //     });
  // }