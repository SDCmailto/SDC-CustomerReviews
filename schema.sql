CREATE TABLE Products (
  id BIGSERIAL,
  avgRating INTEGER,
  totalReviews INTEGER,
  totalRatings INTEGER
);

ALTER TABLE Products ADD CONSTRAINT Products_pkey PRIMARY KEY (id);

CREATE TABLE Users (
  id BIGSERIAL,
  name VARCHAR(50),
  userRating INTEGER,
  totalReviews INTEGER,
);
ALTER TABLE Users ADD CONSTRAINT Users_pkey PRIMARY KEY (id);
CREATE TABLE Features (
 id BIGSERIAL,
 name VARCHAR(50)
);
ALTER TABLE Features ADD CONSTRAINT Features_pkey PRIMARY KEY (id);
CREATE TABLE ProductFeatures (
 id BIGSERIAL,
 productId INTEGER,
 featureId INTEGER
);
ALTER TABLE ProductFeatures ADD CONSTRAINT ProductFeatures_pkey PRIMARY KEY (id);
CREATE TABLE Reviews (
 id BIGSERIAL,
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
ALTER TABLE Reviews ADD CONSTRAINT Reviews_pkey PRIMARY KEY (id);

ALTER TABLE ProductFeatures ADD CONSTRAINT ProductFeatures_productId_fkey FOREIGN KEY (productId) REFERENCES Products(id);
ALTER TABLE ProductFeatures ADD CONSTRAINT ProductFeatures_featureId_fkey FOREIGN KEY (featureId) REFERENCES Features(id);
ALTER TABLE Reviews ADD CONSTRAINT Reviews_userId_fkey FOREIGN KEY (userId) REFERENCES Users(id);
ALTER TABLE Reviews ADD CONSTRAINT Reviews_productId_fkey FOREIGN KEY (productId) REFERENCES Products(id);