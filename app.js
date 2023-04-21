// Inmport Dot Env
require("dotenv").config();
require("dotenv").config({ path: "./.env" });

// Import Important Modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Creating App
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ urlencoded: true }));

// Initialising Middleware
const middleware = (req, res, next) => {
  console.log(`Middleware Interrupted`);
  next();
};

// Database Connection
require("./db/databaseConnection");
const User = require("./models/userSchema");

// Routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/sign-up", (req, res) => {
  res.sendFile(__dirname + "/views/sign-up.html");
});

app.post("/register", async (req, res) => {
  const { userName, password, phoneNumber } = req.body;

  if (!userName || !password || !phoneNumber) {
    res.status(422).send("Enter all the fields please");
  }

  try {
    const userExists = await User.findOne({ userName: userName });

    if (userExists) {
      res.send("The user already exists");
    }

    if (!userExists) {
      const newUser = new User({ userName, password, phoneNumber });
      const userRegistered = await newUser.save();
      if (userRegistered) {
        res.send("User Has been added Sucessfully");
      }
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const userLogin = await User.findOne({ userName: userName });
    if (userLogin) {
      console.log(userLogin.password);
      console.log(password);
      if (userLogin.password === password) {
        res.send("You're In");
      } else {
        res.send("Incorrect Password");
      }
    } else {
      res.send("Sign-up first, idiot");
    }
  } catch (err) {
    res.send(err);
  }
});

app.get("/middleware", middleware, (req, res) => {
  res.send("You went through the middleware");
});

app.listen(port, (req, res) => {
  console.log(`The server is running on => ${port}`);
});
