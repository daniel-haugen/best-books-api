'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const dbURL = process.env.DATABASE_URL;

mongoose.connect(`mongodb://${dbURL}/bookdb`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});

const User = require('./models/user');

const michael = new User({
  email: 'michael@email.com',
  favBooks: [{
    name: 'Good Book',
    description: 'Good read',
    status: 'checked out'
  },
  {
    name: 'Good Book2',
    description: 'The Sqeaquel',
    status: 'out of print'
  },
  {
    name: 'Good Book3',
    description: 'The Threeaquel',
    status: 'way way out of print'
  }]
});

const daniel = new User({
  email: 'daniel@email.com',
  favBooks: [{
    name: 'Good Book',
    description: 'Good read',
    status: 'checked out'
  },
  {
    name: 'Good Book2',
    description: 'The Sqeaquel',
    status: 'out of print'
  }]
});


michael.save();
daniel.save();



app.get('/', (request, response) => {
  response.send('Root');
});


app.get('/books', getAllBooks);


function getAllBooks(request, response) {
  const user = request.query.name;
  console.log({ user });
  User.find({ user }, (err, favBooks) => {
    if (err) return console.error(err);
    console.log({ favBooks });
    response.send(favBooks.length ? favBooks[0].name : 'No books :(');
  })
}


app.listen(PORT, () => console.log(`Server is live on ${PORT}`));
