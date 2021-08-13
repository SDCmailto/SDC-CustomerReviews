const app = require("./server.js");

const PORT = 3004;

app.listen(PORT, ()=>{
  console.log(`Server now listening at http://3.16.203.185:${PORT}`)
})