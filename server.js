const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

//import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

//app
const app = express();

//db
const localurl = "mongodb://127.0.0.1:27017/mern-crud";

//const liveUrl = process.env.liveURI;
const liveUrl = process.env.DATABASE_URI;

const URI = liveUrl;

//const dataBase_String = `mongodb+srv://haris:TdhQgWGAzhbMnIfj>@mern-crud.2v83i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Not Connected", err));

//middlewares

app.use(cors());
app.use(morgan("dev"));
//app.use(bodyParser.json()) deprecated body parser
app.use(express.urlencoded({ extended: true }));
//TO parse the incoming  request with JSON payloads
app.use(express.json());

//route middleware
app.use("/api", postRoutes);
app.use("/api", authRoutes);
// app.use("/haris/api", (req, res) => {
//   res.json("this is response");
// });

//port

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
