const app = require("./server.js");

const PORT = 3004;

app.listen(PORT, ()=>{
  console.log(`Server now listening at http://18.221.116.138:${PORT}`)
})