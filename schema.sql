CREATE DATABASE sdc;
\c sdc

DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE IF NOT EXISTS Products (
  product_id INTEGER,
  avgRating DECIMAL,
  totalReviews INTEGER,
  totalRatings INTEGER
);
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE IF NOT EXISTS Users (
  userid INTEGER,
  name_ TEXT,
  userrating INTEGER,
  totalreviews INTEGER
);
DROP TABLE IF EXISTS Features CASCADE;
CREATE TABLE IF NOT EXISTS Features (
 feature_id INTEGER,
 name_ TEXT
);
DROP TABLE IF EXISTS ProductFeatures CASCADE;
CREATE TABLE ProductFeatures (
 productFeature_id INTEGER,
 productid INTEGER,
 featureid INTEGER
);
DROP TABLE IF EXISTS Reviews CASCADE;
CREATE TABLE IF NOT EXISTS Reviews (
 review_id INTEGER,
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