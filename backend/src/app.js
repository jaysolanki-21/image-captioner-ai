const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");
const postroute = require("./routes/post.routes");

app.use(cookieParser());
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/posts", postroute);


module.exports = app;