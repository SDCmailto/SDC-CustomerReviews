const neo4j = require('neo4j-driver')
const config = require('../../config');

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', config.password)
)

// Create a session to run Cypher statements in.
// Note: Always make sure to close sessions when you are done using them!

// const session = driver.session()
const session = driver.session({
  database: 'neo4j',
  defaultAccessMode: neo4j.session.WRITE
})

const resultPromise = session.writeTransaction(tx =>
  tx.run(
    'CREATE (a:Greeting) SET a.message = $message RETURN a.message + ", from node " + id(a)',
    { message: 'hello, world' }
  )
)

resultPromise.then(result => {
  session.close()

  const singleRecord = result.records[0]
  const greeting = singleRecord.get(0)

  console.log(greeting)

  // on application exit:
  driver.close()
})

const seed = () => {

    const allSeedingQueries = [`LOAD CSV WITH HEADERS FROM 'file:///products.csv' AS row RETURN row LIMIT 5;`];

    allSeedingQueries.forEach(cypher => {
        session.run(cypher)
    });
}

seed()

module.exports = function(req, res, next) {
  req.driver = driver;

  next();
};

module.exports.seed = seed

//manually move all cv files to neo4j import dir
//cp /Users/hannahmanfredi/Desktop/SDC/SDC-CustomerReviews/products.csv .
//All data from the CSV file is read as a string, so you need to use toInteger(), toFloat(), split() or similar functions to convert values: