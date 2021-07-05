const utils = require('./utils');
const fs = require('fs');

const test = async () => {
  const writeReviews = fs.createWriteStream('reviews.csv');
  await writeReviews.write('title,abuseReported,rating,location_,userid,productid,reviewDate,reviewBody,helpfulCount\n', 'utf8');
  await utils.createReviews(writeReviews, 'utf-8', () => {
    writeReviews.end();
    console.log('wrote 3 reviews')
  });
}
test()
module.exports.test = test