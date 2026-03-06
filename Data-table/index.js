const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.models");
const userRoutes = require("./routes/user.routes");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//connect mongoose
mongoose.connect("mongodb://localhost:27017/users_domo").then(() => {
  console.log("Database connect!");
});

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json({ data: users });
});
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("servers start");
});
