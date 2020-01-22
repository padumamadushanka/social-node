const express = require("express");
const app = express();
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const expressValidator = require("express-validator");
const cors = require("cors");

//bringing post routes
const postRoutes = require(`./routes/post.js`);
const authRoutes = require(`./routes/auth.js`);
const userRoutes = require(`./routes/user.js`);

// import mongoose
const mongoose = require("mongoose");
// load env variables
const dotenv = require("dotenv");
dotenv.config();

//db connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});

//middlewares
app.use(morgan("dev"));
//parsing req.body into json format
app.use(bodyparser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log(`node API is listning on port ${port}`);
});
