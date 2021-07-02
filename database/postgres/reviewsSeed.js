const postgres = require('postgres');
const { host, user, database, password, port } = require('../../config');
const sql = postgres(`postgresql://${user}:${password}@${host}:${port}/${database}`)
const faker = require('faker');

const seed10MillReviews = async () => {
  console.log('inside seed10MillReviews')

  await sql`
  CREATE TABLE IF NOT EXISTS Reviews (
    id INTEGER NOT NULL,
    title TEXT,
    abuseReported BOOLEAN,
    rating INTEGER,
    location_ TEXT,
    userId INTEGER,
    productId INTEGER,
    reviewDate TIMESTAMP,
    reviewBody TEXT,
    helpfulCount INTEGER
  );
  `
  .catch((error) => {
    console.log('error creating reviews table in postgres sql', error)
  })

  let idx = 0;
  let userIdx =0
  let count = 0;
  let newCount = 1000;
  for ( let j = 0; j <= 10000000; j++ ) {
    count += 1;
    if (count === newCount) {
      idx += 1;
      newCount += 1000;
    }
    if (userIdx === 1000000) {
      userIdx = 0
    }
    let date = JSON.stringify(faker.date.past()).slice(1, 11)
    var id = j
    var title = faker.lorem.words()
    var abuseReported = faker.datatype.boolean()
    var rating = faker.datatype.number(5)
    var location_ = faker.address.country()
    var userId = userIdx
    var productId = idx
    var reviewDate = date
    var reviewBody = faker.lorem.paragraph()
    var helpfulCount = faker.datatype.number(2000)

    await sql`
    INSERT INTO reviews VALUES (
      ${id}, ${title}, ${abuseReported}, ${rating}, ${location_}, ${userId}, ${productId}, ${reviewDate}, ${reviewBody}, ${helpfulCount}
      )
    `
    .catch((error) => {
      console.log('error inserting reviews into postgres db', error)
    })
  }
}

seed10MillReviews()

module.exports.seed10MillReviews = seed10MillReviews