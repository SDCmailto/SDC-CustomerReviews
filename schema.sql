CREATE DATABASE sdc;
\c sdc

DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE IF NOT EXISTS Products (
  product_id SERIAL PRIMARY KEY,
  avgRating DECIMAL,
  totalReviews INTEGER,
  totalRatings INTEGER
);
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE IF NOT EXISTS Users (
  userid SERIAL PRIMARY KEY,
  name_ TEXT,
  userrating INTEGER,
  totalreviews INTEGER
);
DROP TABLE IF EXISTS Features CASCADE;
CREATE TABLE IF NOT EXISTS Features (
 feature_id SERIAL PRIMARY KEY,
 name_ TEXT
);
DROP TABLE IF EXISTS ProductFeatures CASCADE;
CREATE TABLE ProductFeatures (
 productFeature_id SERIAL PRIMARY KEY,
 productid INTEGER,
 featureid INTEGER
);
DROP TABLE IF EXISTS Reviews CASCADE;
CREATE TABLE IF NOT EXISTS Reviews (
 review_id SERIAL PRIMARY KEY,
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