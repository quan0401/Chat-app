const apiRoutes = require("./routes/apiRoutes");
const importData = require("./seeder/seeder");
const express = require("express");
const connectDb = require("./config/connectDb");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello");
});

// api
app.use("/api", apiRoutes);

// seeder
// importData();
connectDb();

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log(err.message);
  return res.status(500).json({
    EC: -1,
    message: {
      stack: err.stack,
      message: err.message,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log("App is running on port: ", port);
});
