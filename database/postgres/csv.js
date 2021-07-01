
const fs = require('fs');
const utils = require('./utils');
const fastcsv = require('fast-csv');

const ws_product = fs.createWriteStream("products.csv");
const ws_reviews = fs.createWriteStream("reviews.csv");
const ws_users  = fs.createWriteStream("users.csv");
const ws_features  = fs.createWriteStream("features.csv");
const ws_productFeatures = fs.createWriteStream("productFeatures.csv");

let products = utils.createProducts()
let reviews = utils.createReviews()
let users = utils.createUsers()
let features = utils.createFeatures()
let productFeatures = utils.createProductFeatures()

fastcsv
  .write(products, { headers: true })
  .pipe(ws_product);

fastcsv
.write(reviews , { headers: true })
.pipe(ws_reviews);

fastcsv
.write(reviews , { headers: true })
.pipe(ws_users);

fastcsv
.write(reviews , { headers: true })
.pipe(ws_features);

fastcsv
.write(reviews , { headers: true })
.pipe(ws_productFeatures);

