const neode = require("neode")

    // Using configuration from .env file
    .fromEnv()

    // Including the models in the models/ directory
    .with({
        Movie: require("./models/Movie"),
        Person: require("./models/Person"),
        Actor: require("./models/Actor"),
        Director: require("./models/Director")
    });


// Merge a movie on the title field and add additional properties
// Neode will also work out what to merge on based on the schema definition using `neode.merge`
neode.model("Movie").mergeOn({
    title: "Adulthood",
}, {
    description: "Not Straight Outta Compton, but straight out of jail and back on the mean streets of London.",
    tagline: "Are you dizzy blud?"
})
    .then(adulthood => {
        // Get the 'Actor' definition
        const actor = neode.model("Actor");

        // Create some 'Actor' nodes
        return Promise.all([
            actor.mergeOn({name: "Noel Clarke"}),
            actor.mergeOn({name: "Scarlett Alice Johnson"}),
            actor.mergeOn({name: "Adam Deacon"})
        ])
            .then(([noel, scarlett, adam]) => {
                // Relate the actors to the movie
                return Promise.all([
                    noel.relateTo(adulthood, "acts_in", {name: "Sam"}),
                    scarlett.relateTo(adulthood, "acts_in", {name: "Lexi"}),
                    adam.relateTo(adulthood, "acts_in", {name: "Jay"}),
                ]);
            })
            .then(() => {
                return adulthood;
            });
    })
    .then(adulthood => {
        // Merge a 'Director' node based on the name
        return neode.merge("Director", {
            name: "Noel Clarke",
            // Neode will create relationships when either a Node instance,
            // ID property or Object containing match parameters is passed
            directed: [
                adulthood
            ]
        })
            .then(() => {
                return adulthood;
            });
    })
    .then(adulthood => {
        // Output some results
        console.log('Created #', adulthood.id(), adulthood.properties()); // eslint-disable-line no-console
    })
    .catch(e => {
        console.log("Error :(", e, e.details); // eslint-disable-line no-console
    })
    .then(() => {
        // Close all connections to the graph
        neode.close();

        console.log('Shutdown'); // eslint-disable-line no-console
    });

// const neode = require("neode")
//     .fromEnv()
//     .with({
//         User: require('./models/User'),
//         Review: require('./models/Review'),
//         Product: require('./models/Product')
//     });

//     neode.schema.install()
//     .then(() => console.log('Schema installed!'))

//     neode.create('Product', {
//       name: 'Adam'
//   })
//   .then(adam => {
//       console.log(adam.get('name')); // 'Adam'
//   });

// const seed = async () => {
//   const session = driver.session();
//   const results = await session.run(`LOAD CSV WITH HEADERS FROM 'file:///neoproducts.csv' AS row CREATE (p:Product {id: toInteger(row.id), avgRating: toFloat(row.avgRating), totalReviews: toInteger(row.totalReviews), totalRatings: toInteger(row.totalRatings)}) RETURN row limit 5`);
//   session.run(`LOAD CSV WITH HEADERS FROM 'file:///neousers.csv' AS row CREATE (:User {id: toInteger(row.id), name_: row.name_, userrating: toFloat(row.userrating), totalreviews: toInteger(row.totalreviews)})`)
//   session.run(`LOAD CSV WITH HEADERS FROM 'file:///neoreviews.csv' AS row CREATE (:User {id: toInteger(row.id), title: row.title, abuseReported: row.abuseReported, rating: toFloat(row.rating), location_,: row.location_, userid: toInteger(row.userid), productid: toInteger(row.productid), reviewDate: row.reviewDate, reviewBody: row.reviewBody, helpfulCount: toInteger(row.helpfulCount)})`)
//   session.run(`LOAD CSV WITH HEADERS FROM 'file:///neofeatures.csv' AS row CREATE (:Feature{id: toInteger(row.id), name_: row.name_})`)
//   session.run(`LOAD CSV WITH HEADERS FROM 'file:///neoproductFeaturesarray.csv' AS row CREATE (:ProductFeaturesarray {productid: toInteger(row.productid), featureid: toInteger(row.featureid}))`)
//   session.run(`LOAD CSV WITH HEADERS FROM 'file:///neoproductFeatures.csv' AS row CREATE (:ProductFeature {productid: toInteger(row.productid), featureid: toInteger(row.featureid}))`)
//   session.close();
// }


// // seed()

// module.exports.seed = seed
// // USING PERIODIC COMMIT
