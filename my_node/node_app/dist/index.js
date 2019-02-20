"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var idList = {
  1: "Bob",
  2: "Cindy"
};

app.use(_express2.default.static('public'));

app.get('/', function (req, res) {
  var results = idList[req.query.id] || "未查到";
  res.send(results);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});