const cradle = require('cradle');

cradle.setup({
  host: 'living-room.couch',
  cache: true,
  raw: false,
  forceSave: true
});

const couch = new(cradle.Connection)
const couchdb = couch.database('amazon-reviews');

couchdb.exists(function (err, exists) {
  if (err) {
    console.log('error', err);
  } else if (exists) {
    console.log('the force is with you.');
  } else {
    console.log('database does not exist.');
  }
});

module.exports.couchdb = couchdb;

//move to seed
db.save([
  { name: 'Yoda' },
  { name: 'Han Solo' },
  { name: 'Leia' }
], function (err, res) {
  // Handle response
});