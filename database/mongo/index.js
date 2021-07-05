// const mongoose = require('mongoose');
// const faker = require('faker');

// const mode = process.env.NODE_ENV;

// let uri = '';

// if (mode === "development" || mode === undefined) {
//   uri = "mongodb://localhost:27017/CustomerReviews";
// } else if (mode === "production") {
//   uri = "mongodb://mongo:27017/CustomerReviews";
// }

// console.log('connection uri: ', uri);

// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const mongoDb = mongoose.connection;

// module.exports = {mongoDb};

// mongoDb.on('error', console.error.bind(console, 'connection error:'));
// mongoDb.once('open' , function() {
//   console.log('we are connected!')
// });
