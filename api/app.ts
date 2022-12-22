import express from "express";

const app = express();

const posts = require("./routes/posts");
const users = require("./routes/users");

app.use(express.json());
app.use("/posts", posts);
app.use("/users", users);

module.exports = app;
