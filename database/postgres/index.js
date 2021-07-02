const { Pool, Client} = require('pg')
const { host, user, database, password, port } = require('../../config');
const faker = require('faker');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

pool.connect()

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    },
    seed: async () => {
        const seed10MillReviews = async () => {
            console.log('inside seed10MillReviews')
            let idx = 0;
            let userIdx =0
            let count = 0;
            let newCount = 1000;
            for ( let j = 0; j <= 10000000; j++ ) {
              count += 1;
              if (count === newCount) {
                idx += 1;
                newCount += 1000;
              }
              if (userIdx === 1000000) {
                userIdx = 0
              }
              let date = JSON.stringify(faker.date.past()).slice(1, 11)
              var id = j
              var title = faker.lorem.words()
              var abuseReported = faker.datatype.boolean()
              var rating = faker.datatype.number(5)
              var location_ = faker.address.country()
              var userId = userIdx
              var productId = idx
              var reviewDate = date
              var reviewBody = faker.lorem.paragraph()
              var helpfulCount = faker.datatype.number(2000)

              pool.query(`INSERT INTO reviews(${id}, ${title}, ${abuseReported}, ${rating}, ${location_}, ${userId}, ${productId}, ${reviewDate}, ${reviewBody}, ${helpfulCount}) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`)

              .catch((error) => {
                console.log('error inserting reviews into postgres db', error)
              })
            }
        }
        await seed10MillReviews()
        await pool.query(`COPY products(id, avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`)
        await pool.query(`COPY users(id, name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`)
        await pool.query(`COPY features(id, name_) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/features.csv' CSV HEADER`)
        await pool.query(`COPY productfeatures(id, productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`)

    }
};

