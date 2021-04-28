'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  favBooks: [favoriteBooks]

});

const favoriteBooks = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String, require: true },
  status: { type: String, require: true },

});

module.exports = mongoose.model('users',userSchema);