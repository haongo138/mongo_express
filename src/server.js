const express = require("express");
const statusCode = require("http-status-codes");
const User = require("./models/User.model");
const connectDb = require("./connection");
const PORT = 8080;

const app = express();

app.get("/", (_req, res) => {
  res.send("Hello from Node.js app \n");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.setHeader("Content-Type", "application/json");
  res.status(statusCode.OK).json({ data: users });
});

app.post("/users", async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(424).json({ message: "username required" });
  }
  const user = new User({ username });
  await user.save();
  return res.status(statusCode.CREATED).json({ data: { username } });
});

app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);
});

connectDb().then(() => console.log("Database connected"));
