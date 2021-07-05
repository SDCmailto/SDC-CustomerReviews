const faker = require('faker');

module.exports = {
  createProducts: () => {
    let products = [];
    const min = 100
    for (let i = 0; i <= 1000000; i++) {
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
      products.push(product)
    }
    return products
  },
  createReviews: (writer, encoding, cb) => {
    let i = 0;
    function write() {
      let ok = true;
      do {
        i += 1;
        let date = JSON.stringify(faker.date.past()).slice(1, 11)
        let review = {
          title: faker.lorem.words().slice(0, 4),
          abuseReported: faker.datatype.boolean(),
          rating: faker.datatype.number(5),
          location_: faker.address.country(),
          userid: Math.floor((Math. random() * 1000000) + 1),
          productid: Math.floor((Math. random() * 1000000) + 1),
          reviewDate: date,
          reviewBody: faker.lorem.paragraph().slice(0, 4),
          helpfulCount: faker.datatype.number(2000),
        }
        const data = `${review.title},${review.abuseReported},${review.rating},${review.location_},${review.userid},${review.productid},${review.reviewDate},${review.reviewBody},${review.helpfulCount}\n`;
        if (i === 40000000) {
          writer.write(data.slice(-1), encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      } while (i < 40000000 && ok);
      if (i > 0) {
        writer.once('drain', write);
      }
    }
    write()
  },
  createReviewsTest: (writer, encoding, cb) => {
    let i = 0;
    function write() {
      let ok = true;
      do {
        i += 1;
        let date = JSON.stringify(faker.date.past()).slice(1, 11)
        let review = {
          title: faker.lorem.words(),
          abuseReported: faker.datatype.boolean(),
          rating: faker.datatype.number(5),
          location_: faker.address.country(),
          userid: Math.floor((Math. random() * 1000000) + 1),
          productid: Math.floor((Math. random() * 1000000) + 1),
          reviewDate: date,
          reviewBody: faker.lorem.paragraph(),
          helpfulCount: faker.datatype.number(2000),
        }
        const data = `${review.title},${review.abuseReported},${review.rating},${review.location_},${review.userid},${review.productid},${review.reviewDate},${review.reviewBody},${review.helpfulCount}\n`;
        if (i === 9) {
          writer.write(data.slice(-1), encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      } while (i < 10 && ok);
      if (i === 9) {
        writer.once('drain', write);
      }
    }
    write()
  },
  createFeatures: () => {
    let features = []
    let names = ['Value for money', 'Blending power', 'Easy to use', 'Freshness', 'Light weight',
    'Easy to spread', 'Fingerprint reader', 'Airtight storage', 'Scent', 'For traveling', 'Sturdiness', 'Zoom', 'Flavor',
    'Easy to clean', 'Durability', 'Easy to hold', 'Portability', 'Picture quality', 'Quality of material', 'Sheerness',
    'Maneuverability', 'Adhesion', 'Sturdiness', 'Water resistance', 'Battery life',
    'Easy to assemble', 'Flexibility', 'Lifespan', 'Longevity', 'Hipness', 'Structure', 'Posh'];
    for (let i = 0; i <= names.length; i++) {
      let feature = {
        name_: names[i]
      }
      features.push(feature)
    }
    return features;
  },
  createUsers: () => {
    let users = [];
    for (let i = 0; i < 1000000; i++) {
      let user = {
        name_: faker.name.findName(),
        userrating: Math.floor(faker.datatype.number({
          'min': 1,
          'max': 15000,
          precision: .1
        })),
        totalreviews: faker.datatype.number(10000)
      }
      users.push(user)
    }
    return users
  },
  create10MillProductFeatures: (writer, encoding, cb)=> {
    let i = 0;
    function write() {
      let ok = true;
      do {
        i += 1;
        let productFeature = {
          productid: i,
          featureid: Math.floor((Math. random() * 29) + 1)
        }
        const data = `${productFeature.productid},${productFeature.featureid}\n`;
        if (i === 1000000) {
          writer.write(data, encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      } while (i < 1000000 && ok);
      if (i < 1000000) {
        writer.once('drain', write);
      }
    }
    write()
  },
  createOneMillionFeatures: () => {
    let productFeatures = [];
    let range = Array.from({length: 29}, (_, i) => i + 1);
    let featureTotals = [1, 2, 3, 4, 5]
    for (let i = 0; i <= 1000000; i++) {
      let randomFeatureTotal = featureTotals[Math.floor(Math.random() * featureTotals.length)];
      let features = []
      for (let i = 0; i <= randomFeatureTotal; i++) {
        let random = Math.floor(Math.random() * (25 - 0 + 1) + 0)
        features.push(range[random])
      }
      let dedupedFeatures = Array.from(new Set(features))
      const formatArray = (arr) => {
        var s = '{';
        for (var i = 0; i < arr.length; i++) {
            if (i) {
                s += ',';
            }
            if (arr[i] instanceof Array) {
                s += formatArray(arr[i]);
            } else {
                s += arr[i];
            }
        }
        return s + '}';
      }
      let csv = formatArray(dedupedFeatures)
      let productFeature = {
        featureid: csv
      }
      productFeatures.push(productFeature)
    }
    return productFeatures
  }
};
