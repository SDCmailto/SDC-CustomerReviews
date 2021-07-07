const neo4j = require('neo4j-driver')
const config = require('../../config');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', config.password)
)

const seed = async () => {
  const session = driver.session();
  const results = await session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neoproducts.csv' AS line CREATE (p:Product {id: toInteger(line.id), avgRating: toFloat(line.avgRating), totalReviews: toInteger(line.totalReviews), totalRatings: toInteger(line.totalRatings)})`);
  session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neousers.csv' AS line CREATE (:User {id: toInteger(line.id), name_: line.name_, userrating: toFloat(line.userrating), totalreviews: toInteger(line.totalreviews)})`)
  session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neoreviews.csv' AS line CREATE (:User {id: toInteger(line.id), title: line.title, abuseReported: line.abuseReported, rating: toFloat(line.rating), location_,: line.location_, userid: toInteger(line.userid), productid: toInteger(line.productid), reviewDate: line.reviewDate, reviewBody: line.reviewBody, helpfulCount: toInteger(line.helpfulCount)})`)
  session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neofeatures.csv' AS line CREATE (:Feature{id: toInteger(line.id), name_: line.name_})`)
  session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neoproductFeaturesarray.csv' AS line CREATE (:ProductFeaturesarray {productid: toInteger(line.productid), featureid: toInteger(line.featureid}))`)
  session.run(`USING PERIODIC COMMIT LOAD CSV WITH HEADERS FROM 'file:///neoproductFeatures.csv' AS line CREATE (:ProductFeature {productid: toInteger(line.productid), featureid: toInteger(line.featureid}))`)
  session.close();
}


seed()

module.exports = function(req, res, next) {
  req.driver = driver;

  next();
};

module.exports.seed = seed
