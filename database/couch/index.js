const NodeCouchDb = require('node-couchdb');

const couch = new NodeCouchDb({
  host: 'localhost',
  protocol: 'http',
  port: 5984,
  auth: {
      user: 'admin',
      pass: ''
  }
});

couch.createDatabase('sdc').then(() => {...}, err => {
  console.log(err)
});

couch.listDatabases().then((dbs, err) => {
  if (err) {
    console.log(err);
  }
  console.log(dbs);
});