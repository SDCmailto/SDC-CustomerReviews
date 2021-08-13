const { Pool, Client } = require('pg')
const { host, user, database, password, port } = require('../../config.js');
const faker = require('faker');

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

const findAllReviews = async (productId) => {
  const query = {
    text: `SELECT * FROM reviews JOIN products ON (reviews.productid = products.id) WHERE productid = $1`,
    values: [productId]
  };
  let data = [];
  await client.query(query)
    .then(res => {
      data.push(res.rows)
    })
    .catch((err) => {
      console.log(err);
    });
  return data;
};

const findAvgRating = async (productid) => {
  const query = {
    text: 'SELECT avgRating FROM products WHERE id = $1',
    values: [productid]
  };
  let data = [];
  await client.query(query)
    .then(res => {
      data.push(res.rows)
    })
    .catch((err) => {
      console.log(err);
    });
  return data[0];
}

const createReview = async (productid, review) => {
  console.log('review: ', review)
  let numbProductId = parseInt(review.productid);
  const idQuery = {
    text: `SELECT COUNT (*) FROM reviews`,
  };
  const result = await client.query({
    rowMode: 'array',
    text: 'SELECT COUNT (*) FROM reviews;',
  })
  let currentReviewId = result.rows[0][0]
  console.log('currentReviewId : ', currentReviewId)
  let id = parseInt(currentReviewId);
  let userId = 0;
  const userIdResult = await client.query({
    rowMode: 'array',
    text: `SELECT * FROM users WHERE name_ = $1`,
    values: [review.username]
  })
  if (!userIdResult.rowCount) {
    const makeUserId = client.query({
      rowMode: 'array',
      text: `SELECT COUNT (*) FROM users;`
    })
    userId = parseInt((result.rows[0][0]) + 1)
    let userrating = faker.datatype.number(15000);
    let totalreviews = faker.datatype.number(10000);
    const createUserQuery =
    await client.query({
      text: `INSERT INTO users VALUES ($1, $2, $3, $4)`,
      values: [userId, review.username, userrating, totalreviews]
    });
  } else {
    userId = parseInt(userIdResult.rows[0][0])
  }
  let newReviewData = [];
  const data = await client.query(query = {
    rowMode: 'array',
    text: `INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`,
    values: [id, review.title, review.abuseReported, review.rating, review.location_, userId, numbProductId, review.reviewDate, review.reviewBody, review.helpfulCount]
  });
  return data.rows[0];
}

const updateReview = async (productid, review) => {
  console.log('in db update review')
  const task = await client.query(query = {
    rowMode: 'array',
    text: `UPDATE reviews SET title = $1 WHERE title = 'a';`,
    values: ['the']
  });
  console.log('task: ', task);
  return `Review ${review} successfully updated.`;
}

const deleteReview = async (productid, review) => {
  console.log('in db delete review')
  const task = await client.query(query = {
    rowMode: 'array',
    text: `DELETE FROM reviews WHERE id = $1;`,
    values: [review]
  });
  console.log('task: ', task);
  return `Review ${review} successfully deleted.`;
}

const seed = () => {

  // const allSeedingQueries = [`COPY users(name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/users.csv' CSV HEADER`, `COPY features(name_) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/features.csv' CSV HEADER;`, `COPY products(avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/products.csv' CSV HEADER`, `COPY product_features_array(featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeaturesarray.csv' CSV HEADER`, `COPY productfeatures(productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`, `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`];

    const q = `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`;

      // allSeedingQueries.forEach(q => {
        client.query(q, (err, res) => {
          console.log('q: ', q)
            if (err) {
              throw err
            } else {
              console.log(res)
              console.log('Postgres Seeding complete!')
            }
          });
      // });

}

// seed()

const benchmark = () => {
  let queries = ['EXPLAIN ANALYZE SELECT * FROM reviews WHERE productid = 999999', 'EXPLAIN ANALYZE SELECT * FROM products WHERE id = 999998', `EXPLAIN ANALYZE INSERT INTO reviews VALUES (40000001, 'great bunny food', false, 4.6, 'Netherlands', 328947, 899973, '2021-07-13', 'it was the best kibble and hay combo our rabbit had ever tasted.', 5 )`, `EXPLAIN ANALYZE UPDATE reviews SET (userid, location_) = (970456, 'San Francisco') WHERE id = 11678312`]

  queries.forEach(query => {
    client.query(query, (err, res) => {
      if (err) throw err
      console.log(res)
      console.log('query: ', query)
      })
  });

};

// benchmark();
module.exports.seed = seed;
module.exports.findAllReviews = findAllReviews;
module.exports.findAvgRating = findAvgRating;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;

module.exports.client = client;

