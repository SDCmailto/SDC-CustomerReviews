const fs = require('fs');
const utils = require('./utils');
const fastcsv = require('fast-csv');

// const products = utils.createProducts()
// const reviews = utils.createReviews()
// const users = utils.createUsers()

// const ws_product = fs.createWriteStream("products.csv");
// const ws_reviews = fs.createWriteStream("reviews12.csv");
// const ws_users = fs.createWriteStream("users.csv");

const writeUsers = fs.createWriteStream('reviews15.csv');
writeUsers.write('id,title,abuseReported,rating,location_,userId,productId,reviewDate,reviewBody,helpfulCount\n', 'utf8');
utils.createReviews(writeUsers, 'utf-8', () => {
  writeUsers.end();
  console.log('wrote 10 mill reviews')
});

// fastcsv
// .write(reviews, { headers: true })
// .pipe(ws_reviews)

