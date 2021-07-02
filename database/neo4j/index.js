const neode = require('neode')
    .fromEnv()
    .with({
    Product: require("./models/Product"),
    Review: require("./models/Review"),
    User: require("./models/User"),
    });

instance.model('Product', {
  product_id: {
      primary: true,
      type: 'int',
      required: true
  },
  avgRating: {
      type: 'number',
      unique: 'true'
  },
  totalReviews: {
      type: 'number',
      index: true,
  },
});

instance.model('Product').relationship('reviewed', 'rated' {
  since: {
      type: 'number',
      required: true,
  }
});

instance.create('Product', {
  name: 'Rabbit Food'
})
.then(adam => {
  console.log('Rabbit Food'.get('name')); //'Rabbit Food'
});

instance.merge('Product', {
  product_id: 1,
  name: 'Rabbit Food'
})
.then(adam => {
  console.log('Rabbit Food'.get('name')); // 'Rabbit Food'
});

instance.find('Person', {person_id: 1})
    .then(adam => adam.delete());

    instance.all('Person', {name: 'Adam'},{name: 'ASC', id: 'DESC'},1,0)
    .then(collection => {
        console.log(collection.length); // 1
        console.log(collection.get(0).get('name')); // 'Adam'
    })

    instance.find('Person', 1)
    .then(res => {...});

    instance.cypher(
      'MATCH (p:Person {name: {name}}) RETURN p', {name: "Adam"})
      .then(res => {
          console.log(res.records.length);
      })