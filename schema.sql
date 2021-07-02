CREATE DATABASE sdc;
\c sdc

DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE IF NOT EXISTS Products (
  id INTEGER NOT NULL,
  avgRating DECIMAL,
  totalReviews INTEGER,
  totalRatings INTEGER
);
DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER NOT NULL,
  name_ TEXT,
  userrating INTEGER,
  totalreviews INTEGER
);

DROP TABLE IF EXISTS Features CASCADE;
CREATE TABLE IF NOT EXISTS Features (
 id INTEGER NOT NULL,
 name_ TEXT
);
DROP TABLE IF EXISTS ProductFeatures CASCADE;
CREATE TABLE ProductFeatures (
 id INTEGER NOT NULL,
 productid INTEGER,
 featureid INTEGER
);
DROP TABLE IF EXISTS Reviews CASCADE;
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