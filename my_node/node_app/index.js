import express from 'express';

const app = express();

const idList = {
  1: "Bob",
  2: "Cindy"
};

app.use(express.static('public'));

app.get('/', function (req, res) {
  let results= idList[req.query.id]||"未查到";
  res.send(results);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})