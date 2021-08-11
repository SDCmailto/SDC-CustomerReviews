import http from 'k6/http';
import { sleep } from 'k6';

// k6 run k6script.js
// k6 run --vus 10 --duration 30s script.js

// GET
// export let options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: "constant-arrival-rate",
//       rate: 1000, //1, 10, 100, 1000
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 100, //virtual users
//       maxVUs: 200,
//     },
//   },
// };

// export default function () {
//   let rndId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
//   const BASE_URL = `http://localhost:3004/reviews/${rndId}`;
//   http.get(`${BASE_URL}`);
// }

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1, //10, 100, 1000, 10000
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

export default function () {
  let rndId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
  let rndRating = Math.floor(Math.random() * 5);
  let rndhelpfulCount = Math.floor(Math.random() * 2000);
  let BASE_URL = `http://localhost:3004/newReview/${rndId}`;
  let review = {
    title: 'the',
    abuseReported: false,
    rating: rndRating,
    location_: 'United States',
    username: 'hannah manfredi',
    productid: rndId,
    reviewDate: '2021-08-03',
    reviewBody: 'hello world',
    helpfulCount: rndhelpfulCount
  }
  http.post(`${BASE_URL}`, JSON.stringify({'body': review}), { headers: { 'Content-Type': 'application/json' } });
}
