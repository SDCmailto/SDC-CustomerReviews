const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const fastcsv = require('fast-csv');
const pool = require('./index');
const contains = require('validator/lib/contains');

const copyCsv = (table, file) => {
    console.log('in insertFromCsv')
    console.log('table: ', table)
    console.log('file: ', file)
    let csvData = [];
    let query = ''
    if (table === 'product') {
        query += `COPY products(id, avgRating, totalReviews, totalRatings) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv' CSV HEADER`;
    } else if (table === 'review') {
        query += `COPY reviews(id, title, abuseReported, rating, location_, userId, productId, reviewDate, reviewBody, helpfulCount) FROM PROGRAM 'awk reviews*.csv | cat' DELIMITER ',' CSV HEADER;`
    } else if (table === 'user') {
        query += `COPY users(id, name_, userrating, totalreviews) FROM '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/users.csv' CSV HEADER`;
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

const insertFromCsv = (table, file) => {
  let csvData = [];
    console.log('in insertFromCsv')
    console.log('table: ', table)
    console.log('file: ', file)
  let query = ''
    if (table === 'product') {
        query += 'INSERT INTO products (id, avgRating, totalReviews, totalRatings) VALUES ($1, $2, $3, $4)';
    } else if (table === 'review') {
        query += 'INSERT INTO reviews (id, title, abuseReported, rating, location_, userId, productId, reviewDate, reviewBody, helpfulCount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    } else if (table === 'user') {
        query += 'INSERT INTO users (id, name_, userrating, totalreviews) VALUES ($1, $2, $3, $4)';
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
                  csvData.forEach((row) => {
                      pool.query(query, row, (err, res) => {
                          if (err) {
                              console.log(err);
                              console.log(err.stack);
                          } else {
                              console.log('inserted ' + res.rowCount + ' row:', row);
                          }
                      });
                  });
              } finally {
                  done();
              }
          });
      })
  );
}

const seed = async () => {
//   let productStream = fs.createReadStream('./products.csv');
//   let usersStream = fs.createReadStream('./users.csv');
//   await productStream.pipe(insertFromCsv('product'));
//   await usersStream.pipe(insertFromCsv('user'));
  const reviews = ['/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews1.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews2.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews3.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews4.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews5.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews6.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews7.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews8.csv', '/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews9.csv'];
//   for await (let file of reviews) {
    let reviewsStream = fs.createReadStream('/Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/reviews2.csv');
    reviewsStream.pipe(insertFromCsv());
    // reviewsStream.pipe(copyCsv('review', file));
//   }
}

seed()

module.exports.seed = seed;


