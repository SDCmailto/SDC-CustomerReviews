require('newrelic');
const express = require('express')
const parser = require('body-parser');
const path = require('path')
const cors = require('cors')
const router = require('./routes.js');
const models = require('./models/index.js');

const app = express()

const mode = process.env.NODE_ENV;
console.log(`hi bebe you are in ${mode}`);

app.use(express.static(path.join(__dirname, "..", "public")))
app.use(parser.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors());
app.use(router);

app.post('/newReview/:productid', async (req, res) => {
  let productid = req.params.productid
  let review = req.body.body;
  let result = await models.postgres.reviews.createNewReview(productid, review)
  res.setHeader('content-type', 'application/json');
  res.status(201).send(result)
});

module.exports = app;

// At minimum, you must monitor response time (aka latency), throughput, and error rate -- these are the default metrics reported by New Relic. Other metrics may be useful to your specific application but are not required.

//NRII-qBVJ3QD4qGuRvJs7yd7rxiV1i9PK9ik2


// gzip -c example_events.json | curl -X POST -H "Content-Type: application/json"
// -H "X-Insert-Key: NRII-qBVJ3QD4qGuRvJs7yd7rxiV1i9PK9ik2" -H "Content-Encoding: gzip"
// https://insights-collector.newrelic.com/v1/accounts/B0C89A317A657D3AA897EFDB26F4983F7205BBC512F624DDD3B5DCE3B5997CCF/events --data-binary @-