var express = require("express");
var http = require("http");
var app = express()

app.get("/", (request, response) => {
  console.log("Pinging");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`https://parriz.my.id/`)
}, 25000); 

