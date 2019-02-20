'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _user = require('./db/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.static('public'));

app.get('/', function (req, res) {
  var id = req.query.id;
  var results = _user2.default[id] ? _user2.default[id].name : "未查到";
  res.send(results);
});

app.listen(3000, function () {
  console.log('node app listening on port 3000!');
});