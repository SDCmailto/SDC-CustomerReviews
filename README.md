# Project Name

> Project description

## Related Projects

  - https://github.com/Zheng-Yi-Sao/ProductGallery
  - https://github.com/Zheng-Yi-Sao/ProductOverview
  - https://github.com/Zheng-Yi-Sao/ProductInformation

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> This service contains

>1.1 API Endpoints
>GET '/reviews/:productid'
>Given a product id, retrieves all reviews for that product. Each review has this shape:
  * productId
  * userName
  * rating
  * title
  * location
  * reviewDate
  * reviewBody
  * helpfulCount
  * abuseReported
GET '/averagereview/:productid'
>Given a product id, retrieves the average review score for that product.
POST '/newReview/:productid'
>Given a product id, creates a new review for that product and saves it to the db.
PUT '/editedReview/:reviewId'
>Given a review id, looks up and updates that review in the db.
DELETE '/deletedReview/:reviewId'
>Given a review id, removes that review from the db.


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

### Scripts

    npm run build - webpack
    npm run watch - webpack with watch
    npm run seed - Seed database
    npm start - Start server with nodemon



