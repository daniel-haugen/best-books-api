'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();

const PORT = process.env.PORT || 3002;


app.get('/', (request, response) => {
  response.send('Root');
});
 app.listen(PORT, () => console.log(`Server is live on ${PORT}`));
