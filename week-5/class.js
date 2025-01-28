const express = require("express");
const app = express();

var createRes = function (status, data, message) {
  return { status, data, message };
};

app.get("/add", function (req, res) {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);
  const add = num1 + num2;
  res.send(createRes("sucess", add, "addition operattion is completed"));
});

app.get("/multiply", function (req, res) {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);
  const mul = num1 * num2;
  res.send(createRes("sucess", mul, "Multiplication operattion is completed"));
});

app.get("/divide", function (req, res) {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);
  const div = num1 / num2;
  res.send(createRes("sucess", div, "Division operattion is completed"));
});

app.get("/subtract", function (req, res) {
  const num1 = parseInt(req.query.a);
  const num2 = parseInt(req.query.b);
  const sub = num1 - num2;
  res.send(createRes("sucess", sub, "Substraction operattion is completed"));
});

app.listen("3331");
