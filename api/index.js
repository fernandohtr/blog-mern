const express = require('express');
const app = express();

app.post('/test', (request, response) => {
  response.json('ok')
})

app.listen(4000)
