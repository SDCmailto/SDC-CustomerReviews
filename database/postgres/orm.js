const { Sequelize, Model, DataTypes } = require('sequelize');
const { host, user, database, password, port } = require('../../config.js');
const utils = require('./utils');

const sequelize = new Sequelize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: false
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

class Product extends Model {}
Product.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  avgRating: DataTypes.DECIMAL,
  totalReviews: DataTypes.INTEGER,
  totalRatings: DataTypes.INTEGER
}, { sequelize, modelName: 'product' });

class User extends Model {}
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_: DataTypes.TEXT,
  userrating: DataTypes.INTEGER,
  totalreviews: DataTypes.INTEGER
}, { sequelize, modelName: 'user' });

class Feature extends Model {}
Feature.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name_: DataTypes.TEXT,
}, { sequelize, modelName: 'feature' });

class ProductFeature extends Model {}
ProductFeature.init({
  p: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  f: {
    type: Sequelize.INTEGER,
    primaryKey: true
  }
}, { sequelize, modelName: 'productfeature' });

class Product_Features_Array extends Model {}
Product_Features_Array.init({
  productid: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  featureid: DataTypes.ARRAY(DataTypes.INTEGER),
}, { sequelize, modelName: 'productfeaturesarray' });

class Review extends Model {}
Review.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  title: DataTypes.STRING,
  abuseReported: DataTypes.BOOLEAN,
  rating: DataTypes.INTEGER,
  location_: DataTypes.STRING,
  userid: DataTypes.INTEGER,
  productid: DataTypes.INTEGER,
  reviewDate: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  reviewBody: DataTypes.STRING,
  helpfulCount: DataTypes.INTEGER
}, { sequelize, modelName: 'review' });

(async function seed() {
  // const products = utils.createProducts();
  // console.log('products: ', products)
  const reviews = utils.createReviews2();
  try {
    await sequelize.sync({ force: true });
    await Review.bulkCreate(reviews, {
      fields: ['id', 'title', 'abuseReported', 'rating', 'location_', 'productid', 'reviewDate', 'reviewBody', 'helpfulCount', 'ignoreDuplicates'],
    });
  } catch (error) {
    console.log(error);
  } finally {
    await sequelize.close();
  }
})();
