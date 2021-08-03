// const tracer = require('dd-trace').init()

const app = require("./server.js");

const PORT = 3004;

app.listen(PORT, ()=>{
  console.log(`Server now listening at http://52.55.99.35:${PORT}`)
})