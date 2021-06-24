const mongoose = require('mongoose');
const faker = require('faker');

const mode = process.env.NODE_ENV;
console.log('mode: ', mode);

let uri = '';

if (mode === "development" || mode === undefined) {
  uri = "mongodb://localhost:27017/CustomerReviews";
} else if (mode === "production") {
  uri = "mongodb://mongo:27017/CustomerReviews";
}

console.log('connection uri: ', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open' , function() {
  console.log('we are connected!')
});

