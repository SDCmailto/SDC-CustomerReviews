
const fs = require('fs');
const utils = require('./utils');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("products.csv");

let products = utils.createProducts()

fastcsv
  .write(products, { headers: true })
  .pipe(ws);
