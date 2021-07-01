const fs = require('fs');
const utils = require('./utils');
const fastcsv = require('fast-csv');

// const products = utils.createProducts()
const reviews = utils.createReviews()
const users = utils.createUsers()

// const ws_product = fs.createWriteStream("products.csv");
// const ws_reviews = fs.createWriteStream("reviews10.csv");
const ws_users = fs.createWriteStream("users.csv");

fastcsv
.write(users, { headers: true })
.pipe(ws_users)
