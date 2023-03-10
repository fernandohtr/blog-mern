const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/User');

require('dotenv').config()

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://${process.env.MONGO_USER}:` +
            `${process.env.MONGO_PASSWORD}@cluster0.w2majww.mongodb.net/` +
            `?retryWrites=true&w=majority`

mongoose.connect(url)

app.post('/register', async (request, response) => {
  const {username, password} = request.body;
  const userData = await User.create({username,password});
  response.json(userData);
});

app.listen(4000, () => {
  console.log('Server running');
});
