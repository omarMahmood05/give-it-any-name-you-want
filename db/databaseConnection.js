const mongoose = require("mongoose");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`Connected to the database sucessfully`);
  })
  .catch((err) => {
    console.log(err);
  });
