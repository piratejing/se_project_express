const { PORT = 3001 } = process.env;
const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use((req, res, next) => {
  req.user = {
    _id: "6484cd87755ff5940b282596",
  };
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is listening on port: ${PORT}`);
});
