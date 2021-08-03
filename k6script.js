import http from 'k6/http';
import { sleep } from 'k6';

// k6 run k6script.js
// k6 run --vus 10 --duration 30s script.js

// GET
export let options = {
  scenarios: {
    constant_request_rate: {
      executor: "constant-arrival-rate",
      rate: 1000, //1, 10, 100, 1000
      timeUnit: "1s",
      duration: "30s",
      preAllocatedVUs: 100, //virtual users
      maxVUs: 200,
    },
  },
};

export default function () {
  let rndId = Math.floor(Math.random() * (1000000 - 900000) + 900000);
  const BASE_URL = `http://localhost:3004/reviews/${rndId}`;
  http.get(`${BASE_URL}`);
}

// export let options = {
//   scenarios: {
//     constant_request_rate: {
//       executor: "constant-arrival-rate",
//       rate: 10000,
//       timeUnit: "1s",
//       duration: "30s",
//       preAllocatedVUs: 100,
//       maxVUs: 200,
//     },
//   },
// };

// export default function () {
//   const BASE_URL = 'http://localhost:3004/images';
//   let rndPic = Math.floor(Math.random() * 1001);
//   let imgUrl = `https://picsum.photos/id/${rndPic}/200/300`;
//   http.post(`${BASE_URL}`, JSON.stringify({'images': [imgUrl]}), { headers: { 'Content-Type': 'application/json' } });
// }

//route post requests through proxy