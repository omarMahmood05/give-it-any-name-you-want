const express = require("express");
const mongoose = require("mongoose");

const app = express();

dbConnection().catch((err) => {
  console.log(err);
});

async function dbConnection() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const kittySchema = new mongoose.Schema({
  name: String,
});

const Kitty = mongoose.model("Kitty", kittySchema);

async function findFirstKitty() {
  const k1 = await Kitty.find({});
  console.log(k1);
}

const newKitty = new Kitty({ name: "New Kitty" });
newKitty.save();

findFirstKitty();
