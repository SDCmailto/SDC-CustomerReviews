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

let seeded = false;

const seed = () => {

    if (seeded) {
        return;
    }

    const allSeedingQueries = [`COPY users(name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`, `COPY features(name_) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/features.csv' DELIMITER ',' CSV HEADER;`, `COPY products(avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`, `COPY product_features_array(featureid) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeaturesarray.csv' CSV HEADER`, `COPY productfeatures(productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`, `COPY reviews(title, abuseReported, rating, location_, userid, productid, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews.csv' CSV HEADER`];

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

seed()
