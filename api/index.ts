import express from "express";

const app = express();
const port = 3000;

const posts = require("./router/posts");
const users = require("./router/users");

app.use(express.json());
app.use("/posts", posts);
app.use("/users", users);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
