const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const fastcsv = require('fast-csv');
const db = require('./index');
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
              'INSERT INTO products (id, avgRating, totalReviews, totalRatings) VALUES ($1, $2, $3, $4)';
          db.connect((err, client, done) => {
              if (err) throw err;
              try {
                  csvData.forEach((row) => {
                      client.query(query, row, (err, res) => {
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
  let stream = fs.createReadStream('./products.csv');
  //create readStream for each table/csv
  stream.pipe(insertFromCsv());
}

seed()

module.exports.seed = seed;

