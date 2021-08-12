CREATE DATABASE postgres;
\c postgres

DROP TABLE IF EXISTS Products CASCADE;
CREATE TABLE IF NOT EXISTS Products (
  id SERIAL PRIMARY KEY,
  avgRating DECIMAL,
  totalReviews INTEGER,
  totalRatings INTEGER
);
-- DROP TABLE IF EXISTS Users CASCADE;
-- CREATE TABLE IF NOT EXISTS Users (
--   id SERIAL PRIMARY KEY,
--   name_ TEXT,
--   userrating INTEGER,
--   totalreviews INTEGER
-- );
-- DROP TABLE IF EXISTS Features CASCADE;
-- CREATE TABLE IF NOT EXISTS Features (
--  id SERIAL PRIMARY KEY,
--  name_ TEXT
-- );
-- DROP TABLE IF EXISTS ProductFeatures CASCADE;
-- CREATE TABLE ProductFeatures (
--  productid int REFERENCES products (id) ON UPDATE CASCADE ON DELETE CASCADE,
--  featureid int REFERENCES features(id) ON UPDATE CASCADE,
--  CONSTRAINT ProductFeatures_pkey PRIMARY KEY (productid, featureid)
-- );
DROP TABLE IF EXISTS Reviews CASCADE;
CREATE TABLE IF NOT EXISTS Reviews (
 id SERIAL PRIMARY KEY,
 title TEXT,
 abuseReported BOOLEAN,
 rating INTEGER,
 location_ VARCHAR,
 userid INTEGER,
 productid INTEGER,
 reviewDate TIMESTAMP,
 reviewBody TEXT,
 helpfulCount INTEGER
);

-- DROP TABLE IF EXISTS Product_Features_Array CASCADE;
-- CREATE TABLE IF NOT EXISTS Product_Features_Array (
--  productid SERIAL PRIMARY KEY,
--  featureid INTEGER[]
-- );
CREATE INDEX productids on reviews (productid);
CREATE INDEX userids on reviews (userid);