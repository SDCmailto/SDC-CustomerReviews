const app = require("./server.js");

const PORT = 3004;

app.listen(PORT, ()=>{
  console.log(`Server now listening at http://52.14.110.72:${PORT}`)
})