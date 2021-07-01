const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const fastcsv = require('fast-csv');
const pool = require('./index');
const contains = require('validator/lib/contains');

const insertFromCsv = () => {
  let csvData = [];
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
          const query =
              'INSERT INTO users (id, name_, userrating, totalreviews) VALUES ($1, $2, $3, $4)';
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
  let productStream = fs.createReadStream('./products.csv');
  let usersStream = fs.createReadStream('./users.csv');
  const reviews = ['./reviews.csv', './reviews1.csv', './reviews2.csv', './reviews3.csv', './reviews.csv4', './reviews.csv5', './reviews.csv6', './reviews.csv7', './reviews.csv8', './reviews.csv9', './reviews.csv10']
  reviews.forEach(reviewCsv ()=> {
    let reviewsStream = fs.createReadStream(reviewCsv);
    await reviewsStream.pipe(insertFromCsv());
  })
  await productStream.pipe(insertFromCsv());
await usersStream.pipe(insertFromCsv());
}

seed()

module.exports.seed = seed;

