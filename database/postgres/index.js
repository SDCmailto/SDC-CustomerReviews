const { Pool, Client} = require('pg')
const { host, user, database, password, port } = require('../../config');

const pool = new Pool({
    host,
    user,
    database,
    password,
    port,
});

pool.connect()

// pool.query(`COPY users(id, name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`, (err, res) => {
//     console.log(err, res)
// })

// pool.query(`COPY products(id, avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`, (err, res) => {
//     console.log(err, res)
// })

// const reviews = ['/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews1.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews2.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews3.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews4.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews5.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews6.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews7.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews8.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews9.csv']

// for (let file of reviews) {
//     pool.query(`COPY reviews(id, title, abuseReported, rating, location_, userId, productId, reviewDate, reviewBody, helpfulCount) FROM PROGRAM 'awk reviews*.csv | cat' DELIMITER ',' CSV HEADER;`)
// }

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    },
};

