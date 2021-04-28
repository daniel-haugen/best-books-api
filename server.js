"use strict";

// Requirements
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");

app.use(express.json());

// PORT and DB URL
const PORT = process.env.PORT || 3002;
const dbURL = process.env.DATABASE_URL;

// Create BookDB
mongoose.connect(`mongodb://${dbURL}/bookdb`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// check if connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongoose is connected");
});

// requiring Schema model from user.js
const User = require("./models/user");

// Home Route Path
app.get("/", (request, response) => {
  response.send("Root");
});

app.get("/books", getAllBooks);

async function getAllBooks(request, response) {
  // query input for this path
  const { email } = request.query;
  // const email = request.query.email;

  // find a user with the request email query
  await User.find({ email }, (err, user) => {
    if (err) {
      return console.error(err);
    } else {
      response.send(user[0].favBooks.length ? user[0].favBooks : "No books : ");
    }
  });
}

app.post("/books", async (req, res) => {
  const { email } = req.query;
  const newBook = req.body;

  await User.find({ email }, (err, users) => {
    if (users.length) {
      // Add request body to the favorite books array
      const currentUserBooks = users[0].favBooks;
      currentUserBooks.push(newBook);

      // Save the User's entry
      const currentUser = users[0];
      currentUser.save();

      res.send("updated! Added to the collection");
    } else {
      res.send("no users with that email");
    }
  });
});

app.delete("/books/:id", async (req, res) => {
  const { email } = req.query;


  const index = req.params.id;
 

  await User.find({ email }, (err, users) => {
    if (email.length) {
      const currentUser = users[0];
      const currentUserBooks = currentUser.favBooks;
      
      currentUserBooks.splice(index, 1);

      currentUser.save();
      res.status(200).send('deleted');
    } else {
      res.send("no user found");
    }
  });
});

// const michael = new User({
//     email: 'michael@email.com',
//     favBooks: [{
//       name: 'Good Book',
//       description: 'Good read',
//       status: 'checked out'
//     },
//     {
//       name: 'Good Book2',
//       description: 'The Sqeaquel',
//       status: 'out of print'
//     },
//     {
//       name: 'Good Book3',
//       description: 'The Threeaquel',
//       status: 'way way out of print'
//     }]
//   });

//   michael.save();

app.listen(PORT, () => console.log(`Server is live on ${PORT}`));

// terminal commands:
// mongo - enters mongo
// show dbs - shows all collections
// use <db> - switches to collection you want
//
