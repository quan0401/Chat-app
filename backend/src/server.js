const importData = require("./seeder/seeder");
const express = require("express");
const connectDb = require("./config/connectDb");

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

// seeder
connectDb();

const port = 3000;
app.listen(port, () => {
  console.log("App is running on port: ", port);
});
