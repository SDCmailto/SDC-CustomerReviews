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
    text: `SELECT * FROM reviews JOIN users ON (reviews.userid = users.id) WHERE productid = $1`,
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
  console.log('db createReview invoked')
  const idQuery = {
    text: `SELECT COUNT (*) FROM reviews`,
  };
  let id = 0;
  await client.query(idQuery)
    .then(res => {
      id = (res + 1)
    })
    .catch((err) => {
      console.log(err);
    });
  const userQuery = {
    text: `SELECT * FROM users WHERE name_ = $1`,
    values: [review.username]
  }
  let userId = 0;
  await client.query(userQuery)
    .then(res => {
      console.log(res.rows)
    })
    .catch((err) => {
      console.log(err);
      let userid = 0;
      const userIdQuery = {
        text: `SELECT COUNT (*) FROM users`
      }
      await client.query(userIdQuery)
        .then(res => {
          userid = (res + 1)
        })
        .catch((err) => {
          console.log(err);
        });
    let userrating = faker.datatype.number(15000);
    let totalreviews = faker.datatype.number(10000);
      const createUserQuery = {
        text: `INSERT INTO users VALUES ($1, $2, $3, $4)`,
        values: [userid, review.username, userrating, totalreviews]
      }
    });
  const query = {
    text: `INSERT INTO reviews VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
    values: [id, review.title, review.abuseReported, review.rating, review.location_, review.userid, review.productid, review.reviewDate, review.reviewBody, review.helpfulCount]
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
}

const updateReview = () => {

}

const deleteReview = () => {

}

const seed = () => {

    const allSeedingQueries = [`COPY users(name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/users.csv' CSV HEADER`, `COPY features(name_) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/features.csv' CSV HEADER;`, `COPY products(avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/products.csv' CSV HEADER`, `COPY product_features_array(featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeaturesarray.csv' CSV HEADER`, `COPY productfeatures(productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`, `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC-CustomerReviews/reviews.csv' CSV HEADER`];

      allSeedingQueries.forEach(query => {
        client.query(query, (err, res) => {
            if (err) throw err
            console.log(res)
            console.log('query: ', query)
            })
        seeded = true;
        console.log('Postgres Seeding complete!')
      });

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

module.exports.findAllReviews = findAllReviews;
module.exports.findAvgRating = findAvgRating;
module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;
