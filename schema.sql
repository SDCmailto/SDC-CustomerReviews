DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;

\c sdc

DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE IF NOT EXISTS Products (
  id INTEGER NOT NULL UNIQUE,
  avgRating DECIMAL,
  totalReviews INTEGER,
  totalRatings INTEGER
);

ALTER TABLE Products ADD CONSTRAINT Products_pkey PRIMARY KEY (id);

DROP TABLE IF EXISTS Users CASCADE;
CREATE TABLE IF NOT EXISTS Users (
  id INTEGER NOT NULL UNIQUE,
  name VARCHAR(50),
  userrating INTEGER,
  totalreviews INTEGER
);

DROP TABLE IF EXISTS Features CASCADE;
CREATE TABLE IF NOT EXISTS Features (
 id INTEGER NOT NULL UNIQUE,
 name VARCHAR(50)
);
DROP TABLE IF EXISTS ProductFeatures CASCADE;
CREATE TABLE ProductFeatures (
 id INTEGER NOT NULL UNIQUE,
 productid INTEGER,
 featureid INTEGER
);
DROP TABLE IF EXISTS Reviews CASCADE;
CREATE TABLE IF NOT EXISTS Reviews (
 id INTEGER NOT NULL UNIQUE,
 title VARCHAR(50),
 abuseReported BOOLEAN,
 rating INTEGER,
 location VARCHAR(75),
 userId INTEGER,
 productId INTEGER,
 reviewDate TIMESTAMP,
 reviewBody VARCHAR(5000),
 helpfulCount INTEGER
);
ALTER TABLE ProductFeatures ADD CONSTRAINT ProductFeatures_productId_fkey FOREIGN KEY (productid) REFERENCES Products(id);
ALTER TABLE ProductFeatures ADD CONSTRAINT ProductFeatures_featureId_fkey FOREIGN KEY (featureid) REFERENCES Features(id);
ALTER TABLE Reviews ADD CONSTRAINT Reviews_userId_fkey FOREIGN KEY (userid) REFERENCES Users(id);
ALTER TABLE Reviews ADD CONSTRAINT Reviews_productId_fkey FOREIGN KEY (productid) REFERENCES Products(id);