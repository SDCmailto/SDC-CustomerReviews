const faker = require('faker');
const axios = require('axios');
const uuid = require('uuid');

const generateData = () => {
  let record = {};
  record['id'] = uuid.v1();
  const min = 100
  let totalReviews = faker.datatype.number(3000)
  let random = Math.floor(Math.random() * (totalReviews - min + 1) + min)
  let product = {
    avgRating: faker.datatype.number({
      'min': 1,
      'max': 5,
      precision: .1
    }),
    totalReviews: totalReviews,
    totalRatings: faker.datatype.number((totalReviews - random))
  }
  record.product = product;
  let date = JSON.stringify(faker.date.past()).slice(1, 11)
  let reviews = [];
  for (let i = 0; i < totalReviews; i++) {
    let review = {
      title: faker.lorem.words().replace(/,/g, ""),
      abuseReported: faker.datatype.boolean(),
      rating: faker.datatype.number(5),
      location_: faker.address.country().replace(/,/g, ""),
      userid: Math.floor((Math. random() * 1000000) + 1),
      productid: Math.floor((Math. random() * 1000000) + 1),
      reviewDate: date,
      reviewBody: faker.lorem.paragraph().replace(/,/g, ""),
      helpfulCount: faker.datatype.number(2000)
    };
    reviews.push(reviews)
  }
  record.reviews = reviews;
  let user = {
    name_: faker.name.findName(),
    userId: uuid.v1(),
    userrating: Math.floor(faker.datatype.number({
      'min': 1,
      'max': 15000,
      precision: .1
    })),
    totalUserReviews: faker.datatype.number(10000)};
  record.user = user;
  let features = []
  let featureTotals = [1, 2, 3, 4, 5]
  let randomFeatureTotal = featureTotals[Math.floor(Math.random() * featureTotals.length)];
  let names = ['Value for money', 'Blending power', 'Easy to use', 'Freshness', 'Light weight',
  'Easy to spread', 'Fingerprint reader', 'Airtight storage', 'Scent', 'For traveling', 'Sturdiness', 'Zoom', 'Flavor',
  'Easy to clean', 'Durability', 'Easy to hold', 'Portability', 'Picture quality', 'Quality of material', 'Sheerness',
  'Maneuverability', 'Adhesion', 'Sturdiness', 'Water resistance', 'Battery life',
  'Easy to assemble', 'Flexibility', 'Lifespan', 'Longevity', 'Hipness', 'Structure', 'Posh'];
  for (let i = 0; i <= randomFeatureTotal; i++) {
    let random = Math.floor(Math.random() * (31 - 0 + 1) + 0)
    features.push(names[random])
  }
  record.features = features
  return record
}

const seed = () => {
  let count = 2001;
  const bulkInsert = []
  while (count > 0) {
    console.log('count: ', count)
    for (var i = 0; i < 5000; i++) {
      let record = generateData()
      bulkInsert.push(record)
    }
    console.log(bulkInsert.length)
    // axios.post(`http://admin:${config.password}@localhost:5984/sdc/_bulk_docs`, bulkInsert)
    // .then((res) => {
    //   if (dbCounter < 10000000) {
    //     seedScript(dbCounter);
    //   }
    // })
    // .catch((err) => {
    //   console.log('couchDB RES - ERROR:', err);
    // });
    count -= 1;
  }
}

seed();

module.exports.seed = seed

