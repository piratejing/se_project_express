const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// app.use((req, res, next) => {
//   req.user = {
//     _id: "5d8b8592978f8bd833ca8133",
//   };
//   next();
// });

const routes = require("./routes");

app.use(express.json());
app.use(routes);
app.use(cors());

app.listen(PORT, () => {console.log(`App is listening on port: ${PORT}`);});
