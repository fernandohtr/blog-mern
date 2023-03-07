const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.post('/register', (request, response) => {
  response.json('ok');
});

app.listen(4000);
