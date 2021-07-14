const { Pool, Client } = require('pg')
const { host, user, database, password, port } = require('../../config.js');

const client = new Client({
    host,
    user,
    database,
    password,
    port,
});

client
  .connect()
  .then(() => console.log('connected'))
  .catch(err => console.error('connection error', err.stack))

let seeded = false;

module.exports.client = client;

const seed = () => {

    if (seeded) {
        return;
    }

    // const allSeedingQueries = [`COPY users(name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/users.csv' CSV HEADER`, `COPY features(name_) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/features.csv' CSV HEADER;`, `COPY products(avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/products.csv' CSV HEADER`, `COPY product_features_array(featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeaturesarray.csv' CSV HEADER`, `COPY productfeatures(productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`, `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`];

      // allSeedingQueries.forEach(query => {
      //   client.query(query, (err, res) => {
      //       if (err) throw err
      //       console.log(res)
      //       console.log('query: ', query)
      //       })
      //   seeded = true;
      //   console.log('Postgres Seeding complete!')
      // });

      client.query(`COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`, (err, res) => {
        if (err) throw err
        console.log(res)
        console.log('query: ', query)
        })

}

seed()

const benchmark = () => {
  let queries = ['EXPLAIN ANALYZE SELECT * FROM reviews WHERE productid=999999', 'EXPLAIN ANALYZE SELECT * FROM products WHERE productid=999998', `EXPLAIN ANALYZE INSERT INTO reviews VALUES (40000001, 'great bunny food', false, 4.6, 'Netherlands', 328947, 899973, '2021-07-13', 'it was the best kibble and hay combo our rabbit had ever tasted.', 5 )`, `EXPLAIN ANALYZE UPDATE reviews SET (userid, location_) = (970456, 'San Francisco') WHERE id = 11678312`]

  queries.foreach(q => {
    client.query(q, (err, res) => {
      if (err) throw err
      console.log(res)
      console.log('query: ', query)
      })
  });

};

// benchmark();

module.exports.seed = seed;
module.exports.benchmark = benchmark;
