const { PORT = 3001 } = process.env;

const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const express = require("express");
const routes = require("./routes");

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: "64911e95b3f3440b365d804d",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
