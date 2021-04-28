'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;

const dbURL = process.env.DATABASE_URL;

mongoose.connect(`mongodb://${dbURL}/bookdb`,{ useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected')
});


app.get('/', (request, response) => {
  response.send('Root');
});
 app.listen(PORT, () => console.log(`Server is live on ${PORT}`));
