const fs = require('fs');
const utils = require('./utils');
const fastcsv = require('fast-csv');

const products = utils.createProducts()
const users = utils.createUsers()
const features = utils.createFeatures()

const ws_product = fs.createWriteStream("products.csv");
const ws_users = fs.createWriteStream("users.csv");
const ws_features = fs.createWriteStream("features.csv");

//currently using alternative seeding script for reviews but may come back to this when further optimizing:

const writeReviews = fs.createWriteStream('reviews.csv');
writeReviews.write('id,title,abuseReported,rating,location_,userId,productId,reviewDate,reviewBody,helpfulCount\n', 'utf8');
utils.createReviews(writeReviews, 'utf-8', () => {
  writeReviews.end();
  console.log('wrote 10 mill reviews')
});

const writeProductFeatures = fs.createWriteStream('productFeatures.csv');
writeProductFeatures.write('id,productid,featureid\n', 'utf8');
utils.create10MillProductFeatures(writeProductFeatures, 'utf-8', () => {
  writeProductFeatures.end();
  console.log('wrote 10 mill ProductFeatures')
});

fastcsv
.write(productFeatures , { headers: true })
.pipe(ws_productFeatures)

