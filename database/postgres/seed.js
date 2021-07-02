const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const fastcsv = require('fast-csv');
const pool = require('./index');
const contains = require('validator/lib/contains');

const copyCsv = (table, file) => {
    console.log('in copyCsv')
    console.log('table: ', table)
    console.log('file: ', file)
    let csvData = [];
    let query = ''
    if (table === 'products') {
        query += `COPY products(id, avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`;
    } else if (table === 'reviews') {
        query += `COPY reviews(id, title, abuseReported, rating, location_, userId, productId, reviewDate, reviewBody, helpfulCount) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews.csv' CSV HEADER`;
    } else if (table === 'users') {
        query += `COPY users(id, name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`;
    } else if (table === 'features') {
        query += `COPY features(id, name_) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/features.csv' CSV HEADER`;
    } else if (table === 'productFeatures') {
        query += `COPY productfeatures(id, productid, featureid) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeatures.csv' CSV HEADER`;
    }
    return (
      fastcsv
        .parse()
        .validate((data) => !contains(data[0], ','))
        .on('data', (data) => {
            csvData.push(data);
        })
        .on('data-invalid', (row, rowNumber) =>
            console.log(
                `Invalid [rowNumber=${rowNumber}] [row=${JSON.stringify(row)}]`
            )
        )
        .on('end', () => {
            pool.connect((err, client, done) => {
                if (err) throw err;
                try {
                    pool.query(query, (err, res) => {
                        if (err) {
                            console.log(err);
                            console.log(err.stack);
                        } else {
                            console.log(`copied ${table} from csv`);
                        }
                    });
                } finally {
                    done();
                }
            });
        })
    );
  }

const seed = async () => {
//   let reviewsStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews.csv');
//   await reviewsStream.pipe(copyCsv('reviews'));
  let productStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv');
  await productStream.pipe(copyCsv('products'));
//   let usersStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv');
//   await usersStream.pipe(copyCsv('users'));
//   let featuresStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/features.csv');
//   await featuresStream.pipe(copyCsv('features'));
//   let productFeaturesStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/productFeatures.csv');
//   await productFeaturesStream.pipe(copyCsv('productFeatures'));
}

seed()

module.exports.seed = seed;
