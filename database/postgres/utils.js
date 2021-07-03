const faker = require('faker');

module.exports = {
  createProducts: () => {
    let products = [];
    const min = 100
    for (let i = 0; i < 1000000; i++) {
      let totalReviews = faker.datatype.number(3000)
      let random = Math.floor(Math.random() * (totalReviews - min + 1) + min)
      let product = {
        product_id: i,
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
    let idx = 0;
    let userIdx = 0;
    let count = 0;
    let newCount = 1000;
    function write() {
      let ok = true;
      do {
        i += 1;
        count += 1;
        if (count === newCount) {
          idx += 1;
          newCount += 1000;
        }
        if (userIdx === 1000000) {
          userIdx = 0
        }
        let date = JSON.stringify(faker.date.past()).slice(1, 11)
        let review = {
          review_id: i,
          title: faker.lorem.words(),
          abuseReported: faker.datatype.boolean(),
          rating: faker.datatype.number(5),
          location_: faker.address.country(),
          userId: userIdx,
          productId: idx,
          reviewDate: date,
          reviewBody: faker.lorem.paragraph(),
          helpfulCount: faker.datatype.number(2000),
        }
        const data = `${review.review_id},${review.title},${review.abuseReported},${review.rating},${review.location_},${review.userId},${review.productId},${review.reviewDate},${review.reviewBody},${review.helpfulCount}\n`;
        if (i === 10000000) {
          writer.write(data, encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      } while (i < 10000000 && ok);
      if (i > 0) {
        writer.once('drain', write);
      }
    }
    write()
  },
  createFeatures: () => {
    let features = []
    let names = ['Value for money', 'Blending power', 'Mobile App', 'Easy to use', 'Freshness','Comfort', 'Light weight', 'Easy to spread', 'Fingerprint reader', 'Airtight storage', 'Scent', 'For traveling', 'Sturdiness', 'Zoom', 'Flavor', 'Easy to clean', 'Durability', 'Easy to hold', 'Portability', 'Picture quality', 'Quality of material', 'Sheerness', 'Easy to clean', 'Maneuverability', 'Adhesion'];
    for (let i = 0; i < names.length; i++) {
      let feature = {
        feature_id: i,
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
        userid: i,
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
  createProductFeatures: () => {
    let productFeatures = [];
    for (let j = 0; j < 1000000; j++) {
      let range = []
      for (let i = 0; i < 4; i++) {
      let random = Math.floor(Math.random() * (25 - 0 + 1) + 0)
      range.push(random)
      }
      let csvRange = range.join(',')
      let productFeature = {
        productFeature_id: j,
        productid: j,
        featureid: csvRange
      }
      productFeatures.push(productFeature)
    }
    return productFeatures
  },
  create10MillProductFeatures: (writer, encoding, cb)=> {
    let i = 10000000;
    let id = 0;
    let count = 0;
    let newCount = 0;
    let range = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    function write() {
      let ok = true;
      do {
        i -= 1;
        count += 1;
        let random = Math.floor(Math.random() * (24 - 0 + 1) + 0)
        if (newCount === (count + 1000)) {
          id += 1;
          newCount += 1000;
        }
        let productFeature = {
          productFeature_id: count,
          productid: id,
          featureid: range[random]
        }
        const data = `${productFeature.productFeature_id},${productFeature.productid},${productFeature.featureid}\n`;
        if (i === 0) {
          writer.write(data, encoding, cb);
        } else {
          ok = writer.write(data, encoding);
        }
      } while (i > 0 && ok);
      if (i > 0) {
        writer.once('drain', write);
      }
    }
    write()
  }
};