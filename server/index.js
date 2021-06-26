const app = require("./server.js");

const PORT = 3004;
let mode = process.env.NODE_ENV;

let url = '';

// if (mode === 'development' || mode === undefined) {
//   url += config.development.booking;
// } else if (mode === 'production') {
//   url += config.production.booking;
// }

app.listen(PORT, ()=>{
  console.log(`Server now listening at http://52.55.99.35:${PORT}`)
})