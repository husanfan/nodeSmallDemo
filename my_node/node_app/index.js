import express from 'express';

import user from './db/user'

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  let id = req.query.id;
  let results = user[id] ? user[id].name : "未查到";
  res.send(results);
})

app.listen(3000, () => {
  console.log('node app listening on port 3000!')
})