const { Pool, Client } = require('pg')
const { host, user, database, password, port } = require('../../config');

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

const seed = () => {

    const seedingQueries = [`COPY users(userid, name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`, `COPY features(feature_id, name_) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/features.csv' CSV HEADER`, `COPY productfeatures(productFeature_id, productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`, `COPY products(product_id, avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`];

    seedingQueries.forEach(query => {
        client.query(query, (err, res) => {
            if (err) throw err
            console.log(res)
            console.log('query: ', query)
            })
    });

}

seed()
