const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
