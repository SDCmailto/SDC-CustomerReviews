const utils = require('./utils');
const fastcsv = require('fast-csv');
const fs = require('fs');

const generateCsvFiles = async () => {
  const products = utils.createProducts()
  const users = utils.createUsers()
  const features = utils.createFeatures()
  const productFeaturesArray = utils.createProductFeaturesArray()

  const ws_product = fs.createWriteStream("products.csv");
  await ws_product.write('avgRating,totalReviews,totalRatings\n', 'utf8');
  fastcsv
    .write(products)
    .pipe(ws_product)

  const ws_users = fs.createWriteStream("users.csv");
  await ws_users.write('name_,userrating,totalreviews\n', 'utf8');
  fastcsv
    .write(users)
    .pipe(ws_users)

  const ws_features = fs.createWriteStream("features.csv");
  await ws_features.write('name_\n', 'utf8');
  fastcsv
    .write(features)
    .pipe(ws_features)

  const ws_reviews = fs.createWriteStream('reviews.csv');
  await ws_reviews.write('title,abuseReported,rating,location_,userid,productid,reviewDate,reviewBody,helpfulCount\n', 'utf8');
  await utils.createReviews(ws_reviews, 'utf-8', () => {
    ws_reviews.end();
    console.log('wrote 40 mill reviews')
  });

  const ws_ProductFeatures = await fs.createWriteStream('productFeatures.csv');
  await  ws_ProductFeatures.write('productid,featureid\n', 'utf8');
  await utils.createProductFeatures(ws_ProductFeatures, 'utf-8', () => {
    ws_ProductFeatures.end();
    console.log('wrote 1 mill ProductFeatures')
  });

  const ws_productFeaturesArray = fs.createWriteStream('productFeaturesarray.csv');
  await ws_productFeaturesArray.write('featureid\n', 'utf8');
  fastcsv
    .write(productFeaturesArray)
    .pipe(ws_productFeaturesArray)

}

generateCsvFiles()

module.exports.generateCsvFiles = generateCsvFiles;

