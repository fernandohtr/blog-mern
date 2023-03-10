const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const app = express();

const User = require('./models/User');

const salt = bcrypt.genSaltSync(10);

require('dotenv').config()

app.use(cors());
app.use(express.json());

const url = `mongodb+srv://${process.env.MONGO_USER}:` +
            `${process.env.MONGO_PASSWORD}@cluster0.w2majww.mongodb.net/` +
            `?retryWrites=true&w=majority`

mongoose.connect(url)

app.post('/register', async (request, response) => {
  const {username, password} = request.body;
  try {
    await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
  } catch(err) {
    response.status(409).json(err);
  }
});

app.listen(4000, () => {
  console.log('Server running');
});
