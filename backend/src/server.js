const importData = require("./seeder/seeder");
const express = require("express");
const connectDb = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(cookieParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// seeder
// importData();
connectDb();

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  res.status(500).send("Something broke!");
});

const port = 3000;
app.listen(port, () => {
  console.log("App is running on port: ", port);
});
