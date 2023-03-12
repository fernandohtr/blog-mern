const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

const User = require('./models/User');

const salt = bcrypt.genSaltSync(10);

require('dotenv').config()

app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_HOST,
}));
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
    response.status(500).json({message: 'Registration failed'});
  }
});

app.post('/login', async (request, response) => {
  const {username, password} = request.body;
  const userData = await User.findOne({username})
  const passwordOk = bcrypt.compareSync(password, userData.password)
  if (passwordOk) {
    jwt.sign({username, id: userData._id}, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      response.cookie('token', token).json('ok');
    });
  } else {
    response.status(401).json({message: 'Login failed'});
  }
})

app.listen(4000, () => {
  console.log('Server running');
});
