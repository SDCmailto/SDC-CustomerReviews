const client = require('./index.js')
const faker = require('faker');

const seed = () => {

  for (let i = 0; i <= 5; i++) {
    let date = JSON.stringify(faker.date.past()).slice(1, 11);
    let review = {
        id: i,
        // title: faker.lorem.words().replace(/,/g, "").slice(0, 2),
        abuseReported: faker.datatype.boolean(),
        rating: faker.datatype.number(5),
        location_: faker.address.country().replace(/,/g, "").slice(0, 2),
        userid: Math.floor((Math. random() * 1000000) + 1),
        productid: Math.floor((Math. random() * 1000000) + 1),
        reviewDate: date,
        reviewBody: faker.lorem.paragraph().replace(/,/g, "").slice(0, 2),
        helpfulCount: faker.datatype.number(2000)
    }
    // let review = {
      // title: faker.lorem.words().replace(/,/g, ""),
      // abuseReported: faker.datatype.boolean(),
      // rating: faker.datatype.number(5),
      // location_: faker.address.country().replace(/,/g, ""),
      // userid: Math.floor((Math. random() * 1000000) + 1),psql -U postgres
      // productid: Math.floor((Math. random() * 1000000) + 1),
      // reviewDate: date,
      // reviewBody: faker.lorem.paragraph().replace(/,/g, ""),
      // helpfulCount: faker.datatype.number(2000)
    // }

    let q = `INSERT INTO r(id, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) VALUES(${review.id}, ${review.abuseReported}, ${review.rating}, ${review.location_}, ${review.userid}, ${review.productid}, ${review.reviewDate}, ${review.reviewBody}, ${review.helpfulCount})`;

    // let q = `INSERT INTO reviews(productid) VALUES (${review.productid})`;

    client.client.query(q, (err, res) => {
      console.log('q: ', q);
        if (err) {
          throw err
        } else {
          console.log(res)
        }
      });
  }

}

seed()

module.exports.seed = seed;


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