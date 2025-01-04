const express = require("express");
const app = express();

// route handlers

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/html", function (req, res){
    res.send("<h1>Hello this is html text check this out</h1>");
})

app.listen(3331);