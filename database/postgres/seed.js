const client = require('./index.js')

const seed = () => {

  const allSeedingQueries = [`COPY products(avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/products.csv' CSV HEADER`, `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`];

      allSeedingQueries.forEach(q => {
        client.client.query(q, (err, res) => {
          console.log('q: ', q)
            if (err) {
              throw err
            } else {
              console.log(res)
            }
          });
          console.log('Postgres Seeding complete!')
      });
}

seed()

module.exports.seed = seed;