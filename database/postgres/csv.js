const utils = require('./utils');
const fastcsv = require('fast-csv');
const fs = require('fs');

//you'll know this process has finished when both success strings 'wrote 10 mill ProductFeatures' and 'wrote 40 mill reviews' get logged in your terminal!

const generateCsvFiles = async () => {
  // const products = utils.createProducts()
  // const users = utils.createUsers()
  // const features = utils.createFeatures()
  // const productFeaturesArray = utils.createOneMillionFeatures()

  // const ws_product = fs.createWriteStream("products.csv");
  // await ws_product.write('avgRating,totalReviews,totalRatings\n', 'utf8');
  // fastcsv
  //   .write(products)
  //   .pipe(ws_product)

  // const ws_users = fs.createWriteStream("users.csv");
  // await ws_users.write('name_,userrating,totalreviews\n', 'utf8');
  // fastcsv
  //   .write(users)
  //   .pipe(ws_users)

  // const ws_features = fs.createWriteStream("features.csv");
  // await ws_features.write('name_\n', 'utf8');
  // fastcsv
  //   .write(features)
  //   .pipe(ws_features)

  const writeReviews = fs.createWriteStream('reviews.csv');
  await writeReviews.write('title,abuseReported,rating,location_,userid,productid,reviewDate,reviewBody,helpfulCount\n', 'utf8');
  await utils.createReviews(writeReviews, 'utf-8', () => {
    writeReviews.end();
    console.log('wrote 40 mill reviews')
  });

  // const writeReviews = fs.createWriteStream('reviews2.csv');
  // await writeReviews.write('title,abuseReported,rating,location_,userid,productid,reviewDate,reviewBody,helpfulCount\n', 'utf8');
  // await writeReviews.write('title\n', 'utf8');
  // await utils.createReviewsTest(writeReviews, 'utf-8', () => {
  //   writeReviews.end();
  //   console.log('wrote 3 test reviews')
  // });

  // const writeProductFeatures = await fs.createWriteStream('productFeatures.csv');
  // await  writeProductFeatures.write('productid,featureid\n', 'utf8');
  // await utils.create10MillProductFeatures(writeProductFeatures, 'utf-8', () => {
  //   writeProductFeatures.end();
  //   console.log('wrote 1 mill ProductFeatures')
  // });

  // const writeProductFeaturesArray = await fs.createWriteStream('productFeaturesarray.csv');
  // await  writeProductFeaturesArray.write('featureid\n', 'utf8');
  // await utils.createOneMillionFeatures(writeProductFeaturesArray, 'utf-8', () => {
  //   writeProductFeaturesArray.end();
  //   console.log('wrote 1 mill ProductFeaturesArrays')
  // });

  // const ws_productFeaturesArray  = fs.createWriteStream('productFeaturesarray.csv');
  // await ws_productFeaturesArray.write('featureid\n', 'utf8');
  // fastcsv
  //   .write(productFeaturesArray)
  //   .pipe(ws_productFeaturesArray)

}

generateCsvFiles()

module.exports.generateCsvFiles = generateCsvFiles;

