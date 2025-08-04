const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/user.routes");

app.use(cookieParser());
app.use(express.json());


app.use("/api/users", userRoutes);


module.exports = app;