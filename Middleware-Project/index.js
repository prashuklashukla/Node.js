const express = require("express");

const app =  express()

app.use((req,res,next)=> {
  const d = new Date()
console.log(`${d.getTime()} / ${d.getDate()} / ${d.getMonth()}`)
next()
})

app.get('/', (req, res) => {
  res.send("<h1>Home page</h1>")
});

app.get('/About', (req, res) => {
  res.send("<h1>About page</h1>")
});



app.listen(3000,() => {
  console.log("surves runing on port 3000")
})