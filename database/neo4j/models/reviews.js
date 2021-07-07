const _ = require('lodash');
const Review= require('../../database/neo4j/models/review.js');

const getAll = function(session) {
  return session.readTransaction(txc =>
      txc.run('MATCH (review:Review) RETURN review')
    ).then(_manyReviews);
};

const _manyReviews = function (result) {
  return result.records.map(r => new Review(r.get('review')));
};

module.exports = {
  getAll: getAll
};